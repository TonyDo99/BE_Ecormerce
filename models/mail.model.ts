import { Schema, model } from "mongoose";

interface IEmail {
  email: string;
  to: string;
  content: string;
}

const validateEmail = (email: string) => {
  return email.includes("@gmail.com");
};

const historyMailSchema = new Schema<IEmail>(
  {
    email: {
      type: String,
      required: [true, "Email can not be blank !"],
      trim: true,
      validate: [validateEmail, "Email is not valid !"],
    },
    to: {
      type: String,
      required: [true, "Send to who can not be blank !"],
      trim: true,
      validate: [validateEmail, "Email is not valid !"],
    },
    content: {
      type: String,
      required: [true, "Context can't not be blank !"],
      trim: true,
    },
  },
  { timestamps: { createdAt: "create_at" } }
);

const historyMailModel = model<IEmail>("historysendmails", historyMailSchema);
export default historyMailModel;
