import { Request, Response } from "express";
import AccountsModel from "../models/account.model";
import jwt from "jsonwebtoken";
import md5 from "md5";

export async function Login(req: Request, res: Response) {
  const { email, password } = req.body;
  let encrypte = md5(password);
  try {
    AccountsModel.findOne({ email: email })
      .then((existEmail) => {
        if (existEmail) {
          AccountsModel.findOne({
            $and: [{ email: email }, { passwo_: encrypte }],
          })
            .then((account) => {
              if (account) {
                const token_key = jwt.sign(
                  { userID: account._id },
                  process.env?.TOKEN_KEY || "",
                  {
                    expiresIn: "4h",
                  }
                );
                return res.json({
                  token: token_key,
                  exist_Account: true,
                  is_Admin: account.is_Admin,
                });
              } else
                return res.json({
                  exist_Account: false,
                  message:
                    "Account might be signup by another ways. Try use sign in by google or facebook !",
                });
            })
            .catch((err) => {
              console.error(`%c ${err}`, "color: red");
            });
        } else
          return res.json({
            authen: false,
            message: "Unauthorized",
          });
      })
      .catch((error) => {
        console.log(`%c ${error}`, "color: red");
      });
  } catch (error: any) {
    console.log(`%c ${error}`, "color: red");
  }
}

export async function google_Authentication(req: Request, res: Response) {
  try {
    let { email, displayName, photoURL } = req.body;
    let token_key;
    let profile_google = {
      firstName: displayName,
      lastName: "",
      email,
      phone: "",
      avatar: photoURL,
      address: "vi",
      is_Admin: false,
      cart: [],
    };
    let user_exists = await AccountsModel.findOne({ email });

    if (user_exists) {
      token_key = jwt.sign(
        { userID: user_exists._id },
        process.env?.TOKEN_KEY || ""
      );
      return res.status(200).json({
        token: token_key,
        exists_Account: true,
        is_Admin: user_exists.is_Admin,
      });
    }

    let result = await AccountsModel.create(profile_google);
    token_key = jwt.sign({ userID: result._id }, process.env?.TOKEN_KEY || "");
    return result
      ? res.status(200).json({
          token: token_key,
          exists_Account: true,
          is_Admin: result.is_Admin,
        })
      : res.status(401).json({
          signin: false,
          message: "Sign in google failed ! Something was wrong",
        });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error.message });
    console.error(error);
  }
}

export async function facebook_Authentication(req: Request, res: Response) {
  try {
    let { email, displayName, photoURL } = req.body;
    let token_key;
    let profile_facebook = {
      firstName: displayName,
      lastName: "",
      email,
      phone: "",
      avatar: photoURL,
      address: "vi",
      is_Admin: false,
      cart: [],
    };

    let user_exists = await AccountsModel.findOne({ email });
    if (user_exists) {
      token_key = jwt.sign(
        { userID: user_exists._id },
        process.env?.TOKEN_KEY || ""
      );
      return res.status(200).json({
        token: token_key,
        exists_Account: true,
        is_Admin: user_exists.is_Admin,
      });
    }

    let result = await AccountsModel.create(profile_facebook);
    token_key = jwt.sign({ userID: result._id }, process.env?.TOKEN_KEY || "");
    return result
      ? res.status(200).json({
          token: token_key,
          exists_Account: true,
          is_Admin: profile_facebook.is_Admin,
        })
      : res.status(401).json({
          signin: false,
          message: "Sign in facebook failed ! Something was wrong",
        });
  } catch (error: any) {
    res.status(401).json({ status: false, message: error.message });
    console.error(error);
  }
}
