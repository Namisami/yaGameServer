import Tile from "@/models/tile";
import { SocketControllerMethod } from "@/types/SocketControllerMethod";

// Enum which declare all handler events names
enum TILES {
  GET_NEAR="tiles:get-near",
}

// Tiles controller
class TilesController {
  // Return tiles near to user
  async getNearTiles(socket: SocketControllerMethod["socket"], posx: number, posy: number) {
    const data = await Tile.getNear(posx, posy);
    socket.emit(TILES.GET_NEAR, data);
  }

  // Subscribe all controller events
  subscribe(socket: SocketControllerMethod["socket"]) {
    socket.on(TILES.GET_NEAR, ({posx, posy}) => this.getNearTiles(socket, posx, posy));
  }
  
  // Unsubscribe all ontroller events
  unsubscribe(socket: SocketControllerMethod["socket"]) {
    socket.off(TILES.GET_NEAR, this.getNearTiles);
  }
}

const tilesController = new TilesController();

export default tilesController;
