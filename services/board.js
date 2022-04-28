import db from "../models/index.js";
import getDatabase from "../lambdas/getDatabase.js";

export default function BoardService() {
  const Board = db.board;
  const dbo = getDatabase();
  const dbConnect = dbo.getDb();

  return {
    createRescueActivity(req, res) {
      new Board(req.body).save((err) => {
        if (err) {
          res.status(500).json({
            message: "Server error",
            error: err,
          });
          console.log("구조활동 등록 실패", err);
          return;
        }
        res.status(200).json({ ok: "ok" });
      });
    },
    selectRescueActivityList(req, res) {
      Board.find().exec((err, users) => {
        res.status(200).json(users);
      });
    },
    updateRescueActivity(req, res) {
      const userid = req.body.userid;
      User.findById({ userid: userid }).exec((_err, user) => {
        return res.status(200).json(user);
      });
    },
    deleteRescueActivity(_req, res) {
      User.find().exec((err, users) => {
        res.status(200).json(users);
      });
    },
  };
}
