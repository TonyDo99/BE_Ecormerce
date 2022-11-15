import { Request, Response } from "express";
import _ from "lodash";
import { startSession } from "mongoose";
import { payment_Transaction } from "../models/transaction/payment.transaction";
import { notificationPayment } from "../socket/client/notification";
export const payment = async (req: Request, res: Response) => {
  let session = await startSession();
  try {
    let { userID } = res.locals;
    session.startTransaction();
    await payment_Transaction(req, res, userID, session);
    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    console.log(
      `🚀 ~ file: payment.controller.ts ~ line 14 ~ payment ~ error, ${JSON.stringify(
        error
      )}`
    );
    await session.abortTransaction();
    await session.endSession();
    await notificationPayment(false);
    return res.status(400).json(error);
  }
};
