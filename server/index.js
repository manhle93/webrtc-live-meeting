const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      socket.fullName = session.fullName;
      return next();
    }
  }
  const { username, fullName } = socket.handshake.auth;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  socket.fullName = fullName;
  next();
});

io.on("connection", (socket) => {
  console.log("Co nguoi ket noi");
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
    fullName: socket.fullName,
  });
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.join(socket.userID);
  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      fullName: session.fullName,
      connected: session.connected,
    });
  });
  socket.emit("users", users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
    fullName: socket.fullName,
  });
  socket.on("disconnect", async () => {
    try {
      const matchingSockets = await io.in(socket.userID).allSockets(); //phương thức trả về một Tập hợp chứa ID của tất cả các phiên bản Socket nằm trong phòng đã cho.
      const isDisconnected = matchingSockets.size === 0;

      if (isDisconnected) {
        socket.broadcast.emit("user disconnected", socket.id);
        sessionStore.saveSession(socket.sessionID, {
          userID: socket.userID,
          username: socket.username,
          fullName: socket.fullName,
          connected: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("private message", (data) => {
    socket
      .to(data.to)
      .to(socket.userID)
      .emit("private message", {
        content: data.content,
        from: socket.userID,
        to: data.to,
      });
  });

  // ...
});

httpServer.listen(3000);
