import { io } from "socket.io-client";

export const socket = io(
  `${import.meta.env.VITE_BACKEND_BASE_URL}:${import.meta.env.VITE_SOCKET_PORT}`
);

export const reconnectSocket = (socket, newUrl) => {
  socket.disconnect();
  const newSocket = io(`${newUrl}`);
  return newSocket;
};
