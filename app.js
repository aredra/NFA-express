require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 5600;

// const appRoutes = "./app/routes";
// const nodes = [""];
// for (const leaf of nodes) {
//   require(`${appRoutes}/${leaf}.route`)({ url: `/api/${leaf}`, app });
// }

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.listen(port, () => {
  console.log(`>>>>>>>>>>>>>>>>>>>> Express server started on port: ${port}`);
});

app.get("/", (req, res) => {
  res.json({ "현재 시간 : ": new Date().toLocaleString() });
});
app.get("/api/now", cors(corsOptions), (req, res) => {
  res.json({ now: new Date().toLocaleString() });
});
