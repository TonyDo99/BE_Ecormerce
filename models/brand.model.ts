import { Schema, model } from "mongoose";

interface IBranch {
  name: string;
  logo: string;
  about: string;
}

const branchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: [true, "Name branch can't not be blank !"],
    },
    logo: {
      type: String,
      required: [true, "Logo branch can't not be blank !"],
    },
    about: {
      type: String,
      required: [true, "About branch can't not be blank !"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const BranchModel = model<IBranch>("branches", branchSchema);
export default BranchModel;
