import express from "express";
const router = express.Router();

import { getBranch } from "../../controllers/branch.controller";

router.get("/", getBranch);

export default router;
