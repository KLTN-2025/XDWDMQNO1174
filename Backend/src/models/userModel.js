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
  //Đổi quyền User thành Employess
  async changeRole(currentUserId, targetUserId, newRole) {
    try {
      // 1️⃣ Kiểm tra người thực hiện
      const currentUser = await User.findByPk(currentUserId);
      if (!currentUser || currentUser.Role !== "Admin") {
        throw new Error("Bạn không có quyền thực hiện hành động này");
      }

      // 2️⃣ Kiểm tra vai trò hợp lệ
      const validRoles = ["Admin", "Employee", "User"];
      if (!validRoles.includes(newRole)) {
        throw new Error("Vai trò không hợp lệ");
      }

      // 3️⃣ Tìm người bị đổi quyền
      const targetUser = await User.findByPk(targetUserId);
      if (!targetUser) {
        throw new Error("Không tìm thấy người dùng cần đổi quyền");
      }

      // ✅ 4️⃣ Cập nhật role (cho phép đổi cả Admin)
      await targetUser.update({ Role: newRole });

      // console.log(
      //   `✅ ${currentUser.Email} đã đổi quyền của ${targetUser.Email} thành ${newRole}`
      // );
      return targetUser;
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật quyền:", error);
      throw error;
    }
  },
};
