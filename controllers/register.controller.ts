import AccountsModel from "../models/account.model";
import md5 from "md5";
import { Request, Response } from "express";

export async function Register(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, avatar, address, phone, passwo_ } =
      req.body;
    // let path = req.file.path.split('\\').slice(1).join('/');
    // req.body.avatar = path;
    // Encrypt MD5 password

    if (
      !firstName ||
      !lastName ||
      !email ||
      !avatar ||
      !address ||
      !phone ||
      !passwo_
    )
      return res.status(201).json({
        status: false,
        message:
          "Missing data firstName lastName email avatar address phone passwo_ send to client !",
      });
    req.body.passwo_ = md5(passwo_);

    // Create account in accounts Schema
    let insert = await AccountsModel.create(req.body);
    if (insert) return res.status(201).json({ success: true });
    else return res.status(401).json({ success: false });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}
