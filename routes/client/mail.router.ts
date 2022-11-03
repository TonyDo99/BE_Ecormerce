import express from "express";
const router = express.Router();
import {
  sendEmailAdmin,
  sendEmailClient,
} from "../../controllers/mail.controller";

router.post("/feedback", sendEmailAdmin);

router.post("/verify", sendEmailClient);

export default router;
