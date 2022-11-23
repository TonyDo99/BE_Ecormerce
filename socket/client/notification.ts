import { io_admin, io_client } from "../config";

export const notificationPayment = async ({
  ...agrs
}: {
  paid: boolean;
  message: string;
}) => {
  if (agrs.paid) {
    io_admin.emit("notification", agrs);
    io_client.emit("notification", {
      ...agrs,
      message: "You paid your cart successfully. Have a nice day !",
    });
  } else {
    io_admin.emit("notification", {
      status: false,
      message: "Paid failed",
    });
    io_client.emit("notification", {
      ...agrs,
      message:
        "You paid your cart failed. Please contact tour admin to check again !",
    });
  }
};
