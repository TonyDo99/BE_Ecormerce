import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import responseTime from "response-time";
import methodOverride from "method-override";
import admin from "./routes/admin/index";
import client from "./routes/client/index";
import "dotenv/config";
import "./firebase.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(responseTime());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // dont forget this
});

(async () => {
  await connect(process.env?.URI || "")
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Sever now running on ${process.env.PORT}`);
      });
    })
    .then(() => {
      app.use("/api", client);
      app.use("/api", admin);
    })
    .catch((err) => {
      console.error(`%c ${err}`, "color: red");
    });
})();
