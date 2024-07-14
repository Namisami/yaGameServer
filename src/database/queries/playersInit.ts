import { DBTable, DBField } from "@database/models/model";
import db, { InitializerFunction } from "@database/connect";
import logger from "@config/logger";


export const playersInit: InitializerFunction = async () => {
  logger.info("Initializing players table");
  const table = new DBTable("players", [
    new DBField("id", "integer").primaryKey(),
    new DBField("hp", "integer").notNull(),
    new DBField("username", "char(50)").notNull(),
    new DBField("posx", "integer"),
    new DBField("posy", "integer")
  ]);

  await db.execute(table.sql);
};
