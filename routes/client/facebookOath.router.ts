import express from "express";
const router = express.Router();

import { facebook_Authentication } from "../../controllers/authen.controller";

router.post("/oath-client", facebook_Authentication);

export default router;
