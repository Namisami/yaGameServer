import Tile from "@/models/tile";
import { SocketControllerMethod } from "@/types/SocketControllerMethod";
// import logger from "@/config/logger";

// Enum which declare all handler events names
enum TILES {
  GET_NEAR="tiles:get-near",
}

// Tiles controller
class TilesController {
  // Return tiles near to user
  async getNearTiles(socket: SocketControllerMethod["socket"]) {
    const data = await Tile.getNear(0, 0);
    socket.emit(TILES.GET_NEAR, data);
  }

  // Subscribe all controller events
  subscribe(socket: SocketControllerMethod["socket"]) {
    socket.on(TILES.GET_NEAR, () => this.getNearTiles(socket));
  }
  
  // Unsubscribe all controller events
  unsubscribe(socket: SocketControllerMethod["socket"]) {
    socket.off(TILES.GET_NEAR, this.getNearTiles);
  }
}

const tilesController = new TilesController();

export default tilesController;
