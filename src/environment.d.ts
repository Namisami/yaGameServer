declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;

      LOG_LEVEL?: string;

      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_HOST?: string;
      DB_PORT?: number;
      DB_NAME?: string;

      ROOT_PATH?: string;
      
      DATABASE_URL?: string;
    }
  }
}

export {};
