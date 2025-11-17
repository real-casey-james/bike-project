export const config = {
  db: {
    host: "db",
    user: "user",
    password: "password",
    database: "bike-project",
  },
  port: 3000,
};

export class Config {
  public static getConfig() {
    return config.db;
  }
}
