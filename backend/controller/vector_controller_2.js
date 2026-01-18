
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
  try {
    
     const csvText = buffer.toString("utf-8");

  const jsonArray = await csv({
    ignoreEmpty: true,
    trim: true
  }).fromString(csvText);

  return jsonArray; 
  } catch (error) {
      console.log(error);
        throw new Error("Invalid CSV format");
  
  }
// array of objects (dynamic keys)
}

export function parseJSON(buffer) {
  try {
    const text = buffer.toString("utf-8");
    const data = JSON.parse(text);

    // Case 1: already array of objects
    if (Array.isArray(data)) {
      if (!data.every(item => typeof item === "object" && item !== null)) {
        throw new Error("JSON array must contain objects only");
      }
      return data;
    }

    // Case 2: single object → wrap in array
    if (typeof data === "object" && data !== null) {
      return [data];
    }

    throw new Error("Invalid JSON structure");
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error("Invalid JSON format");
  }
}


export async function parseInventoryFile(file) {
  try {
    const ext = file.originalname.split(".").pop().toLowerCase();
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
  } catch (error) {
      console.log(error);
      throw new Error("Unsupported file type");
  }
  
}


export function recordToText(record) {
  try {
    if (typeof record !== "object" || record === null) {
      return "";
    }

    let text = "";

    for (const [key, value] of Object.entries(record)) {
      if (value === null || value === undefined) continue;

      if (typeof value === "object") {
        text += `${key}: ${JSON.stringify(value)} | `;
      } else {
        text += `${key}: ${String(value)} | `;
      }
    }

    return text.trim();
  } catch (error) {
    console.error("recordToText error:", error);
    return ""; // NEVER throw here
  }
}


export function recordsToChunks(records, chunkSize = 20) {
  try {
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
catch (error) {
  console.log(error);
  
  throw new Error(`Error: ${error.message || error}`);
}

}



export async function uploadInventory(req, res) {
  try {
    const ownerId  = req.user.id;
    const file = req.file;

   
    if (!file) {
      return res.status(400).json({ error: "File required" });
    }

    //  Save file for UI
    // const savedFile = await saveFileToDisk(file);
    // Parse file
    const { type, records } = await parseInventoryFile(file);


    console.log("Check 1");
    

    //  Save RAW data in MongoDB   
    
    let size;
let sizeUnit;

if (file.size < 1024 * 1024) {
  size = (file.size / 1024).toFixed(2);
  sizeUnit = "KB";
} else {
  size = (file.size / (1024 * 1024)).toFixed(2);
  sizeUnit = "MB";
}
    const inventoryDoc = await Inventory.create({
      ownerId,
      name: path.parse(file.originalname).name,
      size: `${size} ${sizeUnit}`,
      fileType: type,
      rawData: records,
      recordCount: records.length
    });

        console.log("Check 2");

    // Convert to embedding chunks
    const chunks = recordsToChunks(records);
    await ensureCollection();

    // Store in Vector DB
    
    const points = [];
    for (let i = 0; i < chunks.length; i++) {
      const vector = await getEmbedding(chunks[i]);

  if (!vector) {
  console.warn(`Skipping embedding for chunk ${i + 1}`);
  continue;
}

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
    console.log("Check 2");
   return res.status(200).json({
      success: true,
      // file: savedFile.filename,
      records: records.length,
      vectors: points.length
    });

  } catch (err) {    
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
