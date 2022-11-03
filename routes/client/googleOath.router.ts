import express from "express";
import { google_Authentication } from "../../controllers/authen.controller";
const router = express.Router();

router.post("/oath-client", google_Authentication);

export default router;
