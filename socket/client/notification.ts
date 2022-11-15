import { Socket } from "socket.io";
import { io } from "../config";

export const notificationPayment = async (paid_status: boolean) => {
  if (paid_status) {
    io.of("/admin", (admin_socket: Socket) => {
      console.log(admin_socket.id);
      admin_socket.emit("notification", {
        status: true,
        message: "Paid success",
      });
    });
  } else {
    io.of("/admin", (admin_socket: Socket) => {
      admin_socket.emit("notification", {
        status: false,
        message: "Paid failed",
      });
    });
  }
};
