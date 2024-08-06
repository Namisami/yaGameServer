import query from "@/database/query";
import jsonSerializer from "@/serializers/jsonSerializer";
import { ControllerMethod } from "@/types/ControllerMethod";
// import logger from "@/config/logger";

class PlayersController {
  async getPlayers(req: ControllerMethod["req"], res: ControllerMethod["res"]): Promise<void> {
    const data = await query.select("*", "players");
    res.end(jsonSerializer(data));
  }
}

const playersController = new PlayersController();

export default playersController;
