import logger from "@config/logger";
import db from "@database/connect";

type Player = {
  id: number,
  hp: number,
  username: string,
  posx: number,
  posy: number
};

// interface Data<T> {
//   data: T[]
// }

const getPlayers = async () => {
  try {
    const res = await db.execute("SELECT * FROM players");
    const data: Player[] | undefined = res?.rows; 
    console.log(res?.rows);
    logger.info("Success", data  );
    return JSON.stringify(data, null, 2);
  } catch(err) {
    logger.error(err);
  }
};

export default getPlayers;
