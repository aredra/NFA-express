import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./User.js";
import BoardModel from "./Board.js";

// mongoose 는 express 와 mongoDB의 연결 역할을 한다.
// 전역으로 비동기 함수를 선언하여서 전역 Promise를 연결
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dotenv.MONGO_URI;
db.user = new UserModel(mongoose);
db.board = new BoardModel(mongoose);

export default db;
