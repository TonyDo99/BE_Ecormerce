import express from "express";
import login from "./login.router";
import branch from "./branch.router";
import categories from "./categories.router";
import contact from "./contact.router";
import home from "./home.router";
import facebook from "./facebookOath.router";
import google from "./googleOath.router";
import mail from "./mail.router";
import payment from "./payment.router";
import register from "./register.router";
import couponRouter from "./coupon.router";
import { authen } from "../../middleware/authen-jwt";

const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/home", authen, home);
router.use("/categories", authen, categories);
router.use("/contact", authen, contact);
router.use("/coupon", authen, couponRouter);
router.use("/payment", authen, payment);
router.use("/google", google);
router.use("/facebook", facebook);
router.use("/brands", branch);
router.use("/sendMail", mail);

export default router;
