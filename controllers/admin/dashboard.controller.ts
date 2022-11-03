import AccountsModel from "../../models/account.model";
import { Request, Response } from "express";
import "../../socket/admin/statistical";

export function getDashboard(req: Request, res: Response) {
  return res.status(200);
}
export async function getAccount(req: Request, res: Response) {
  let userid = res.locals.userID;
  try {
    const account = await AccountsModel.findOne({
      _id: userid,
    }).exec();

    if (!account)
      return res
        .status(401)
        .json({ status: false, message: "This account is not exist !" });

    const { firstName, lastName, email, phone, avatar, address } = account;
    if (account) {
      res.json({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        avatar: avatar,
        address: address,
      });
    }
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}
