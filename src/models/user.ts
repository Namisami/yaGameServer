import query from "@/database/query";
import jsonSerializer from "@/serializers/jsonSerializer";
import logger from "@/config/logger";

interface IUser {
  id: number
  hp: number
  username: string
  posx: number
  posy: number
}


class User {
  id: IUser["id"];
  hp: IUser["hp"];
  username: IUser["username"];
  posx: IUser["posx"];
  posy: IUser["posy"];

  constructor(
    id: IUser["id"],
    hp: IUser["hp"],
    username: IUser["username"],
    posx: IUser["posx"],
    posy: IUser["posy"],
  ) {
    this.id = id;
    this.hp = hp;
    this.username = username;
    this.posx = posx;
    this.posy = posy;
  }

  static async getAll() {
    const data = await query.select("*", "players");
    return jsonSerializer(data);
  }

  static async create(username: IUser["username"]) {
    const result = await query.create(
      ["hp", "username", "posx", "posy"], 
      "players", 
      [100, `'${username}'`, 0, 0]
    );
    return jsonSerializer(new User(result.id, result.hp, result.username, result.posx, result.posy) as object);
  }
}

export default User;
