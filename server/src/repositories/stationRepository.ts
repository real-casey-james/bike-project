import db from "../database/db";
import { StationType } from "../services/stationService";
import { QueryResult } from "mysql2";

export async function getAll(): Promise<QueryResult> {
  return await db.query(`SELECT * FROM stations WHERE deleted_at IS NULL`, []);
}

export async function get(station_id: number): Promise<QueryResult> {
  return await db.query(
    `    
        SELECT * 
        FROM stations 
        WHERE deleted_at IS NULL 
        AND station_id = ?
    `,
    [station_id],
  );
}

export async function create(station: StationType): Promise<QueryResult> {
  return await db.query(`INSERT INTO stations SET ?`, station);
}

export async function update(
  station_id: number,
  station: StationType,
): Promise<QueryResult> {
  return await db.query(`UPDATE stations SET ? WHERE station_id = ?`, [
    station,
    station_id,
  ]);
}

export async function deleteOne(station_id: number): Promise<QueryResult> {
  return await db.query(
    `UPDATE stations SET deleted_at = NOW() WHERE station_id = ?`,
    station_id,
  );
}
