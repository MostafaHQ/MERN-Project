const User = require("../controllers/user.controller");
const upload = require("../middleware/uploads");

module.exports = (app) => {
  app.post("/api/register", User.register);
  app.post("/api/login", User.login);
};
