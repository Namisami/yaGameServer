import playersController from "@/controllers/playersController";
import login from "@controllers/auth/login";
import Router from "@routers/router";

const router = new Router();
router.add("/players", playersController.getPlayers);
router.add("/login", () => login("User"));
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
