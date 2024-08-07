import User from "@/models/user";
import { ControllerMethod } from "@/types/ControllerMethod";

class PlayersController {
  async getPlayers(req: ControllerMethod["req"], res: ControllerMethod["res"]) {
    const players = await User.getAll();
    res.end(players.json());
  }

  async postPlayer(req: ControllerMethod["req"], res: ControllerMethod["res"]) {
    if (req?.body) {
      const { username } = req.body;
      if (typeof username === "string") {
        const user = await User.create(username);
        res.end(user.json());
      } else {
        res.end("Username must be string");
      }
    }
  }
}

const playersController = new PlayersController();

export default playersController;
