import { Schema, model } from "mongoose";

export enum STATUS_SHOES {
  NEW = "New",
  POPULAR = "Popular",
  SALE = "Sale",
}

export interface IProduct {
  name: string;
  path: string;
  quantity: number;
  price: number;
  status: STATUS_SHOES;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name product can't not be blank !"],
    },
    path: {
      type: String,
      required: [true, "Image product can't not be blank !"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: STATUS_SHOES,
      default: STATUS_SHOES.NEW,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const ProductsModel = model<IProduct>("products", productSchema);
export default ProductsModel;
