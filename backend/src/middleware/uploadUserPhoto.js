import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

// Esto es lo correcto para ESM + Jest + Babel
const __filename = fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

// Ruta segura a uploads de usuarios
const uploadPath = path.join(__dirname, "../../uploads/users");

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = mime.extension(file.mimetype);
    const safeName = uuidv4() + "." + ext;
    cb(null, safeName);
  },
});

// Validación del tipo de archivo
function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("Solo se permiten archivos de imagen válidos (jpg, png, webp)")
    );
  }

  cb(null, true);
}

export const uploadUserPhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});
