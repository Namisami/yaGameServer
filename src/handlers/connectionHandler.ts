import { Socket } from "socket.io";
import { tilesHandler as regTilesHandler } from "@handlers/tilesHandler";


const connectionHandler = (socket: Socket) => {
  // logger.info(`${user} connected`);
  // socketIO.emit("connection", { username: user });
  const tilesHandler = regTilesHandler(socket);
  
  socket.on("disconnect", () => {
    tilesHandler.off();
    // logger.info(`${user} disconnected`);
  });
};

export default connectionHandler;
