import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LeftSide() {
  const navigate = useNavigate();
  const [showManager, setShowManager] = useState(false);

  // State lưu ảnh hiện tại
  const [qrImage, setQrImage] = useState("../QR.png");

  // Tham chiếu tới input file (ẩn)
  const qrInputRef = useRef<HTMLInputElement>(null);

  // Đăng xuất
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // Chuyển trang
  const handleHome = () => navigate("/staff");
  const handleChat = () => navigate("/staff/Chat");
  const handleMachineMN = () => navigate("/staff/MachineMN");
  const handleStatiss = () => navigate("/staff/statistical");

  // Khi người dùng chọn ảnh (Logo hoặc QR)
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };


  return (
    <div className="w-[20%] h-screen bg-white border-r border-gray-200 relative">
      <div className="m-auto flex flex-col items-center pt-4">
        {/* Logo */}
        <div className="w-[50%] relative">
          <img
            onClick={handleHome}
            className="rounded-full cursor-pointer hover:scale-105 transition-transform duration-200"
            src="../logo.png"
            alt="Logo"
          />
          {/* Input file ẩn */}
        </div>

        {/* Nút điều hướng */}
        <div className="inline-block mt-10 text-center w-full px-2 space-y-3">
          <button
            onClick={handleMachineMN}
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Quản lý đặt máy
          </button>

          <button
            onClick={() => setShowManager(true)}
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Quản lý tài khoản
          </button>

          <button
            onClick={handleChat}
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Tin nhắn
          </button>
          
          <button
            onClick={handleStatiss}
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Thống kê
          </button>
        </div>

        {/* Đăng xuất */}
        <div
          onClick={handleLogout}
          className="absolute bottom-4 font-medium underline cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-150"
        >
          Đăng xuất
        </div>

        {showManager && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 w-[420px] relative">
              <button
                onClick={() => setShowManager(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>

              <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
                Quản lý tài khoản
              </h2>

              {/* Ô thứ nhất */}
              <div className="mb-4 flex items-center">
                <label className="font-semibold w-[120px]">Tên nhân viên</label>
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Nhập tên nhân viên..."
                />
              </div>

              {/* Mã QR */}
              <div className="flex items-center">
                <label className="font-semibold w-[120px]">Mã QR</label>
                <div className="flex-1 flex items-center justify-start">
                  <img
                    onClick={() => {
                      if (qrInputRef.current) {
                        qrInputRef.current.click();
                      }
                    }}
                    src={qrImage}
                    alt="Mã QR"
                    className="w-[200px] h-[300px] object-center border border-gray-300 rounded-md shadow-sm cursor-pointer hover:opacity-80"
                  />
                  {/* Input file ẩn */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={qrInputRef}
                    onChange={(e) => handleImageChange(e, setQrImage)}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowManager(false)}
                  className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
