import express from "express";
import cors from "cors";
import stations from "./controllers/stationController";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/stations", stations);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
