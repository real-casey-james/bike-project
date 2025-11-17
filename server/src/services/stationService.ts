import {
  create,
  deleteOne,
  get,
  getAll,
  update,
} from "../repositories/stationRepository";
import { z } from "zod";

const StationIdType = z.coerce.number();

const Station = z.object({
  station_id: z.optional(StationIdType),
  name: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  bikes_available: z.coerce.number(),
});

const Stations = z.array(Station);

export type StationType = z.infer<typeof Station>;

export const getStation = async (station_id: any): Promise<StationType> => {
  const station_id_parsed = StationIdType.parse(station_id);

  const station = (await get(station_id_parsed)) as Array<any>;

  if (!station[0]) {
    throw new RangeError();
  }

  return Station.parse(station[0]);
};

export const getAllStations = async (): Promise<StationType[]> => {
  const stationsResult = await getAll();

  return Stations.parse(stationsResult);
};

export const createStation = async (data: any): Promise<void> => {
  const station: StationType = Station.parse(data);

  await create(station);
};

export const updateStation = async (
  station_id: any,
  data: any,
): Promise<void> => {
  const station: StationType = Station.parse(data);
  delete station.station_id;
  const station_id_parsed = StationIdType.parse(station_id);

  await update(station_id_parsed, station);
};

export const deleteStation = async (station_id: any): Promise<void> => {
  const station_id_parsed = StationIdType.parse(station_id);

  await deleteOne(station_id_parsed);
};

export const zodError = {
  error: "Please supply a station with all the expected fields",
  fields: {
    name: "string",
    longitude: "string",
    latitude: "string",
    bikes_available: "number",
  },
};
