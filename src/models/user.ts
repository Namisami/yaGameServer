import query from "@/database/query";
import Controller from "@/controllers/controller";

export interface IUser {
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
    const data = await query.select("*", "players") as IUser[] | undefined;
    const users = data?.map((result) => new User(result.id, result.hp, result.username, result.posx, result.posy));
    return Controller.makeDataResult(users);
  }

  static async getByUsername(username: IUser["username"]) {
    const result = await query.select_one("*", "players", [
      `username=${username}`
    ]) as IUser | undefined;
    if (result) {
      const user = new User(result.id, result.hp, result.username, result.posx, result.posy);
      return Controller.makeDataResult(user);
    }
    return {};
  }

  static async create(username: IUser["username"]) {
    const result = await query.create(
      ["hp", "username", "posx", "posy"], 
      "players", 
      [100, `'${username}'`, 0, 0]
    ) as IUser;
    const user = new User(result.id, result.hp, result.username, result.posx, result.posy);
    return Controller.makeDataResult(user);
  }
}

export default User;
