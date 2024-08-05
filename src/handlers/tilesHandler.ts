import { Socket } from "socket.io";
import getNearTiles from "@controllers/map/getNearTiles";
import logger from "@config/logger";


export const tilesHandler = (socket: Socket) => {
  const getNearTilesHandler = async () => {
    const data = await getNearTiles();
    logger.info("Get near tiles", data);
    socket.emit("get-near-tiles", data);
  };

  const off = () => {
    socket.off("tiles:get-near", getNearTilesHandler);
  };

  socket.on("tiles:get-near", getNearTilesHandler);

  return {
    off
  };
};
