import { socket } from "../services/socketio.service";

export const setupPage = (setVar) => {
  socket.on("page:change:trigger", (msg) => setVar(msg));
};

export const receiveMessage = (message, setVar) => {
  socket.on(message, (msg) => setVar(msg));
};

export const sendMessage = (path, message) => {
  socket.emit(path, message);
};
