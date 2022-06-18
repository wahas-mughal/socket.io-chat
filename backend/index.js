const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

io.on("connection", (socket) => {
  console.log("user is connected!");
  socket.on("message", (msg) => {
    console.log("MESSAGE RECEIVED: " + msg);
    io.emit("message", msg);
  });
});

server.listen(PORT, () => console.log(`server is connected on ${PORT}`));
