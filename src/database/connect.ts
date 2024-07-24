import { Client, ClientConfig } from "pg";
import dbConfig from "@config/dbConfig";
import logger from "@config/logger";


export type InitializerFunction = () => Promise<void>;

export class Database {
  static #instance: Database;
  #client: Client;
  
  constructor(dbConfig: ClientConfig) {
    if (Database.#instance) throw new Error("Database instance already exists");
    this.#client = new Client(dbConfig);
    Database.#instance = this;
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database(dbConfig);
    }
    return Database.#instance;
  }

  private async connect() {
    try {
      await this.#client.connect();
      logger.info("Connected to PostgreSQL database");
    } catch(err) {
      logger.error(err, "Error connecting to PostgreSQL database");
    }
  }

  async execute(sql: string) {
    try {
      const result = await this.#client.query(sql);
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

const db = new Database(dbConfig);

export default db;
