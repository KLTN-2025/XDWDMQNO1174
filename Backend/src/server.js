import express from "express";
import dotenv from "dotenv";
import db from "../models/index";
import router from "./routers/authRouter";
import userRouter from "./routers/userRouter";
import routerMiddlewares from "./middlewares/routerMidlleware";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// 🟢 Thiết lập Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL_Test || "http://localhost:5173",
    credentials: true,
  })
);

// 🟢 Middleware để parse JSON
app.use(express.json());

// //Gắn router vào ứng dụng
// //Auth router
// app.use("/api", router);
// //User Router
// app.use("/api", userRouter);
app.use(routerMiddlewares);

//Check Database chạy chưa
db.sequelize.sync().then(() => {
  console.log("✅ Database connected!");
  app.listen(process.env.PORT || 8080, () => {
    console.log(`🚀 Server chạy ở cổng ${process.env.PORT || 8080}`);
  });
});
// Khởi động server để lấy link mở server
// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });
