import AccountsModel from "../models/account.model";
import { Request, Response } from "express";

export async function getHome(req: Request, res: Response) {
  try {
    let account = await AccountsModel.findOne(
      {
        _id: res.locals.userID,
      },
      { passwo_: false }
    );
    if (!account)
      return res.status(401).json({
        status: false,
        message: "This account is not exist !",
      });
    return res.status(200).json({ infor: account, cart: account.cart });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}
