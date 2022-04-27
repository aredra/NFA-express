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
      User.findOne(
        {
          userid: req.body.userid,
        },
        (err, user) => {
          console.log(user);
          if (err) throw err;
          if (!user) {
            res
              .status(401)
              .send({ success: false, message: "해당 ID가 존재하지 않습니다" });
          } else {
            console.log(" ### 로그인 정보 : " + JSON.stringify(user));
            user.comparePassword(req.body.password, function (_err, isMatch) {
              if (!isMatch) {
                res.status(401).send({ message: "FAIL" });
              } else {
                user.generateToken((err, user) => {
                  if (err) res.status(400).send(err);

                  // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                  res.status(200).json(user);
                });
              }
            });
          }
        }
      );
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
