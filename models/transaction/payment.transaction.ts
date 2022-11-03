import { Request, Response } from "express";
import { ClientSession } from "mongoose";
import AccountModel from "../account.model";
import PaymentModel, { PAID_STATUS } from "../payment.model";

export const payment_Transaction = async (
  req: Request,
  res: Response,
  userID: number,
  session: ClientSession
) => {
  let user = await AccountModel.findById(userID).session(session);
  if (!user) {
    throw {
      status: false,
      message: "User not found !",
    };
  }
  await AccountModel.findByIdAndUpdate(
    userID,
    {
      wallet: user.wallet - req.body.totalHasVoucher,
      cart: [],
    },
    {
      rawResult: true,
    }
  ).session(session);

  await PaymentModel.create({
    customer: user._id,
    cart: user.cart,
    paid_status: PAID_STATUS.DONE,
  });

  return res.status(200).json({
    status: true,
    message: "Payment successful ! Have a nice day",
  });
};
