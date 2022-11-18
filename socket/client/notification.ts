import { io_admin } from "../config";

export const notificationPayment = async ({
  ...agrs
}: {
  paid: boolean;
  message: string;
}) => {
  if (agrs.paid) {
    io_admin.emit("notification", agrs);
  } else {
    io_admin.emit("notification", {
      status: false,
      message: "Paid failed",
    });
  }
};
