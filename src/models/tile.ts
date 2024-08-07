import query from "@/database/query";
import jsonSerializer from "@/serializers/jsonSerializer";
import { IUser } from "./user";
// import logger from "@/config/logger";

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

  static async getNear(posx: IUser["posx"], posy: IUser["posy"]) {
    const data = await query.select("*", "tiles", [
      `x < ${posx + 50}`,
      `x > ${posx - 50}`,
      `y < ${posy + 50}`,
      `y > ${posy - 50}`,
    ]);
    return jsonSerializer(data);
  }
}

export default Tile;
