import express from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { MessengerController } from "../controllers/messengerController";
import { upload } from "../middlewares/upLoadFE";
import { uploadToCloudinary } from "../middlewares/upLoadCloudinary";
const messengerRouter = express.Router();

//Dùng API gửi tin nhắn (Test db)
messengerRouter.post(
  "/messenger/newMessengerAPI",
  verifyToken,
  upload.single("image"), // Nhận file
  uploadToCloudinary("chat_images"), // Upload lên Cloudinary
  MessengerController.newMessenger
);

//Lấy tin nhắn
messengerRouter.get(
  "/messenger/getMessenger",
  verifyToken,
  MessengerController.getMessenge
);
//Láy liên lạc với Admin hoặc Employee
messengerRouter.get(
  "/messenger/getUserMessenger",
  verifyToken,
  MessengerController.getUserMessenger
);
export default messengerRouter;
