import { pipeline } from "@xenova/transformers";
import { qdrant, COLLECTION } from "./qdrant.service.js";


const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

export async function getEmbedding(text) {
  const output = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}

export async function searchUserData(userId, query, limit = 5) {
  try {

    if (!userId || !query) {
      console.log("User Id and Query is Needed");
      return null
    }
    const queryVector = await getEmbedding(query);

    const result = await qdrant.search(COLLECTION, {
      vector: queryVector,
      limit,
      with_payload: true,
      with_vector: true,
      filter: {
        must: [
          {
            key: "userId",
            match: { value: userId },
          },
        ],
      },
    });

    const finalAnswer = result.map(r => ({
      queryVector: queryVector,
      score: r.score,
      vector: r.vector, // This is the line ---- we miss
      ...r.payload,
    }))

    return finalAnswer
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    return null
  }
}
