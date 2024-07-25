import { DBTable, DBField } from "@/database/model";
import db, { InitializerFunction } from "@database/database";
import logger from "@config/logger";


export async function playersInit() {
  logger.info("Initializing players table");
  const table = new DBTable("players", [
    new DBField("id", "integer").primaryKey(),
    new DBField("hp", "integer").notNull(),
    new DBField("username", "char(50)").notNull(),
    new DBField("posx", "integer"),
    new DBField("posy", "integer")
  ]);

  await db.execute(table.sql);
}
(async () => {
  await playersInit();
})();
