import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (folder = "uploads") => {
  return async (req, res, next) => {
    try {
      if (!req.file) return next(); // Không có file thì bỏ qua

      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      req.imageUrl = result.secure_url; // Gắn URL ảnh vào req để controller dùng
      // console.log("✅ Upload thành công:", result.secure_url);

      next();
    } catch (err) {
      console.error("❌ Lỗi upload Cloudinary:", err);
      return res.status(500).json({ message: "Lỗi upload ảnh", error: err });
    }
  };
};
