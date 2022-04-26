import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import morgan from "morgan";
import db from "./models/index.js";
import user from "./routes/users.js";
import board from "./routes/board.js";
import index from "./routes/index.js";
import getResponse from "./lambdas/getResponse.js";
import applyPassport from "./lambdas/applyPassport.js";
import applyDotenv from "./lambdas/applyDotenv.js";

async function startServer() {
  const app = express();
  const { mongoUri, port, jwtSecret } = applyDotenv(dotenv);
  const _passport = applyPassport(passport, jwtSecret);

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(_passport.initialize());
  app.use("/", index);
  app.use("/board", board);
  app.use("/user", user);
  app.use(morgan("dev"));
  db.mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(" ### 몽고DB 연결 성공 ### ");
    })
    .catch((err) => {
      console.log(" 몽고DB와 연결 실패", err);
      process.exit();
    });

  app.all("*", function (_req, res) {
    return getResponse.notFoundResponse(res, "페이지를 찾을 수 없습니다");
  });

  app.use((err, _req, res) => {
    if (err.name == "UnauthorizedError") {
      return getResponse.unauthorizedResponse(res, err.message);
    }
  });

  app.listen(port, () => {
    console.log("***************** ***************** *****************");
    console.log(
      `********** 서버가 ${port} 포트에서 정상적으로 실행되고 있습니다 *********`
    );
    console.log("***************** ***************** *****************");
  });

  app.get("/sse", (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // flush the headers to establish SSE with client

    let counter = 0;
    let interValID = setInterval(() => {
      counter++;
      // if (counter >= 10) {
      //     clearInterval(interValID);
      //     res.end(); // terminates SSE session
      //     return;
      // }
      res.write(`data: ${JSON.stringify({ num: counter })}\n\n`); // res.write() instead of res.send()
    }, 1000);

    // If client closes connection, stop sending events
    res.on("close", () => {
      console.log("client dropped me");
      clearInterval(interValID);
      res.end();
    });
  });
}

startServer();
