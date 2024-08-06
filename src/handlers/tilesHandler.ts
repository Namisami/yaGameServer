import { Socket } from "socket.io";
import getNearTiles from "@controllers/tiles/getNearTiles";
import logger from "@config/logger";


// Enum which declare all handler events names
enum TILES {
  GET_NEAR="tiles:get-near",
}

// Function used to handle all manipulations with tiles
export const tilesHandler = (socket: Socket) => {
  // Function used to get tiles near to player
  const getNearTilesHandler = async () => {
    const data = await getNearTiles();
    logger.info("Get near tiles", data);
    socket.emit(TILES.GET_NEAR, data);
  };

  // Function used to unsibscribe all registered handlers
  const off = () => {
    socket.off(TILES.GET_NEAR, getNearTilesHandler);
  };

  // Here we need to subscribe on handlers
  socket.on(TILES.GET_NEAR, getNearTilesHandler);

  return {
    off
  };
};
