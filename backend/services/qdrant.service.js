import { QdrantClient } from "@qdrant/js-client-rest";

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
