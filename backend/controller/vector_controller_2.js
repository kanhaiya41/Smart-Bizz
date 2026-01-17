
import csv from "csvtojson";
import Inventory from "../models/Inventory.js";
import fs from "fs/promises";
import path from "path";
import { getEmbedding } from "../services/embedding.service.js";
import { COLLECTION, ensureCollection, qdrant } from "../services/qdrant.service.js";



export async function saveFileToDisk(file) {
  const uploadDir = "uploads/inventory";
  await fs.mkdir(uploadDir, { recursive: true });

  const uniqueName =
    Date.now() + "-" + Math.round(Math.random() * 1e9) +
    path.extname(file.originalname);

  const filePath = path.join(uploadDir, uniqueName);

  await fs.writeFile(filePath, file.buffer);

  return {
    filename: uniqueName,
    path: filePath
  };
}


export async function parseCSV(buffer) {
  const csvText = buffer.toString("utf-8");

  const jsonArray = await csv({
    ignoreEmpty: true,
    trim: true
  }).fromString(csvText);

  return jsonArray; // array of objects (dynamic keys)
}

export function parseJSON(buffer) {
  const text = buffer.toString("utf-8");
  const data = JSON.parse(text);

  // Always convert to array
  if (Array.isArray(data)) return data;

  if (typeof data === "object") {
    return Object.values(data);
  }

  throw new Error("Invalid JSON format");
}


export async function parseInventoryFile(file) {
  const ext = file.originalname.split(".").pop().toLowerCase();
  console.log(file);
  console.log(file.buffer);
  

  if (ext === "csv") {
    return {
      type: "csv",
      records: await parseCSV(file.buffer)
    };
  }

  if (ext === "json") {
    return {
      type: "json",
      records: parseJSON(file.buffer)
    };
  }

  throw new Error("Unsupported file type");
}


export function recordToText(record) {
  let text = "";

  for (const [key, value] of Object.entries(record)) {
    if (value === null || value === undefined) continue;

    text += `${key}: ${String(value)} | `;
  }

  return text.trim();
}



export function recordsToChunks(records, chunkSize = 20) {
  const chunks = [];
  let currentChunk = [];

  for (const record of records) {
    currentChunk.push(recordToText(record));

    if (currentChunk.length === chunkSize) {
      chunks.push(currentChunk.join("\n"));
      currentChunk = [];
    }
  }

  if (currentChunk.length) {
    chunks.push(currentChunk.join("\n"));
  }

  return chunks;
}



export async function uploadInventory(req, res) {
  try {
    const ownerId  = req.user.id;
    const file = req.file;

   
    if (!file) {
      return res.status(400).json({ error: "File required" });
    }

    //  Save file for UI
    const savedFile = await saveFileToDisk(file);
    // Parse file
    const { type, records } = await parseInventoryFile(file);

    //  Save RAW data in MongoDB    
    const inventoryDoc = await Inventory.create({
      ownerId,
      source: file.originalname,
      filePath: savedFile.path,
      fileType: type,
      rawData: records,
      recordCount: records.length
    });

    // Convert to embedding chunks
    const chunks = recordsToChunks(records);
    await ensureCollection();

    // Store in Vector DB
    
    const points = [];
    for (let i = 0; i < chunks.length; i++) {
      const vector = await getEmbedding(chunks[i]);

      points.push({
        id: crypto.randomUUID(),
        vector,
        payload: {
          ownerId,
          inventoryId: inventoryDoc._id.toString(),
          source: "inventory",
          chunk_no: i + 1,
          content: chunks[i]
        }
      });
    }

    await qdrant.upsert(COLLECTION, { points });

    res.json({
      success: true,
      file: savedFile.filename,
      records: records.length,
      vectors: points.length
    });

  } catch (err) {    
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
