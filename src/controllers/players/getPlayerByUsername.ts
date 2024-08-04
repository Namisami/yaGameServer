import query from "@database/query";


// Get player by username function
const getPlayerByUsername = async (username: string) => {
  const player = await query.select_one("*", "players", [
    `username=${username}`
  ]);
  return player;
};

export default getPlayerByUsername;
