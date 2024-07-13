const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  database: process.env.DB_NAME,
};

export default dbConfig;
