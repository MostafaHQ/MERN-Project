const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

class UserController {
  register(req, res) {
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const email = req.body.email;
    // const password = req.body.password;
    // // const avatar = req.file.filename;
    // const userData = {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   // avatar,
    // };
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res
          .cookie("usertoken", jwt.sign({ _id: user._id }, secret), {})
          .json({ msg: "successfully created user", user: user });
      })
      
      .catch((err) => res.status(400).json(err));
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
    res
      .cookie("usertoken", jwt.sign({ _id: "" }, secret), {
        httpOnly: true,
        maxAge: 0,
      })
      .json({ msg: "ok" });
  }
}

module.exports = new UserController();
