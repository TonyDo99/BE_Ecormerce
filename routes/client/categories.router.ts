import express from "express";
import {
  getProducts,
  getDetailProducts,
  addToCart,
} from "../../controllers/admin/products.controller";
const router = express.Router();

router.get("/", getProducts);

router.get("/:_id", getDetailProducts);

router.post("/:_id", addToCart);

export default router;
