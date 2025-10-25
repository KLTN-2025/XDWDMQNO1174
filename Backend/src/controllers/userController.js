import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel.js";

export const UserController = {
  //Lấy thông tin user
  async getUserInformation(req, res) {
    try {
      //Lấy UserId trong middleware
      const UserId = req.user.id;
      const user = await UserModel.findUserByID(UserId);
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }
      return res.status(200).json({
        message: "Thông tin của người dùng",
        data: user,
      });
    } catch (error) {
      console.error("Lỗi lấy thông tin: ", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  // Thay đổi thông tin người dùng
  async changeInformation(req, res) {
    //Lấy userId trong middleware
    const UserId = req.user.id;
    const user = await UserModel.findUserByID(UserId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    const { Name, PhoneNumber } = req.body;
    if (!Name && !PhoneNumber) {
      return res
        .status(400)
        .json({ message: "Không có thông tin để cập nhật" });
    }

    if (PhoneNumber) {
      if (PhoneNumber.startsWith("+84")) {
        return res.status(400).json({
          message: "Vui lòng nhập số điện thoại bắt đầu bằng 0, không dùng +84",
        });
      }
      // Phải có đúng 10 chữ số và chỉ toàn số
      const phoneRegex = /^0\d{9}$/; //Khai báo biểu thức chung quy ép Chuỗi phải bắt đầu bằng số 0, theo sau là chính xác 9 chữ số, và không có gì khác nữa.
      if (!phoneRegex.test(PhoneNumber)) {
        return res.status(400).json({
          message: "Số điện thoại phải gồm đúng 10 chữ số.",
        });
      }
    }
    // Tạo object chỉ chứa các field có giá trị thật sự
    const updateData = {};
    if (Name) updateData.Name = Name;
    if (PhoneNumber) updateData.PhoneNumber = PhoneNumber;

    // Thực hiện cập nhật
    await UserModel.updateUser(UserId, updateData);

    return res.status(200).json({ message: "Cập nhật thông tin thành công" });
  },

  //Sửa lại mật khẩu
  async changePassword(req, res) {
    //Lấy userId trong middleware
    const UserId = req.user.id;

    const user = await UserModel.findUserByID(UserId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    const { NewPassword, ComfirmPassword } = req.body;

    if (!NewPassword && !ComfirmPassword) {
      return res.status(400).json({ message: "Không có mật khẩu để cập nhật" });
    }
    if (NewPassword !== ComfirmPassword) {
      return res.status(422).json({ message: "Mật khẩu nhập lại không đúng" });
    }
    // ✅ Hash mật khẩu mới
    const hashedPass = await bcrypt.hash(NewPassword, 10);

    await UserModel.changePassword(user.UserId, user.Email, hashedPass);
    return res.status(200).json({ message: "Mật khẩu đã được đổi" });
  },
};
