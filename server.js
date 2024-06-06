const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const routes = require("./routes/routes");
const characterStatusRoutes = require("./routes/characterStatusRoutes");
//Variables
let gameStarted = false;
let currentPin = null;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Include cookies in CORS requests if any
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use("/api/storyAPI", routes);
app.use("/api/characterStatus", characterStatusRoutes);

//=======================START IO  CONNNECTION ====================================
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinSession", (sessionId) => {
    socket.join(sessionId);
    console.log(`User joined session ${sessionId}`);
  });

  socket.on("adminAction", (data) => {
    const { sessionId, action } = data;
    if (action === "startGame") {
      gameStarted = true;
    } else if (action === "endGame") {
      gameStarted = false;
      currentPin = null; // Reset the PIN when the game ends
    }
    io.to(sessionId).emit("adminAction", action);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  //:::::::::::::::::::::::::Kip:::::::::::::::::::::::::::::::::::::::::::::::::

  socket.on("generatePin", (pin) => {
    if (!gameStarted) {
      currentPin = pin.replace(/\s+/g, ""); // Remove spaces before storing
      console.log(`Generated PIN: ${pin}`);
      io.to("session123").emit("adminAction", { action: "showPin", pin: pin });
    }
  });

  app.get("/api/gameStatus", (req, res) => {
    res.json({ gameStarted });
  });

  app.get("/api/currentPin", (req, res) => {
    res.json({ currentPin });
  });
  app.post("/api/validatePin", (req, res) => {
    const { enteredPin } = req.body;
    if (enteredPin === currentPin) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  });
  //:::::::::::::::::::::::::::Henrik:::::::::::::::::::::::::::::::::::::::::::::::
});

//=======================END IO  CONNNECTION ====================================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
