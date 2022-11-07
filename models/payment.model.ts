import { model, Schema, SchemaDefinitionProperty } from "mongoose";
import { IProduct } from "./product.model";

export enum PAID_STATUS {
  DONE = "done",
  PENDING = "pending",
}

export interface IHistoryPayment {
  customer: SchemaDefinitionProperty<any>;
  cart: Array<IProduct>;
  paid: number;
  paid_status: PAID_STATUS;
}

const paymentSchema = new Schema<IHistoryPayment>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
    cart: Array<IProduct>,
    paid: {
      type: Schema.Types.Number,
      default: 0,
    },
    paid_status: {
      type: String,
      enum: PAID_STATUS,
      required: true,
      default: PAID_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

const PaymentModel = model<IHistoryPayment>("payments", paymentSchema);

export default PaymentModel;
