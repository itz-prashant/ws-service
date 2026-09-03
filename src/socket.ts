import config from "config";
import { createServer } from "node:http";
import { Server } from "socket.io";

const wsServer = createServer();

const io = new Server(wsServer, {
  cors: {
    origin: [
      config.get("frontend.ADMIN_DASHBOARD_BASE_URL"),
      config.get("frontend.clientUI"),
      config.get("frontend.adminUI"),
    ],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("join", (data) => {
    socket.join(String(data.tenantId)); // join rooms

    // Get rooms
    // console.log(io.of("/").adapter.rooms)
    socket.emit("join", { roomId: String(data.tenantId) });
  });
});

export default {
  wsServer,
  io,
};
