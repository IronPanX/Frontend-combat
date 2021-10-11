const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: true,
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("screen-share", (msg) => {
    console.log("screen-share message: ");
    io.emit("screen-share", msg);
  });

  socket.on("ice", (msg) => {
    console.log('ice')
    io.emit('ice', msg)
  })

  socket.on("video-chat", (msg) => {
    console.log('video-chat')
    io.emit("video-chat", msg)
  })

  socket.on("video-chat-ice", (msg) => {
    console.log('video-chat-ice')
    io.emit("video-chat-ice", msg)
  })

  socket.on('drawing', (data) => {
    console.log('data', data)
    socket.broadcast.emit('drawing', data)
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
