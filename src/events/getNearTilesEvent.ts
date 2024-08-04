import { Server } from "socket.io";

import getNearTiles from "@controllers/map/getNearTiles";
import logger from "@config/logger";

const getNearTilesEvent = async (socket: Server) => {
  const data = await getNearTiles();
  logger.info("Get near tiles", data);
  socket.emit("get-near-tiles", data);
};

export default getNearTilesEvent;
