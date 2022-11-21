import express from "express";
import multer from "multer";
import {
  insertProducts,
  updateProduct,
} from "../../controllers/admin/products.controller";
import { body, checkSchema } from "express-validator";
import { validateRequest } from "../../middleware/validate-request";
const router = express.Router();
const upload = multer({ dest: "./public/uploads" });

const STATUS_PRODUCT = ["New", "Popular", "Sale"];

router.post("/insertProducts", upload.single("path"), insertProducts);

router.patch(
  "/updateProduct/:_id",
  upload.single("path"),
  checkSchema({
    _id: {
      in: ["params"],
      errorMessage: "_id product must be a string",
      isString: true,
    },
  }),
  body("name")
    .notEmpty()
    .withMessage("name field cannot be empty !")
    .isString()
    .withMessage("name field is must be a string"),
  body("path")
    .notEmpty()
    .withMessage("path field cannot be empty !")
    .isString()
    .withMessage("path field is must be a string !"),
  body("price")
    .notEmpty()
    .withMessage("price field cannot be empty !")
    .isNumeric()
    .withMessage("price field is must be a number !"),
  body("quantity")
    .notEmpty()
    .withMessage("quantity field cannot be empty !")
    .isNumeric()
    .withMessage("quantity field is must be a number !")
    .custom((value) => (value > 0 ? true : false))
    .withMessage(
      "Quantity of product cannot be lesser than 0. quantity must be greater than 0"
    ),
  body("status")
    .notEmpty()
    .withMessage("status field cannot be empty !")
    .isIn(STATUS_PRODUCT)
    .withMessage("The status not exist in the database !"),
  validateRequest,
  updateProduct
);
export default router;
