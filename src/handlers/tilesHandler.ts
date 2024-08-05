import { Socket } from "socket.io";
import getNearTiles from "@controllers/map/getNearTiles";
import logger from "@config/logger";


enum TILES {
  GET_NEAR="tiles:get-near",
}

export const tilesHandler = (socket: Socket) => {
  const getNearTilesHandler = async () => {
    const data = await getNearTiles();
    logger.info("Get near tiles", data);
    socket.emit(TILES.GET_NEAR, data);
  };

  const off = () => {
    socket.off(TILES.GET_NEAR, getNearTilesHandler);
  };

  socket.on(TILES.GET_NEAR, getNearTilesHandler);

  return {
    off
  };
};
