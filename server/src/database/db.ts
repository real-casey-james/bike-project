import mysql from "mysql2/promise";
import { Config } from "./config";

export async function query(sql: string, params: any) {
  try {
    const connection = await mysql.createConnection(Config.getConfig());
    const [results] = await connection.query(sql, params);

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  query,
};
