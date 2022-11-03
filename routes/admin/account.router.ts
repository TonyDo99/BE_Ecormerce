import express from "express";
import { updateProfile } from "../../controllers/admin/profile.controller";
import multer from "multer";
const upload = multer({ dest: "./public/uploads" });
const router = express.Router();

router.post("/updateProfile", upload.single("path"), updateProfile);

export default router;
