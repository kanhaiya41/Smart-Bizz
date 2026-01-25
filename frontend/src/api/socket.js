import { io } from "socket.io-client";
import { useEffect } from "react";

const SOCKET_URL = "http://localhost:9000"; // backend URL

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false, // manually connect
});

export const useSocket = (businessId) => {
  useEffect(() => {
    if (!businessId) return;

    //connect socket
    socket.connect();

    // join owner room
    socket.emit("join-owner", businessId);

    console.log("Socket connected & joined owner:", businessId);

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [businessId]);

  return socket;
};
