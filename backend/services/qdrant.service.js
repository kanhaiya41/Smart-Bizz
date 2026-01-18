import { QdrantClient } from "@qdrant/js-client-rest";
import { getEmbedding } from "./embedding.service.js";

export const COLLECTION = "Business_content";

export const qdrant = new QdrantClient({
  url: "http://localhost:6333",
});

export async function ensureCollection() {
  const { collections } = await qdrant.getCollections();
  const exists = collections.find(c => c.name === COLLECTION);

  if (!exists) {
    await qdrant.createCollection(COLLECTION, {
      vectors: {
        size: 384,
        distance: "Cosine",
      },
    });
  }
}

export async function searchUserData(data) {
  try {
    const { userId, query, limit = 5 } = data;

    //  Validation (NO res usage)
    if (!userId || !query) {
      return {
        success: false,
        error: "userId and query are required"
      };
    }

    //  Create embedding
    const queryVector = await getEmbedding(query);

    //  Vector search
    const result = await qdrant.search(COLLECTION, {
      vector: queryVector,
      limit,
      with_payload: true,
      with_vector: false, //DO NOT RETURN VECTOR
      filter: {
        must: [
          {
            key: "ownerId",
            match: { value: userId }
          }
        ]
      }
    });

    //  Normalize response (LLM-safe)
    return {
      success: true,
      count: result.length,
      data: result.map(r => ({
        score: r.score,
        ...r.payload
      }))
    };

  } catch (err) {
    console.error("SEARCH ERROR:", err);
    return {
      success: false,
      error: "Search failed"
    };
  }
}
