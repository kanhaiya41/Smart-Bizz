import pdfParse from "pdf-extraction";
import { getEmbedding } from "../services/embedding.service.js";
import {
  qdrant,
  ensureCollection,
  COLLECTION,
} from "../services/qdrant.service.js";

/* ===============================
   PDF BUFFER → TEXT
================================ */
async function extractTextFromPDF(buffer) {
  const data = await pdfParse(buffer);
  return data.text || "";
}

/* ===============================
   TEXT → CHUNKS
================================ */
function splitText(text, chunkSize = 200) {
  if (!text) return [];

  const words = text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }

  return chunks;
}

/* ===============================
   DUPLICATE CHECK
   (userId + source)
================================ */
async function isFileAlreadyInserted(userId, source) {
  const res = await qdrant.scroll(COLLECTION, {
    limit: 1,
    with_payload: true,
    filter: {
      must: [
        { key: "userId", match: { value: userId } },
        { key: "source", match: { value: source } },
      ],
    },
  });

  return res.points.length > 0;
}

/* ===============================
   📥 UPLOAD PDF(s)
================================ */
export async function uploadPDF(req, res) {
  try {
    const { userId } = req.body;

    // multer: single => req.file | multiple => req.files
    const files = req.files || (req.file ? [req.file] : []);

    if (!userId || files.length === 0) {
      return res
        .status(400)
        .json({ message: "userId and PDF file(s) required" });
    }

    await ensureCollection();

    let totalInserted = 0;
    const skippedFiles = [];

    for (const file of files) {
      const source = file.originalname;

      // 🔁 Duplicate check
      const exists = await isFileAlreadyInserted(userId, source);
      if (exists) {
        skippedFiles.push(source);
        continue;
      }

      const text = await extractTextFromPDF(file.buffer);
      const chunks = splitText(text);

      const points = [];

      for (let i = 0; i < chunks.length; i++) {
        const vector = await getEmbedding(chunks[i]);

        points.push({
          id: `${userId}-${source}-${i}`, // ✅ stable & unique
          vector,
          payload: {
            userId,
            source,
            chunk_no: i + 1,
            content: chunks[i],
          },
        });
      }

      if (points.length > 0) {
        await qdrant.upsert(COLLECTION, { points });
        totalInserted += points.length;
      }
    }

    return res.json({
      success: true,
      insertedChunks: totalInserted,
      skippedFiles,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "PDF upload failed" });
  }
}

/* ===============================
   🔍 SEARCH USER DATA
================================ */
export async function searchUserData(req, res) {
  try {
    const { userId, query, limit = 5 } = req.body;

    if (!userId || !query) {
      return res
        .status(400)
        .json({ message: "userId and query required" });
    }

    const queryVector = await getEmbedding(query);

    const result = await qdrant.search(COLLECTION, {
      vector: queryVector,
      limit,
      with_payload: true,
    //   with_vector: true,  uncomment when run
      filter: {
        must: [
          {
            key: "userId",
            match: { value: userId },
          },
        ],
      },
    });

    res.json({
      success: true,
      count: result.length,
      results: result.map(r => ({
        score: r.score,
        ...r.payload,
      })),
    });
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ error: "Search failed" });
  }
}
