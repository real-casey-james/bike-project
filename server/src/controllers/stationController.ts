import express, { Request, Response, Router } from "express";
import {
  createStation,
  deleteStation,
  getAllStations,
  getStation,
  updateStation,
  zodError,
} from "../services/stationService";
import { ZodError } from "zod";

const router: Router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const stations = await getAllStations();

    res.json(stations);
  } catch (err: any) {
    res.status(500).json("Internal Server Error");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await createStation(req.body);

    res.json();
  } catch (err: any) {
    console.error(err);
    if (err instanceof ZodError) {
      res.status(400).json(zodError);
    } else {
      res.status(500).json("Internal Server Error");
    }
  }
});

router.get("/:stationId", async (req: Request, res: Response) => {
  try {
    const station = await getStation(req.params.stationId);

    res.json(station);
  } catch (err: any) {
    if (err instanceof RangeError) {
      res.status(404).json("Station not found");
    } else if (err instanceof ZodError) {
      res.status(400).json("Station should be a number");
    } else {
      res.status(500).json("Internal Server Error");
    }
  }
});

router.put("/:stationId", async (req: Request, res: Response) => {
  try {
    await updateStation(req.params.stationId, req.body);

    res.json();
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json(zodError);
    } else {
      res.status(500).json("Internal Server Error");
    }
  }
});

router.delete("/:stationId", async (req: Request, res: Response) => {
  try {
    await deleteStation(req.params.stationId);

    res.json();
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json("Station should be a number");
    } else {
      res.status(500).json("Internal Server Error");
    }
  }
});

export default router;
