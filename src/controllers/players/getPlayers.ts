import query from "@database/query";

// interface Player {
//   id: number
//   hp: number
//   username: string
//   posx: number
//   posy: number
// }

// Get players function
const getPlayers = async () => {
  const data = await query.select("*", "players");
  return data;
};

export default getPlayers;
