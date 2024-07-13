import logger from "@config/logger";
import db from "@database/init";


const getPlayers = async () => {
  try {
    const res = await db.execute("SELECT * FROM players");
    logger.info("Success", res?.rows  );
    return JSON.stringify(res?.rows);
  } catch(err) {
    logger.error(err);
  }
};

export default getPlayers;
