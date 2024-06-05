const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const routes = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/storyAPI", routes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinSession", (sessionId) => {
    socket.join(sessionId);
    console.log(`User joined session ${sessionId}`);
  });

  socket.on("adminAction", (data) => {
    const { sessionId, action } = data;
    io.to(sessionId).emit("adminAction", action);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
