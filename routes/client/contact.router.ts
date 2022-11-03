import express from "express";
const router = express.Router();
import { getContact } from "../../controllers/contact.controller";

router.get("/", getContact);

export default router;
