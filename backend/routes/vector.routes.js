import express from "express";
import multer from "multer";
import { uploadPDF, searchUserData } from "../controller/vector.controller.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB per file (optional safety)
  },
});

router.post(
  "/upload-pdf",
  upload.fields([
    { name: "file", maxCount: 1 },     // single
    { name: "files", maxCount: 10 },   // multiple
  ]),
  uploadPDF
);

router.post("/search", searchUserData);

export default router;