import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer({ dest: "./public/uploads" });
import { insertProducts } from "../../controllers/admin/products.controller";

router.post("/insertProducts", upload.single("path"), insertProducts);

export default router;
