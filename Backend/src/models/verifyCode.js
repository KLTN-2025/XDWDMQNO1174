import db from "../../models/index.js";

const { VerifyCode } = db;

export const VerifyModel = {
  //Tạo code
  async createVerifyCode({ UserID, Code, ExpirationDate }) {
    return VerifyCode.create({
      UserID,
      Code,
      IsUse: false, // mặc định chưa dùng
      ExpirationDate,
    });
  },
  //Tìm mã
  async findOneByUserAndCode(UserID, Code) {
    return VerifyCode.findOne({ where: { UserID, Code } });
  },

  //Đánh dấu mã đã sử dụng
  async markAsUsed(ID) {
    const code = await VerifyCode.findByPk(ID);
    if (code) {
      await code.update({ IsUse: true });
    }
  },

  //Xóa mã đã tồn tại
  async deleteOldCodes(UserID) {
    return await VerifyCode.destroy({
      where: { UserID },
    });
  },
};
