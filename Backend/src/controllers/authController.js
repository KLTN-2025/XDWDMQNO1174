import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { VerifyModel } from "../models/verifyCode.js";
import { JwtModel } from "../models/jwtModel.js";
import { sendVerifyCodeToUser, verifyUserCode } from "../utils/verifyHelper.js";
import dotenv from "dotenv";

dotenv.config();

export const AuthController = {
  // 🟢 Đăng ký tài khoản mới
  async register(req, res) {
    try {
      const { Name, PhoneNumber, Email, Password, Role } = req.body;

      // 1️⃣ Kiểm tra xem email đã tồn tại chưa
      const existingUser = await UserModel.findByEmail(Email);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email đã tồn tại trong hệ thống" });
      }

      // 2️⃣ Hash mật khẩu
      const hashedPassword = await bcrypt.hash(Password, 10);

      // 3️⃣ Tạo user mới
      const newUser = await UserModel.createUser({
        Name,
        PhoneNumber,
        Email,
        Password: hashedPassword,
        Role,
      });
      await sendVerifyCodeToUser(newUser, "Mã xác thực tài khoản");
      res.status(201).json({
        message: "Đăng ký thành công",
        user: { Name: newUser.Name, Email: newUser.Email },
        //token: code,
      });
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  //🟢 Xác minh VerifyCode
  async verifyCode(req, res) {
    try {
      const { Email, Code } = req.body;
      const user = await verifyUserCode(Email, Code);

      // Cập nhật trạng thái xác thực cho user
      await user.update({ Verify: true });

      res.json({ message: "Xác minh thành công" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // 🔵 Đăng nhập
  async login(req, res) {
    try {
      const { Email, Password } = req.body;

      // 1️⃣ Tìm user theo email
      const user = await UserModel.findByEmail(Email);
      if (!user) {
        return res.status(400).json({ message: "Tài khoản không tồn tại" });
      }

      // 2️⃣ Kiểm tra mật khẩu
      const validPass = await bcrypt.compare(Password, user.Password);
      if (!validPass) {
        return res.status(400).json({ message: "Sai mật khẩu" });
      }

      // Kiểm tra đã Verfiy Tài khoản chưa
      if (!user.Verify) {
        return res.status(400).json({
          message: "Tài khoản chưa được xác thực vui lòng xác thực tài khoản!",
        });
      }
      //  console.log(">>Userid", user.UserId);
      // 3️⃣ Sinh token mới
      const code = jwt.sign(
        { id: user.UserId, email: user.Email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES || "1d",
        }
      );

      // 4️⃣ Lưu vào bảng JwtToken
      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await JwtModel.createJwt({
        UserId: user.UserId,
        Code: code,
        ExpirationDate: expirationDate,
      });

      // 5️⃣ Trả về token cho client
      res.json({
        message: "Đăng nhập thành công",
        user: { Name: user.Name, Email: user.Email },
        token: code,
      });
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  //🟢 Gửi lại mã
  async resendVerifyCode(req, res) {
    try {
      const { Email } = req.body;
      const user = await UserModel.findByEmail(Email);
      //Xem người dùng tồn tại không
      if (!user) {
        return res.status(404).json({
          message: "Email không tồn tại",
        });
      }

      //Xem người dùng đã xác thực chưa
      if (user.Verify) {
        return res.status(400).json({
          message: "Tài khoản đã được xác thực.",
        });
      }

      //Xóa đi mã xác thực đã tồn tại
      await VerifyModel.deleteOldCodes(user.UserId);

      //Gửi lại mã xác thực
      await sendVerifyCodeToUser(user, "Gửi lại mã xác thực tài khoản");
      //Thông báo
      return res.status(200).json({
        message: "Mã xác thực đã gửi lại.",
      });
    } catch (error) {
      console.error("Lỗi gửi lại mã: ", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  // 🟢 Quên mật khẩu
  async forgotPass(req, res) {
    try {
      const { Email } = req.body;
      //Kiểm tra mail có tồn tại ?
      const user = await UserModel.findByEmail(Email);
      if (!user) {
        return res.status(404).json({
          message: "Email không tồn tại.Vui lòng nhập Email khác!",
        });
      }
      //Kiểm tra người dùng đã xác thực chưa(bỏ qua)
      // if (!user.Verify) {
      //   return res.status()
      // }

      //Tạo và gửi mã xác thực
      await sendVerifyCodeToUser(user, "Gửi mã xác thực quên mật khẩu");

      //Gửi lại thông báo
      return res.status(200).json({
        message: "Mã xác thực đã được gửi",
      });
    } catch (error) {
      console.error("Lỗi gửi lại mã: ", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  // 🟢 Đổi mật khẩu tài khoản
  async changePass(req, res) {
    try {
      const { Email, NewPass, ComfirmPass, Code } = req.body;
      //Kiểm Tra 2 password
      if (NewPass !== ComfirmPass) {
        return res
          .status(422)
          .json({ message: "Mật khẩu nhập lại không đúng" });
      }
      //Kiểm tra email
      const user = await UserModel.findByEmail(Email);
      if (!user) {
        return res.status(404).json({ message: "Email không tồn tại" });
      }
      //Tìm mã xác thực
      const VerifyCode = await VerifyModel.findOneByUserAndCode(
        user.UserId,
        Code
      );
      //Kiểm tra mã xác thực tồn tại không?
      if (!VerifyCode) {
        return res.status(404).json({ message: "Sai mã xác thực" });
      }
      //Kiểm tra nó đã được sài chưa
      if (VerifyCode.IsUse) {
        return res.status(400).json({ message: "Mã xác thực đã hết hiệu lực" });
      }
      // ✅ Kiểm tra thời hạn code
      if (new Date() > new Date(VerifyCode.ExpirationDate)) {
        return res.status(410).json({ message: "Mã xác thực đã hết hạn" });
      }
      // ✅ Hash mật khẩu mới
      const hashedPass = await bcrypt.hash(NewPass, 10);
      //Đổi mật khẩu
      await UserModel.changePassword(user.UserId, Email, hashedPass);

      // ✅ Đánh dấu mã đã dùng
      await VerifyModel.markAsUsed(VerifyCode.ID);

      return res.status(201).json({ message: "Đổi mật khẩu thành công!" });
    } catch (error) {
      console.error("Lỗi sửa mật khẩu: ", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
  // 🔴 Đăng xuất
  async logout(req, res) {
    try {
      // 1️⃣ Lấy token từ header Authorization
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Không tìm thấy token" });
      }

      const token = authHeader.split(" ")[1];

      // 2️⃣ Giải mã token để lấy UserId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // 3️⃣ Xóa token khỏi DB
      const deletedCount = await JwtModel.deleteLogoutToken(userId, token);

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Bạn đã Logout" });
      }

      // 4️⃣ Phản hồi cho client
      return res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error) {
      console.error("Lỗi khi logout:", error);

      // Trường hợp token hết hạn hoặc không hợp lệ
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        return res
          .status(401)
          .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
      }

      res.status(500).json({ message: "Lỗi server", error });
    }
  },
};
