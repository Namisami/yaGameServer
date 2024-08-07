import { Socket } from "socket.io";

import tilesController from "@/controllers/tilesController";
import logger from "@config/logger";


// Function used to handle client connection
const connectionHandler = (socket: Socket) => {
  logger.info("USER connected");

  // Subscribe all used socket controllers
  tilesController.subscribe(socket);
  
  socket.on("disconnect", () => {
    // Unsibscribe all registered socket controllers
    tilesController.unsubscribe(socket);
    logger.info("USER disconnected");
  });
};

export default connectionHandler;
