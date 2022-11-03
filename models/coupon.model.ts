import { model, Schema } from "mongoose";

enum CouponTypes {
  FREE = "FREE",
  NINETY_PERCENT = "NINETY_PERCENT",
  EIGHTY_PERCENT = "EIGHTY_PERCENT",
  SEVENTY_PERCENT = "SEVENTY_PERCENT",
  SIXTY_PERCENT = "SIXTY_PERCENT",
  FIFTY_PERCENT = "FIFTY_PERCENT",
  FORTY_PERCENT = "FORTY_PERCENT",
  THIRTY_PERCENT = "THIRTY_PERCENT",
  TWENTY_PERCENT = "TWENTY_PERCENT",
  TEN_PERCENT = "TEN_PERCENT",
}

export interface ICoupon {
  type: CouponTypes;
  code: number;
  percent_discount: number;
  shipping_discount: number;
  used: boolean;
  logo: string;
  brand: string;
}

const couponSchema = new Schema<ICoupon>(
  {
    type: {
      type: String,
      required: [true, "MONGODB type field can't not be blank !"],
      enum: CouponTypes,
    },
    code: {
      type: Number,
      unique: true,
      required: [true, "MONGODB code field can't be blank !"],
    },
    percent_discount: {
      type: Number,
      default: 1,
    },
    shipping_discount: {
      type: Number,
      default: 0,
    },
    used: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      required: [true, "MONGODB logo field can't not be blank !"],
    },
  },
  {
    timestamps: true,
  }
);

export const CouponModel = model<ICoupon>("coupons", couponSchema);
