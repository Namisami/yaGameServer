import logger from "@config/logger";
import postPlayer from "@controllers/players/postPlayer";
import getPlayerByUsername from "@controllers/players/getPlayerByUsername";


// Login function
// !!! FAKE NOW
const login = async (username: string) => {
  logger.info("User is trying to login");
  const player = await getPlayerByUsername(username);
  if (player) return player;

  const data = await postPlayer();
  logger.info(data);
  return data;
};

export default login;
