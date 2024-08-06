import { Socket } from "socket.io";
import { tilesHandler as regTilesHandler } from "@handlers/tilesHandler";
import logger from "@config/logger";


// Function used to handle client connection
const connectionHandler = (socket: Socket) => {
  logger.info("USER connected");

  // Register all used handlers
  const tilesHandler = regTilesHandler(socket);
  
  socket.on("disconnect", () => {
    // Unsibscribe all registered handlers
    tilesHandler.off();
    logger.info("USER disconnected");
  });
};

export default connectionHandler;
