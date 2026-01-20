import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;


const storage = multer.diskStorage({
  destination: "uploads/profile",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const ImagesUploader = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

