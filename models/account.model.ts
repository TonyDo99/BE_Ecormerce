import { Schema, model } from "mongoose";
import { IProduct } from "./product.model";
export interface IAccount {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwo_?: string;
  avatar: string;
  address: string;
  is_Admin: boolean;
  cart: Array<IProduct>;
  wallet: number;
}

const accountSchema = new Schema<IAccount>(
  {
    firstName: {
      type: String,
      required: [true, "First name can't not be blank !"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: { type: String },
    passwo_: { type: String, require: [true, "Password can't not be blank !"] },
    avatar: { type: String, require: [true, "Avatar can't not be blank !"] },
    address: { type: String, require: [true, "Address can't not be blank !"] },
    is_Admin: { type: Boolean, default: false },
    cart: Array<IProduct>,
    wallet: { type: Number, default: 500000 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const AccountModel = model<IAccount>("accounts", accountSchema);
export default AccountModel;
