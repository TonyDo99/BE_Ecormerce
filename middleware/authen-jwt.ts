import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authen(req: Request, res: Response, next: NextFunction) {
  let authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if (token) {
      const decodeToken: string | any = jwt.verify(
        token,
        process.env?.TOKEN_KEY || ""
      );
      res.locals.userID = decodeToken.userID;
      next();
    } else
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
  } catch (error) {
    res.status(401).send(error);
  }
}
