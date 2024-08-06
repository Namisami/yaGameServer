import query from "@database/query";


// Get near tiles function
const getNearTiles = async () => {
  const data = await query.select("*", "tiles");
  return data;
};

export default getNearTiles;
