import { Client, ClientConfig } from "pg";
import dbConfig from "@config/dbConfig";
import logger from "@config/logger";

export type InitializerFunction = () => Promise<void>;

export class DB {
  #db;
  constructor(dbConfig: ClientConfig) {
    this.#db = new Client(dbConfig);
  }

  private async connect() {
    try {
      await this.#db.connect();
      logger.info("Connected to PostgreSQL database");
    } catch(err) {
      logger.error(err, "Error connecting to PostgreSQL database");
    }
  }

  async execute(sql: string) {
    try {
      const result = await this.#db.query(sql);
      return result;
    } catch(err) {
      logger.error(err, "Error when executing query");
    }
  }

  async init(initializers: InitializerFunction[]) {
    logger.info("Running DB initialization");
    await this.connect().then(() => {
      initializers.forEach(async (initializer) => await initializer());
    });
    logger.info("DB initialization completed");
  }
}

const db = new DB(dbConfig);

export default db;