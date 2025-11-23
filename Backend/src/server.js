import express from "express";
import dotenv from "dotenv";
import db from "../models/index";
import routerMiddlewares from "./middlewares/routerMidlleware";
import cors from "cors";
//Import cho socket
import http from "http";
import { Server } from "socket.io";
import initChatSocket from "./sockets/chatSocket";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// 🟢 Thiết lập Cors cho API vào
app.use(
  cors({
    origin: process.env.CLIENT_URL_Test || "http://localhost:5173",
    credentials: true,
  })
);

// 🟢 Middleware để parse JSON
app.use(express.json());
app.use(routerMiddlewares);

// 🟢 Tạo HTTP server để chia sẻ cho Socket.IO
const server = http.createServer(app);
// 🟢 Khởi tạo Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL_Test || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// 🟢 Truyền io vào file socket chat
initChatSocket(io);

//Check Database chạy chưa
db.sequelize.sync().then(() => {
  console.log("✅ Database connected!");
  server.listen(process.env.PORT || 8080, () => {
    console.log(`🚀 Server chạy ở cổng ${process.env.PORT || 8080}`);
  });
});
