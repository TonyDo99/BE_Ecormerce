import express from "express";
const router = express.Router();
import {
  getDashboard,
  getAccount,
} from "../../controllers/admin/dashboard.controller";
import { getCustomers } from "../../controllers/admin/customers.controller";
import { getProducts } from "../../controllers/admin/products.controller";

router.get("/", getDashboard);

router.get("/account", getAccount);

router.get("/customers", getCustomers);

router.get("/products", getProducts);

export default router;
