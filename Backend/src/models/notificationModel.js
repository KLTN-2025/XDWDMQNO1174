import db from "../../models/index";
const { Notification, Sequelize, User } = db;
const { Op } = Sequelize;

export const NotificationModel = {
  /**
   * Lấy tin nhắn giữa 2 người, dạng phân trang ngược (infinite scroll)
   * @param {UUID | null} cursor - MessID của tin nhắn cũ nhất hiện tại
   * @param {number} limit - số tin mỗi lần lấy (mặc định 10)
   */
  async getNotification(UserId, cursor = null, limit = 10) {
    try {
      const user = await User.findPk(UserId);
      if (!user) {
        throw new Error("User not found");
      }
      const whereCondition = {
        [Sequelize.Op.or]: [{ UserID: UserId }],
      };
    } catch (error) {
      console.error("❌ Lỗi khi lấy thông báo:", error);
      throw error;
    }
  },
};
