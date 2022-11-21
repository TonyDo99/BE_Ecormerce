import { Request, Response } from "express";
import AccountsModel from "../../models/account.model";
import ProductsModel from "../../models/product.model";
import { storageString } from "../../redis/storage";
import { client } from "../../redis/config";

export async function getProducts(req: Request, res: Response): Promise<any> {
  try {
    // Check from Redis has list products or not
    let list = await client.GET(`listProducts`);

    if (!list) {
      // GET list products from MongoDB
      let list_shoes = await ProductsModel.find({}).exec();

      // Save & get list products to Redis
      let redis_list_shoes = await storageString(`listProducts`, list_shoes);
      if (redis_list_shoes) return res.status(200).json(redis_list_shoes);
      return res.status(200).json(list_shoes);
    }
    return res.status(200).json(JSON.parse(list));
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}
export async function getDetailProducts(
  req: Request,
  res: Response
): Promise<any> {
  const _id = req.params._id;
  try {
    let item = await ProductsModel.findOne({ _id: _id }).exec();
    if (item) return res.status(200).json(item);
    else
      return res
        .status(401)
        .json({ status: false, message: "Product not found !" });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}
export async function addToCart(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    let userid = res.locals.userID;
    let item = await ProductsModel.findById(_id).exec();

    if (!item)
      return res.status(401).json({
        status: false,
        message: "This product is not exist !",
      });

    let { quantity } = item;
    if (quantity < 1) {
      return res.json({
        status: false,
        message: "This products was sold out on stock",
      });
    } else {
      await ProductsModel.findByIdAndUpdate(_id, {
        quantity: quantity - 1,
      }).exec();
      let account = await AccountsModel.findById(userid).exec();

      if (!account)
        return res.status(401).json({
          status: false,
          message: "This account is not exist !",
        });
      account && account.cart.unshift(item);
      account.save();
    }
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}

export async function insertProducts(req: Request, res: Response) {
  try {
    const { name, status, quantity, price, path } = req.body;
    if (!name || !status || !quantity || !price || !path)
      return res.status(301).json({
        status: false,
        message: "Name & status & quantity & price & path are required !",
      });
    let insert = await ProductsModel.create(req.body);

    if (insert) return res.status(201).json({ success: true });
    else return res.status(401).json({ success: false });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error });
    console.error(`%c ${error}`, "color: red");
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    await ProductsModel.findByIdAndUpdate(req.params._id, {
      ...req.body,
      updated_at: Date(),
    });
    return res.status(200).json({
      status: true,
      message: `Congratulation coupon code ${req.params._id} updated successfully !`,
    });
  } catch (error) {
    console.error(`%c ${error}`, "color: red");
    return res.status(400).send(error);
  }
}
