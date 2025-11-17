import test, { mock } from "node:test";
import assert from "node:assert/strict";
import {
  createStation,
  deleteStation,
  updateStation,
} from "../src/services/stationService";
import { Config } from "../src/database/config";
import db from "../src/database/db";

mock.method(Config, "getConfig", () => {
  return {
    host: "localhost",
    user: "user",
    password: "password",
    database: "bike-project",
  };
});

const testStation = {
  name: "Test Station G3US94N",
  latitude: "44.444",
  longitude: "44.444",
  bikes_available: 44,
};

test("stations aren't created when payload not correct", async (t) => {
  await assert.rejects(createStation({}));

  await assert.rejects(
    createStation({
      name: "Station",
      latitude: "44.444",
      longitude: "44.444",
    }),
  );

  await assert.rejects(
    createStation({
      name: "Station",
      latitude: "44.444",
      bikes_available: 44,
    }),
  );
});

test("stations can be created, updated and deleted", async (t) => {
  await createStation(testStation);

  let station = await getTestStation();

  assert.ok(station);

  await updateStation(station.station_id, { ...station, bikes_available: 33 });

  station = await getTestStation();

  assert.equal(station.bikes_available, 33);

  await deleteStation(station.station_id);
});

const getTestStation = async () => {
  const station = (await db.query(
    "SELECT * FROM stations WHERE name = ? AND deleted_at IS NULL",
    [testStation.name],
  )) as Array<any>;

  return station[0];
};
