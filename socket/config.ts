import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://react-shoes-web-d47c8.web.app/"],
  },
});

httpServer.listen(5000);

const io_admin = io.of("/admin");

const io_client = io.of("/client");

export { io_admin, io_client };
