import nodemailer from "nodemailer";
import { google } from "googleapis";
import historyMailModel from "../models/mail.model";
import { Request, Response } from "express";
import { AuthenticationType } from "nodemailer/lib/smtp-connection";
import "dotenv/config";
const OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESHTOKEN,
});

interface Options {
  /** the hostname or IP address to connect to (defaults to ‘localhost’) */
  host?: string | undefined;
  /** the port to connect to (defaults to 25 or 465) */
  port?: number | undefined;
  /** defines authentication data */
  auth?: AuthenticationType | undefined;
  /** defines if the connection should use SSL (if true) or not (if false) */
  secure?: boolean | undefined;
  /** turns off STARTTLS support if true */
  ignoreTLS?: boolean | undefined;
  /** forces the client to use STARTTLS. Returns an error if upgrading the connection is not possible or fails. */
  requireTLS?: boolean | undefined;
  /** tries to use STARTTLS and continues normally if it fails */
  opportunisticTLS?: boolean | undefined;
  /** optional hostname of the client, used for identifying to the server */
  name?: string | undefined;
  /** the local interface to bind to for network connections */
  localAddress?: string | undefined;
  /** how many milliseconds to wait for the connection to establish */
  transactionLog?: boolean | undefined;
  /** if set to true, then logs SMTP traffic and message content, otherwise logs only transaction events */
  debug?: boolean | undefined;
  /** defines preferred authentication method, e.g. ‘PLAIN’ */
  authMethod?: string | undefined;
  /** defines additional options to be passed to the socket constructor, e.g. {rejectUnauthorized: true} */
}

export async function sendEmailAdmin(req: Request, res: Response) {
  try {
    let { client, content } = req.body;
    const accessToken = await OAuth2Client.getAccessToken();

    let config: Options = {
      host: "dotanphat20@gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "dotanphat20@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESHTOKEN,
        accessToken: accessToken.toString(),
      },
    };

    // Create config transporter for admin mail
    const transporter = nodemailer.createTransport(config);

    transporter.verify((error, success) =>
      error
        ? new Error("Error verify transporter")
        : console.log("Server is ready to take our messages !")
    );

    //   Admin send email to client ( Custom template Email later )
    let result = await transporter.sendMail({
      from: client,
      to: "dotanphat20@gmail.com",
      subject: "Message from client send to admin",
      html: `<h1>${content}</h1>`,
    });
    historyMailModel.create({
      email: client,
      to: "dotanphat20@gmail.com",
      content,
    });
    return res.status(200).json({
      status: true,
      message: "Send email to admin success !",
      messageId: result.messageId,
    });
  } catch (error: any) {
    res.status(401).json({
      status: false,
      message: "Send email to admin failed !",
    });
    console.error(error);
  }
}
export async function sendEmailClient(req: Request, res: Response) {
  try {
    let { client, admin } = req.body;

    let transporter = nodemailer.createTransport({
      host: "dotanphat20@gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "dotanphat20@gmail.com", // generated ethereal user
        pass: "hatsunemiku01", // generated ethereal password
      },
    });

    transporter.verify((error, success) =>
      error
        ? new Error("Error verify transporter")
        : console.log("Server is ready to take our messages !")
    );

    // Send mail with defined transport object ( Custom template Email later )
    let result = await transporter.sendMail({
      from: client, // sender address
      to: admin, // receivers
      subject:
        "Thanks for join to shoes world. Verify your email is a next final step to join with us", // Subject line
      html: "<b>Hello world?</b>", // html body
    });

    return res.status(200).json({
      status: true,
      message: `Send email verify to client ${client} success !`,
      messageId: result.messageId,
    });

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error: any) {
    res.status(401).json({
      status: false,
      message: error.message,
    });
    console.error(`%c ${error}`, "color: red");
  }
}
