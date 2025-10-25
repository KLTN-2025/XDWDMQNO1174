import express from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";

const userRouter = express.Router();

//Lấy thông tin user
userRouter.get(
  "/user/information",
  verifyToken,
  UserController.getUserInformation
);

//Đổi thông tin người dùng
userRouter.post(
  "/user/changeInformation",
  verifyToken,
  UserController.changeInformation
);

//Đổi mật khẩu người dùng
userRouter.post(
  "/user/changePassword",
  verifyToken,
  UserController.changePassword
);
export default userRouter;
