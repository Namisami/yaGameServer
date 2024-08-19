import { IUser } from "@/models/user";
import Model from "@/models/model";
import query from "@/database/query";

export interface ITile {
  id: number
  x: number
  y: string
  type: string
  location: number
}


class Tile {
  id: ITile["id"];
  x: ITile["x"];
  y: ITile["y"];
  type: ITile["type"];
  location: ITile["location"];

  constructor(
    id: ITile["id"],
    x: ITile["x"],
    y: ITile["y"],
    type: ITile["type"],
    location: ITile["location"],
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.location = location;
  }

  // Return tiles near user
  static async getNear(posx: IUser["posx"], posy: IUser["posy"]) {
    const data = await query.select("*", "tiles", [
      `x < ${posx + 50}`,
      `x > ${posx - 50}`,
      `y < ${posy + 25}`,
      `y > ${posy - 25}`,
    ]) as ITile[];
    const tiles = data?.map((result) => new Tile(result.id, result.x, result.y, result.type, result.location));
    return Model.makeDataResult(tiles);
  }
}

export default Tile;
