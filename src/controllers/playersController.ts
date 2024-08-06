import logger from "@/config/logger";
import User from "@/models/user";
import { ControllerMethod } from "@/types/ControllerMethod";
// import logger from "@/config/logger";

class PlayersController {
  async getPlayers(req: ControllerMethod["req"], res: ControllerMethod["res"]) {
    const players = await User.getAll();
    res.end(players);
  }

  async postPlayer(req: ControllerMethod["req"], res: ControllerMethod["res"]) {
    if (req?.body) {
      const { username } = req.body;
      if (typeof username === "string") {
        const user = await User.create(username);
        res.end(user);
      } else {
        res.end("Username must be string");
      }
    }
  }
}

const playersController = new PlayersController();

export default playersController;
