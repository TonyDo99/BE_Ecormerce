import { Request, Response } from "express";
import AccountsModel from "../../models/account.model";

export async function updateProfile(req: Request, res: Response): Promise<any> {
  let userid = res.locals.userID;
  try {
    let update = await AccountsModel.findByIdAndUpdate(userid, {
      ...req.body,
      updated_at: Date(),
    }).exec();

    if (update)
      return res
        .status(200)
        .json({ status: true, message: "Update profile success !" });
    else
      return res
        .status(401)
        .json({ status: false, message: "Update profile failed !" });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}
