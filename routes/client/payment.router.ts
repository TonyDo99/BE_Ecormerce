import { Router } from "express";
import { body, CustomValidator } from "express-validator";
import { payment } from "../../controllers/payment.controller";
const router = Router();

router.post(
  "/",
  body("totalHasVoucher")
    .default(0)
    .isNumeric()
    .withMessage("totalHasVoucher field must be a number type !"),
  payment
);

export default router;
