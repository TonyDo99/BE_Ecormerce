import { Router } from "express";
import { authen } from "../../middleware/authen-jwt";
import accountRouter from "./account.router";
import dashboardRouter from "./dashboard.router";
import productRouter from "./products.router";
import couponRouter from "./coupon.router";
const router = Router();

router.use("/admin", accountRouter);
router.use("/dashboard", authen, dashboardRouter);
router.use("/admin", productRouter);
router.use("/admin/coupon", couponRouter);

export default router;
