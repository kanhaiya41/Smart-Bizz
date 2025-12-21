
import fs from "fs";
import { pipeline } from "@xenova/transformers";
import { QdrantClient } from "@qdrant/js-client-rest";
import pdfParse from 'pdf-extraction';



const COLLECTION = "Business_content";

/* ===============================
   1️⃣ Qdrant Client
================================ */
const qdrant = new QdrantClient({
    url: "http://localhost:6333",
});

/* ===============================
   2️⃣ Ensure Collection Exists
================================ */
async function ensureCollection() {
    const { collections } = await qdrant.getCollections();

    const exists = collections.find(c => c.name === COLLECTION);

    if (exists) {
        console.log("ℹ️ Collection already exists");
        return;
    }

    await qdrant.createCollection(COLLECTION, {
        vectors: {
            size: 384,
            distance: "Cosine",
        },
    });

    console.log("✅ Collection created");
}

/* ===============================
   3️⃣ Embedding Model (LOCAL)
================================ */
const embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
);

console.log("✅ Embedding model loaded");

async function getEmbedding(text) {
    const output = await embedder(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}

/* ===============================
   4️⃣ PDF → TEXT
================================ */
async function readPDF(filePath) {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text;
}

/* ===============================
   5️⃣ TEXT → CHUNKS
================================ */
function splitText(text, chunkSize = 200) {
    const words = text.split(/\s+/);
    const chunks = [];

    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(" "));
    }

    return chunks;
}

/* ===============================
   6️⃣ Check Duplicate (by source)
================================ */
async function alreadyInserted(source) {
    const res = await qdrant.scroll(COLLECTION, {
        limit: 1,
        with_payload: true,
        filter: {
            must: [
                {
                    key: "source",
                    match: { value: source },
                },
            ],
        },
    });

    return res.points.length > 0;
}

/* ===============================
   7️⃣ PDF → Embed → Store
================================ */
async function storePDF(filePath) {
    await ensureCollection();

    const exists = await alreadyInserted(filePath);
    if (exists) {
        console.log("⚠️ PDF already exists in DB. Skipping insert.");
        return;
    }

    const text = await readPDF(filePath);
    const chunks = splitText(text);

    console.log(`📄 Total chunks: ${chunks.length}`);

    const points = [];

    for (let i = 0; i < chunks.length; i++) {
        const vector = await getEmbedding(chunks[i]);

        points.push({
            id: `${filePath}-${i}`, // 🔑 unique & stable ID
            vector,
            payload: {
                userId: '',
                chunk_no: i + 1,
                content: chunks[i],
                source: filePath,
            },
        });
    }

    await qdrant.upsert(COLLECTION, { points });

    console.log(`✅ Inserted ${points.length} new chunks`);
}

async function readAllPointsPaginated(userId, queryVector) {
    let allPoints = [];
    let offset = null;

    while (true) {
        const res = await qdrant.scroll("pdf_docs", {
            limit: 100,
            offset,
            with_payload: true,
            with_vector: false,
        });

        allPoints.push(...res.points);

        if (!res.next_page_offset) break;
        offset = res.next_page_offset;
    }

    console.log(`✅ Total points: ${allPoints.length}`);
    console.log(allPoints);
}

