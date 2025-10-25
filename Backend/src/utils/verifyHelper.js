import { VerifyModel } from "../models/verifyCode.js";
import { UserModel } from "../models/userModel.js";
import { sendMail } from "./sendMail.js";

/**
 * Tạo và gửi mã xác thực đến email user
 */
export const sendVerifyCodeToUser = async (user, subject = "Mã xác thực") => {
  // Sinh mã ngẫu nhiên (6 chữ số)
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Thời gian hết hạn (5 phút)
  const expirationDate = new Date(Date.now() + 5 * 60 * 1000);

  // Lưu vào bảng VerifyCode
  await VerifyModel.createVerifyCode({
    UserID: user.UserId,
    Code: code,
    ExpirationDate: expirationDate,
  });

  // Gửi email
  await sendMail(
    user.Email,
    subject,
    `Xin chào ${user.Name},\n\nMã xác thực của bạn là: ${code}\nMã có hiệu lực trong 5 phút.`
  );

  return code;
};

/**
 * Xác minh mã (check hợp lệ, hạn, trạng thái)
 */
export const verifyUserCode = async (email, code) => {
  // 1️⃣ Tìm user
  const user = await UserModel.findByEmail(email);
  if (!user) throw new Error("Email không tồn tại");

  // 2️⃣ Tìm verify code
  const verifyRecord = await VerifyModel.findOneByUserAndCode(
    user.UserId,
    code
  );
  if (!verifyRecord) throw new Error("Mã không hợp lệ");

  // 3️⃣ Kiểm tra tình trạng & hạn
  if (verifyRecord.IsUse) throw new Error("Mã đã được sử dụng");
  if (new Date() > verifyRecord.ExpirationDate)
    throw new Error("Mã đã hết hạn");

  // 4️⃣ Đánh dấu đã dùng
  await verifyRecord.update({ IsUse: true });

  return user;
};
