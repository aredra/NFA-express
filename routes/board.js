import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import BoardService from "../services/board.js";

dotenv.config();
const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cors());

app.use(function (_req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.post("/rescue-activity", cors(corsOptions), (req, res) => {
  BoardService().createRescueActivity(req, res);
});

app.get("/rescue-list", cors(corsOptions), (req, res) => {
  console.log('>>>>>>>');
  BoardService().selectRescueActivityList(req, res);
});

app.put(
  "/rescue-activity",
  cors(corsOptions),
  (req, res) => {
    BoardService().updateRescueActivity(req, res);
  }
);
app.delete(
  "/rescue-activity",
  cors(corsOptions),
  (req, res) => {
    console.log(">>>>>>>>>>");
    BoardService().deleteRescueActivity(req, res);
  }
);
export default app;
