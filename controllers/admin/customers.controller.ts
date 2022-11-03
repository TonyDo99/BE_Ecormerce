import { Request, Response } from "express";
import AccountsModel from "../../models/account.model";
import { client } from "../../redis/config";
import { storageString } from "../../redis/storage";
import _ from "lodash";

export async function getCustomers(req: Request, res: Response): Promise<any> {
  try {
    let userCache = await client.GET("listCustomers");

    if (!userCache) {
      let lsUser = await AccountsModel.find({}, { passwo_: false }).exec();

      let listAccount = await storageString("listCustomers", lsUser);

      return res.status(200).json({ customersList: listAccount });
    }

    return res.status(200).json({ customersList: JSON.parse(userCache) });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.log(error);
  }
}
