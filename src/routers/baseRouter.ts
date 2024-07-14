import getPlayers from "@/controllers/players/getPlayers";
import Router from "@routers/router";

const router = new Router();
router.add("/players", getPlayers);
// const router = (url) => {
//   switch (url) {
//     case "/players":
//       (async function() {
//         const result = await getPlayers();
//         res.end(result);
//       })();
//       break;
//     default:
//       res.end("Hello!");
//   }
// };

export default router;
