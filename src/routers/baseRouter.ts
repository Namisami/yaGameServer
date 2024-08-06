import playersController from "@/controllers/playersController";
import Router from "@routers/router";

const router = new Router();
router.get("/players", playersController.getPlayers);
router.post("/players", playersController.postPlayer);

export default router;
