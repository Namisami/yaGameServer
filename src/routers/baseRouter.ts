import controller from "@/controllers/controller";
import login from "@controllers/auth/login";
import getPlayers from "@controllers/players/getPlayers";
import Router from "@routers/router";

const router = new Router();
// router.add("/players", getPlayers);
router.add("/login", () => login("User"));
router.add("/test", controller.login);
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
