import { where } from "sequelize";
import db from "../../models/index.js";

const { JwtToken } = db;

export const JwtModel = {
  // 🟢 Tạo JWT mới
  async createJwt({ UserId, Code, ExpirationDate }) {
    return await JwtToken.create({
      UserId,
      Code,
      IsUse: false, // mặc định chưa dùng
      ExpirationDate,
    });
  },

  // 🔵 Tìm JWT theo code (token)
  async findByCode(Code) {
    return await JwtToken.findOne({
      where: { Code },
    });
  },

  // 🟣 Đánh dấu token là đã sử dụng
  async markAsUsed(Code) {
    return await JwtToken.update({ IsUse: true }, { where: { Code } });
  },

  // Chỉ xóa token cụ thể
  async deleteLogoutToken(UserId, tokenCode) {
    return await JwtToken.destroy({
      where: {
        UserId,
        Code: tokenCode, // hoặc JwtId: idToken
      },
    });
  },

  // 🟠 Xóa token hết hạn
  async deleteExpiredTokens() {
    return await JwtToken.destroy({
      where: {
        ExpirationDate: { [db.Sequelize.Op.lt]: new Date() },
      },
    });
  },
};
