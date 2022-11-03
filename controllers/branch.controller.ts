import { Request, Response } from "express";
import BranchModel from "../models/brand.model";

export async function getBranch(req: Request, res: Response) {
  try {
    let brands = await BranchModel.find({}).exec();
    return res.status(200).json(brands);
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.log(`%c ${error}`, "color: red");
  }
}
