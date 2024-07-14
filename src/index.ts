// IT MUST BE ON THE TOP OF THE ENTRY FILE
import "module-alias/register";
import * as dotenv from "dotenv";
dotenv.config();

import createApp from "@/app";
import router from "@routers/baseRouter";
// import logger from "@config/logger";

const app = createApp();

app.useRouter(router);

app.run();
