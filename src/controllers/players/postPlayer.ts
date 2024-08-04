import query from "@database/query";


// Post players function
const postPlayer = async () => {
  const data = await query.create(
    ["hp", "username", "posx", "posy"], 
    "players", 
    [100, "User", 0, 0]
  );
  return data;
};

export default postPlayer;
