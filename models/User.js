import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import applyDotenv from "../lambdas/applyDotenv.js";

export default function UserModel(mongoose) {
  const { jwtSecret } = applyDotenv(dotenv);

  const userSchema = mongoose.Schema(
    {
      userid: { type: String, maxlength: 10, unique: 1 },
      password: String,
      email: String,
      name: String,
      phone: String,
      birth: String,
      address: String,
      token: String,
    },
    { timestamps: true }
  );

  userSchema.pre("save", function (next) {
    let user = this;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

  userSchema.methods.comparePassword = function (plainPassword, cb) {
    let isMatch = false;
    console.log(" >> plainPassword >> " + plainPassword);
    console.log(" >> this.password >> " + this.password);
    if (bcrypt.compare(plainPassword, this.password)) {
      console.log(" >> plainPassword === this.password >> ");
      isMatch = true;
    } else {
      console.log(" >> plainPassword !== this.password >> ");
      isMatch = false;
    }
    bcrypt.compare(plainPassword, this.password, function (err, _isMatch) {
      if (err) {
        return cb(err);
      } else {
        console.log(" >> isMatch >> " + isMatch);
        return cb(null, isMatch);
      }
    });
  };
  userSchema.methods.generateToken = function (cb) {
    const user = this;
    // json web token 이용하여 token 생성하기 user id 와 두번째 param 으로 토큰을 만들고, param 을 이용하여
    // 나중에 userid를 찾아낸다.
    console.log(" jwtSecret >> " + jwtSecret);
    const token = jwt.sign(user._id.toHexString(), jwtSecret);

    user.token = token;
    user.save(function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  };
  userSchema.statics.findByToken = function (token, cb) {
    const user = this;

    //userid를 찾으면 위에서 secret으로 넣어준다. 여기서 decode는 user_id(위에서 넘겨준)가 될 것이다.
    jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
      //이 아이디와 토큰을 가진 유저를 찾는다.
      user.findOne(
        {
          _id: decode,
          token: token,
        },
        function (err, user) {
          if (err) return cb(err);
          cb(null, user);
        }
      );
    });
  };

  return mongoose.model("User", userSchema);
}
