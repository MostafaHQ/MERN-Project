const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const port = 8000;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookies());
// app.use("./server/uploads", express.static("middleware")); // tells server where to search images from

require("./server/config/mongoose.config");
require("./server/routes/user.routes")(app);
require("./server/routes/attendance.routes")(app);

const server = app.listen(port, () => console.log("listining on port", port));

const io = require("socket.io")(server, { cors: true });

//emitters - passes data where it needs to go (emit)
//on - trigger -- listening for a particular event

//Name of the trigger
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chat", (msg) => {
    console.log("Got the message: " + msg);
    io.emit("post chat", msg);
  });
});
