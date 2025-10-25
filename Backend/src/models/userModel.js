import db from "../../models/index";

const { User } = db;

export const UserModel = {
  // 🔍 Tìm user theo email
  async findByEmail(email) {
    return await User.findOne({ where: { Email: email } });
  },

  //Tìm user theo UserID
  async findUserByID(UserId) {
    return await User.findByPk(UserId, {
      attributes: ["UserId", "Name", "Email", "PhoneNumber"],
    });
  },

  // ➕ Tạo user mới
  async createUser({ Name, PhoneNumber, Email, Password, Role }) {
    return await User.create({
      Name,
      PhoneNumber,
      Email,
      Password,
      Role,
      IsDelete: false, // giá trị mặc định
      Verify: false, //Mặc định khi đăng ký
    });
  },

  // 🔄 Cập nhật thông tin user
  async updateUser(userId, updatedData) {
    try {
      const allowedFields = ["Name", "PhoneNumber", "Email"];
      const safeData = {};

      for (const key of allowedFields) {
        const value = updatedData[key];
        if (updatedData[key] !== undefined && value !== null && value !== "") {
          safeData[key] = updatedData[key];
        }
      }

      const user = await User.findByPk(userId);
      if (!user) throw new Error("User not found");

      await user.update(safeData);
      return user;
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
      throw error;
    }
  },

  //Đổi mật khẩu model
  async changePassword(userId, Email, Password) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error("User not found");

      await user.update({ Password: Password });
      return user;
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      throw error;
    }
  },
};
