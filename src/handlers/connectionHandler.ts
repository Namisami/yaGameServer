import { Socket } from "socket.io";
import { tilesHandler as regTilesHandler } from "@handlers/tilesHandler";
import logger from "@/config/logger";


const connectionHandler = (socket: Socket) => {
  logger.info("USER connected");

  const tilesHandler = regTilesHandler(socket);
  
  socket.on("disconnect", () => {
    tilesHandler.off();
    logger.info("USER disconnected");
  });
};

export default connectionHandler;
