import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LeftSideAD() {
  const navigate = useNavigate();
  
  const handleHome = () => navigate("/admin");
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
        </div>

        {/* Nút điều hướng */}
        <div className="inline-block mt-10 text-center w-full px-2 space-y-3">
          <button
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Quản lý tài khoản người dùng
          </button>

          <button
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Đăng bài
          </button>

          <button
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Quản lý bài đăng
          </button>

          <button
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Thống kê doanh thu
          </button>
          <button
            className="w-full cursor-pointer bg-gray-100 py-3 rounded-lg border border-gray-300 hover:bg-green-400 hover:text-white font-semibold transition-all duration-200"
          >
            Xem lịch sử chat
          </button>
        </div>

        {/* Đăng xuất */}
        <div
          onClick={handleLogout}
          className="absolute bottom-4 font-medium underline cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-150"
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
}
