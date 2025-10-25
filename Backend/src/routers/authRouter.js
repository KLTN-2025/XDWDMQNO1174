import express from "express";
import { AuthController } from "../controllers/authController";

const router = express.Router();

//Đăng ký tài khoản
router.post("/register", AuthController.register);
//Đăng nhập
router.post("/login", AuthController.login);
//Xác thực mã xác thực
router.post("/verifyCode", AuthController.verifyCode);
//Đăng xuất
router.post("/logout", AuthController.logout);
//Gửi lại mã xác thực
router.post("/resendVerifyCode", AuthController.resendVerifyCode);
//Yêu cầu mã quên mật khẩu
router.post("/fogotPass", AuthController.forgotPass);
//Đổi mật khẩu
router.post("/changePass", AuthController.changePass);

export default router;
