const express = require("express");
const cors = require("cors");
const http = require("http");
const sequelize = require("./config/database.js");
const initSocket = require("./config/socket.js");
const session = require("express-session");
const authRoutes = require("./routes/auth.route.js");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use("/api/auth", authRoutes);

// Initialize WebSocket events
initSocket(io);

// Sync DB (optional)
sequelize.sync();

module.exports = server;
