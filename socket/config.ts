import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();

export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://react-shoes-web-d47c8.web.app/"],
  },
});


httpServer.listen(5000);

io.on("connection", (socket: Socket) => {
  console.log(`Socket connection successfully with id ${socket.id}`);
});
