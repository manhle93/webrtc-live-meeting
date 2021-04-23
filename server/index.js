const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

io.use((socket, next) => {
  const { username, fullName } = socket.handshake.auth;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  socket.fullName = fullName
  next();
});

io.on("connection", (socket) => {
  console.log('Co nguoi ket noi')
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
      fullName: socket.fullName
    });
  }
  socket.emit("users", users);
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
    fullName: socket.fullName
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });

  socket.on('private message', data => {
    console.log(data.to)
    socket.to(data.to).emit('private message', { content: data.content, from: socket.id })
  })



  // ...
});

httpServer.listen(3000);