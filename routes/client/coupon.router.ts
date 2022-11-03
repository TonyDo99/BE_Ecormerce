import { Router } from "express";
import { body } from "express-validator";
import { applyCoupon } from "../../controllers/admin/coupon.controller";

const router = Router();

router.post(
  "/apply",
  body("code")
    .notEmpty()
    .withMessage("code field is required !")
    .isNumeric()
    .withMessage("code field must be a number type !"),
  applyCoupon
);

export default router;
