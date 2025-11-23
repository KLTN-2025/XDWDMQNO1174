import db from "../../models/index";
const { Messenger, Sequelize, User } = db;
const { Op } = Sequelize;

export const MessengerModel = {
  /**
   * Lấy tin nhắn giữa 2 người, dạng phân trang ngược (infinite scroll)
   * @param {UUID} SendId - ID người gửi
   * @param {UUID} ReceiveId - ID người nhận
   * @param {UUID | null} cursor - MessID của tin nhắn cũ nhất hiện tại
   * @param {number} limit - số tin mỗi lần lấy (mặc định 10)
   */
  //Lấy 1 tin nhắn thông qua MessID
  async getMessByID(MessId, SendId) {
    try {
      const Sender = await User.findByPk(SendId);
      const Mess = await Messenger.findByPk(MessId);
      if (!Sender || !Mess) {
        throw new Error("User not found");
      }
      return Mess;
    } catch (error) {
      console.error("❌ Lỗi khi lấy tin nhắn:", error);
      throw error;
    }
  },

  //Lấy tin nhắn và lấy 10 tin nhắn
  async getMessages(SendId, ReceiveId, cursor = null, limit = 10) {
    try {
      const Sender = await User.findByPk(SendId);
      const Reciver = await User.findByPk(ReceiveId);
      if (!Sender || !Reciver) {
        throw new Error("User not found");
      }

      const whereCondition = {
        [Sequelize.Op.or]: [
          { SendID: SendId, ReceiveID: ReceiveId },
          { SendID: ReceiveId, ReceiveID: SendId },
        ],
      };

      // Nếu có cursor (MessID của tin nhắn cũ nhất hiện tại)
      if (cursor) {
        // Tìm tin nhắn tương ứng để lấy thời gian của nó
        const cursorMessage = await Messenger.findByPk(cursor);
        if (cursorMessage) {
          whereCondition.createdAt = {
            [Sequelize.Op.lt]: cursorMessage.createdAt,
          };
        }
      }

      const messages = await Messenger.findAll({
        where: whereCondition,
        order: [["createdAt", "DESC"]],
        limit,
      });

      // Đảo thứ tự lại để frontend hiển thị từ cũ → mới
      return messages.reverse();
    } catch (error) {
      console.error("❌ Lỗi khi lấy tin nhắn:", error);
      throw error;
    }
  },

  //Thêm tin nhắn vào để test để lấy tin nhắn
  async newMessenger(SendId, ReceiveId, content, URL_Img) {
    try {
      const Sender = await User.findByPk(SendId);
      const Reciver = await User.findByPk(ReceiveId);
      if (!Sender || !Reciver) {
        throw new Error("User not found");
      }
      //Thêm tin nhắn mới
      const newMessage = await Messenger.create({
        SendID: SendId,
        ReceiveID: ReceiveId,
        Content: content,
        URL_Img: URL_Img || null,
        isSeen: false,
        IsDelete: false,
      });

      return newMessage;
    } catch (error) {
      console.error("❌ Lỗi khi lấy tin nhắn:", error);
      throw error;
    }
  },
  //Lấy thông tin user để nhắn tin (Admin và Employee )
  async getUserMessenger(SendID) {
    try {
      const SendId = await User.findByPk(SendID);
      if (!SendId) {
        throw new Error("User not found");
      }
      // Lấy các user có Role là Admin hoặc Employee, trừ chính sender
      const users = await User.findAll({
        where: {
          Role: ["Admin", "Employee"],
          UserId: { [Op.ne]: SendID }, // loại bỏ người gửi khỏi danh sách
          IsDelete: false, // nếu bạn có cột xóa mềm
        },
        attributes: ["UserId", "Name", "Email", "Role"], // chỉ lấy các trường cần
      });

      return users;
    } catch (error) {
      console.error("❌ Lỗi khi lấy tin nhắn:", error);
      throw error;
    }
  },
};
