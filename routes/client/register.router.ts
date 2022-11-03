import express from "express";
const router = express.Router();
import multer from "multer";
import { Register } from "../../controllers/register.controller";
const upload = multer();

router.post("/", upload.single("avatar"), Register);

export default router;
