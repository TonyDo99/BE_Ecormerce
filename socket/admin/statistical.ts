import _ from "lodash";
import { Socket } from "socket.io";
import AccountsModel from "../../models/account.model";
import ProductsModel from "../../models/product.model";
import { io } from "../config";

// Total dashboard statistical
io.of("/admin").on("connection", (socket: Socket) => {
  // API for dashboard page
  socket.on("dashboard:statistical", async () => {
    setInterval(async () => {
      let total = 0;
      let totalBought = await AccountsModel.find(
        { cart: { $exists: true, $type: "array", $not: { $size: 0 } } },
        "cart"
      );

      let totalCustomers = await AccountsModel.countDocuments({});

      let equity: any = await ProductsModel.find();

      _.forEach(totalBought, ({ cart }) => {
        _.forEach(cart, ({ price }) => (total += price));
      });

      socket.emit("statistical", {
        totalCustomers,
        totalCustomersBought: totalBought.length,
        equity: _.reduce(equity, (sum, n) => sum + n.price, 0),
        totalCustomersNotBuy: totalCustomers - totalBought.length,
        statistical: total.toFixed(2),
      });
    }, 3000);
  });
});
