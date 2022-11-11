import { Router } from "express";
import { body, checkSchema } from "express-validator";
import multer from "multer";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupon,
  getDetailCoupon,
  updateCoupon,
} from "../../controllers/admin/coupon.controller";
import { validateRequest } from "../../middleware/validate-request";

const router = Router();

const upload = multer({ dest: undefined });
const DISCOUNT_PERCENT = [
  "TEN_PERCENT",
  "TWENTY_PERCENT",
  "THIRTY_PERCENT",
  "FORTY_PERCENT",
  "FIFTY_PERCENT",
  "SIXTY_PERCENT",
  "SEVENTY_PERCENT",
  "EIGHTY_PERCENT",
  "NINETY_PERCENT",
  "FREE",
];

router.get("/all", getAllCoupon);

router.get(
  "/:code",
  checkSchema({
    code: {
      in: ["params"],
      errorMessage: "code coupon must be a number",
      isInt: true,
      toInt: true,
    },
  }),
  getDetailCoupon
);

router.post(
  "/create",
  upload.single("logo"),
  body("type")
    .notEmpty()
    .withMessage("Type field is required !")
    .isIn(DISCOUNT_PERCENT)
    .withMessage("The type not exist in the database !"),
  body("percent_discount")
    .notEmpty()
    .withMessage("percent_discount field is required !")
    .isNumeric()
    .withMessage("percent_discount field must be a number !"),
  body("shipping_discount")
    .notEmpty()
    .withMessage("shipping_discount field is required !")
    .isNumeric()
    .withMessage("shipping_discount field must be a number !"),
  body("logo")
    .notEmpty()
    .withMessage("logo field is required !")
    .isString()
    .withMessage("logo field must be a string path image !"),
  validateRequest,
  createCoupon
);

router.patch(
  "/:code",
  upload.single("logo"),
  checkSchema({
    code: {
      in: ["params"],
      errorMessage: "code coupon must be a number",
      isInt: true,
      toInt: true,
    },
  }),
  body("percent_discount")
    .notEmpty()
    .withMessage("percent_discount field cannot be empty !")
    .isNumeric()
    .withMessage("Invalid type percent_discount is must be a number !"),
  body("shipping_discount")
    .notEmpty()
    .withMessage("shipping_discount field cannot be empty !")
    .isInt()
    .withMessage("Invalid type shipping_discount is must be a number !"),
  validateRequest,
  updateCoupon
);

router.delete(
  "/:code",
  checkSchema({
    code: {
      in: ["params"],
      errorMessage: "code coupon must be a number",
      isInt: true,
      toInt: true,
    },
  }),
  deleteCoupon
);

export default router;
