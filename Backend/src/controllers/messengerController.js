import { MessengerModel } from "../models/messengerModel";
import { getIO } from "../sockets/chatSocket";
import dotenv from "dotenv";

dotenv.config();

export const MessengerController = {
  //Thêm tin nhắn vào DB
  async newMessenger(req, res) {
    try {
      //Lấy UserId trong middleware
      const SendId = req.user.id;
      const { ReceiveId, Content } = req.body;
      const URL_IMG = req.imageUrl || null; // lấy từ middleware uploadCloudinary

      // ✅ Kiểm tra dữ liệu đầu vào
      if (!SendId || !ReceiveId) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin người gửi hoặc người nhận." });
      }
      if (!Content && !URL_IMG) {
        return res.status(400).json({ message: "Tin nhắn trống." });
      }

      // ✅ Gọi model để thêm tin nhắn
      const newMessage = await MessengerModel.newMessenger(
        SendId,
        ReceiveId,
        Content,
        URL_IMG
      );

      // ✅ 2. Lấy instance socket
      const io = getIO();

      if (io) {
        // ✅ 3. Xác định phòng chat cố định
        const roomId = [SendId, ReceiveId].sort().join("_");

        // ✅ 4. Emit realtime
        io.to(roomId).emit("receiveMessage", newMessage);
        console.log("📡 Emit từ API:", newMessage.MessID);
      } else {
        console.warn("⚠️ Socket.io chưa khởi tạo khi gọi API");
      }

      // ✅ Trả lại tin nhắn mới cho frontend
      return res.status(201).json({
        message: "Gửi tin nhắn thành công.",
        data: newMessage,
      });
    } catch (error) {
      console.error("Lỗi lấy thông tin: ", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
  //Lấy tin nhắn từ DB
  async getMessenge(req, res) {
    try {
      //Lấy UserId trong middleware
      const SendId = req.user.id;
      const { ReceiveId } = req.body;
      if (!ReceiveId || !SendId) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin người gửi hoặc nhận" });
      }
      const getMessenger = await MessengerModel.getMessages(SendId, ReceiveId);
      // ✅ Trả lại tin nhắn mới cho frontend
      return res.status(200).json({
        message: "Gửi tin nhắn thành công.",
        data: getMessenger,
      });
    } catch (error) {
      console.error("Lỗi lấy thông tin: ", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  //Lấy Admin và Employee
  async getUserMessenger(req, res) {
    try {
      //Lấy UserId trong middleware
      const SendId = req.user.id;
      if (!SendId) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin người gửi hoặc nhận" });
      }
      const getUser = await MessengerModel.getUserMessenger(SendId);
      // ✅ Trả lại cho FE
      return res.status(200).json({
        message: "OK",
        data: getUser,
      });
    } catch (error) {
      console.error("Lỗi lấy thông tin: ", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
};
