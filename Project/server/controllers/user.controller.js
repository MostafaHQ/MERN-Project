const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

class UserController {
  register(req, res) {
    console.log("req", req);
    const user = new User(req.body, req.file);
    user
      .save()
      .then(() => {
        // const payload = {
        //   id: user._id,
        // };
        res
          .cookie("usertoken", jwt.sign({ _id: user._id }, secret), {})

          .json({ msg: "successfully created user", user: user });
      })
      .catch((err) => res.json(err));
  }

  login(req, res) {
    User.findOne({ email: req.body.email })
      .then(async (user) => {
        if (user === null) {
          res.json({ msg: "invalid login attempt-user not found" });
        } else {
          // let passwordHash = await bcrypt.hash(user.password, 10);
          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              if (passwordIsValid) {
                res
                  .cookie("usertoken", jwt.sign({ _id: user._id }, secret, {}))
                  .json({ msg: "success!" });
              } else {
                console.log(user.password);
                res.json({ msg: "invalid login attempt-password incorrect" });
              }
            })
            .catch((err) => {
              console.log(err);
              res.json({ msg: "invalid login attempt 2", err });
            });
        }
      })
      .catch((err) => res.json(err));
  }

  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    User.findById(decodedJWT.payload._id)
      .then((user) => res.json({ user }))
      .catch((err) => res.json(err));
  }

  logout(req, res) {
    res.cookie("usertoken", jwt.sign({ _id: "" }, secret),{
      httpOnly: true,
      maxAge: 0 
    }).json({msg:"ok"})
  }
}

module.exports = new UserController();
