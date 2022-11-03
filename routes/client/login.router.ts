import express from "express";
import { Login } from "../../controllers/authen.controller";
const router = express.Router();

router.post("/", Login);

export default router;
