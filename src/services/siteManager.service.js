import { socket } from "../services/socketio.service";

export const setupManager = (setVar) => {
  socket.on("page:change:trigger", (msg) => setVar(msg));
};
