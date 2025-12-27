import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    socket.on("join-owner", (ownerId) => {
      socket.join(`owner:${ownerId}`);
      console.log(`Owner joined room owner:${ownerId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export const emitToOwner = (ownerId, event, payload) => {
  if (!io) return;
  io.to(`owner:${ownerId}`).emit(event, payload);
};
