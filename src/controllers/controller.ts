import logger from "@config/logger";
import db from "@database/database";

type Player = {
  id: number,
  hp: number,
  username: string,
  posx: number,
  posy: number
};

const controller = async () => {
  try {
    const res = await db.execute("SELECT * FROM players");
    const data: Player[] | undefined = res?.rows; 
    return JSON.stringify(data, null, 2);
  } catch(err) {
    logger.error(err);
  }
};

export default controller;
