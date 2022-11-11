import { Request, Response } from "express";
import _ from "lodash";
import AccountsModel, { IAccount } from "../../models/account.model";
import { CouponModel, ICoupon } from "../../models/coupon.model";

export async function createCoupon(req: Request, res: Response) {
  try {
    let { type, percent_discount } = req.body;

    await CouponModel.create({
      ...req.body,
      percent_discount: percent_discount / 100,
      code: Math.floor(Math.random() * 1000000),
    });
    return res.status(201).json({
      status: true,
      message: `Create coupon ${type} successfully !`,
    });
  } catch (error: any) {
    console.error(`%c ${error}`, "color: red");
    return res.status(400).send(error);
  }
}

export async function updateCoupon(
  req: Request,
  res: Response
): Promise<Response> {
  let { code } = req.params;
  try {
    let updated = await CouponModel.findOneAndUpdate(
      { code: parseInt(code) },
      {
        ...req.body,
        percent_discount: req.body.percent_discount / 100,
        updatedAt: Date(),
      }
    );
    if (!updated)
      return res.status(404).json({
        status: false,
        message: `This coupon code ${code} might be not exist anymore !`,
      });
    return res.status(200).json({
      status: true,
      message: `Congratulation coupon code ${code} updated successfully !`,
    });
  } catch (error) {
    console.error(`%c ${error}`, "color: red");
    return res.status(400).send(error);
  }
}

export async function deleteCoupon(
  req: Request,
  res: Response
): Promise<Response> {
  let { code } = req.params;
  try {
    let { deletedCount } = await CouponModel.deleteOne(
      { code: parseInt(code) },
      {}
    );

    if (!deletedCount)
      return res
        .status(404)
        .json({ status: false, message: `Coupon code ${code} not found !` });

    return res
      .status(200)
      .json({ status: true, message: `Coupon code ${code} was deleted !` });
  } catch (error) {
    console.error(`%c ${error}`, "color: red");
    return res.status(400).send(error);
  }
}

export async function getAllCoupon(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    let coupons = await CouponModel.find({}, { _id: false });

    return res.status(200).json({
      status: true,
      message: `Get list of coupons successfully !`,
      coupons,
    });
  } catch (error) {
    console.error(`%c ${error}`, "color: red");
    return res.status(400).send(error);
  }
}

export async function applyCoupon(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    let user: IAccount | null = await AccountsModel.findById(res.locals.userID);

    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    let total = _.reduce(user.cart, (x, item) => x + item.price, 0);

    if (!total)
      return res.status(400).json({
        status: false,
        message:
          "You wasn't buy anything yet. Please buy at least one and try again later !",
      });

    let coupon: ICoupon | null = await CouponModel.findOne(
      { code: req.body.code, used: false },
      "percent_discount shipping_discount used",
      {
        lean: true,
      }
    ).select("-_id");

    if (!coupon)
      return res.status(404).json({
        status: false,
        message:
          "Coupon not found or it might be used already. Please try another coupon !",
      });

    return res.status(200).json({
      status: true,
      ...coupon,
      totalHasVoucher:
        +(
          total -
          total * coupon.percent_discount -
          coupon.shipping_discount
        ).toFixed(2) > 0
          ? +(
              total -
              total * coupon.percent_discount -
              coupon.shipping_discount
            ).toFixed(2)
          : 0,
      message: "Total after apply voucher",
    });
  } catch (error) {
    console.error(`%c ${error}`, "color: red");

    return res.status(400).send(error);
  }
}

export async function getDetailCoupon(req: Request, res: Response) {
  try {
    let coupon = await CouponModel.findOne(
      { code: +req.params.code },
      { _id: false }
    );
    if (!coupon)
      return res.status(404).json({
        status: false,
        message: `Coupon ${+req.params.code} not found !`,
      });
    return res.status(200).json({
      status: true,
      message: `Get coupon ${+req.params.code} success !`,
      data: coupon,
    });
  } catch (error) {
    console.error(`%c ${error}`, "color: red");
    return res.status(400).send(error);
  }
}
