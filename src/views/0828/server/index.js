const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

function onConnection(socket) {
    console.log("666!!!")
}

io.on('connection', onConnection)

http.listen(3001, () =>
    console.log(`listening on port http://localhost:3001`)
);
