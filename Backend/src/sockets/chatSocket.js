import { MessengerModel } from "../models/messengerModel";

let ioInstance;
export default function initChatSocket(io) {
  ioInstance = io;
  io.on("connection", (socket) => {
    // console.log("✅ Client kết nối:", socket.id);

    // Khi người dùng vào phòng chat
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      //  console.log(`🟢 ${socket.id} đã vào phòng ${roomId}`);
    });

    // // Khi client gửi tin nhắn mới
    // socket.on("sendMessage", async (data) => {
    //   // Chuẩn hóa key từ client (chấp nhận cả SendId/SendID)
    //   const SendId = data.SendId || data.SendID;
    //   const ReceiveId = data.ReceiveId || data.ReceiveID;
    //   const content = data.content || data.Content;
    //   const URL_Img = data.URL_Img || data.url_img || null;
    //   const MessId = data.MessId || data.MessID || null;
    //   console.log("Data trả về>> ", data);
    //   try {

    //     // Gọi model để lưu DB
    //     const message = await MessengerModel.newMessenger(
    //       SendId,
    //       ReceiveId,
    //       content,
    //       URL_Img
    //     );

    //     // Xác định phòng chat (ghép 2 userID, sắp xếp để nhất quán)
    //     const roomId = [SendId, ReceiveId].sort().join("_");

    //     // Gửi tin nhắn tới tất cả client trong phòng
    //     io.to(roomId).emit("receiveMessage", message);

    //     //console.log(`💬 Tin nhắn mới từ ${SendId} → ${ReceiveId}`);
    //   } catch (error) {
    //     console.error("❌ Lỗi gửi tin nhắn:", error);
    //     socket.emit("errorMessage", { message: "Gửi tin nhắn thất bại" });
    //   }
    // });

    // Khi client gửi tin nhắn mới
    socket.on("sendMessage", async (data) => {
      const SendId = data.SendId || data.SendID;
      const ReceiveId = data.ReceiveId || data.ReceiveID;
      const Content = data.content || data.Content || null;
      const URL_Img = data.URL_Img || data.url_img || null;
      const MessId = data.MessId || data.MessID || null;

      try {
        let message;

        if (MessId && SendId) {
          // ✅ Nếu đã có MessID -> chỉ lấy lại tin nhắn đó
          message = await MessengerModel.getMessByID(MessId, SendId);
          // console.log("🔁 Gửi lại tin nhắn đã có:", message.MessID);
        } else {
          // ✅ Nếu chưa có -> tạo mới tin nhắn
          message = await MessengerModel.newMessenger(
            SendId,
            ReceiveId,
            Content,
            URL_Img
          );
          console.log("🆕 Tạo tin nhắn mới:", message.MessID);
        }

        // Xác định phòng chat (ghép 2 userID để cố định)
        const roomId = [SendId, ReceiveId].sort().join("_");
        //console.log("Tin nhắn khi đi >>:", message);
        // Phát tin nhắn đến tất cả client trong phòng
        io.to(roomId).emit("receiveMessage", message);
      } catch (error) {
        console.error("❌ Lỗi gửi tin nhắn:", error);
        socket.emit("errorMessage", { message: "Gửi tin nhắn thất bại" });
      }
    });

    socket.on("disconnect", () => {
      console.log("❎ Client ngắt kết nối:", socket.id);
    });
  });
}

// ✅ Export hàm lấy io
export const getIO = () => ioInstance;
