import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleTrangChu = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/trangchu"); 
  };

  const handleTinT = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/Newspaper"); 
  };

  // 🔍 Xử lý chuyển đến trang "Về chúng tôi"
  const handleAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/AboutUs"); 
  };

  const handleQLTK = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/AccountMN"); 
  };

  const handleCont = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/Contact"); 
  };

   const handleGameZ = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/GameZone"); 
  };
      // 🚪 Xử lý đăng xuất
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
      // Xóa token và quay lại trang đăng nhập
      localStorage.removeItem("token");
      navigate("/");
    }
  };
    return (
        <div>
            <div className="flex px-10 justify-between">
                <span className="font-medium">
                Chào mừng bạn đến với Thế Giới Gaming – nơi mọi trận chiến đều trong tầm tay!
                </span>
                <div>
                <ul className="flex font-medium">
                    <li>
                    <a className="cursor-pointer hover:text-green-400" onClick={handleQLTK}>Quản lý tài khoản</a>
                    </li>
                    <li className="pl-7">
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer hover:text-green-400"
                    >
                        Đăng xuất
                    </button>
                    </li>
                </ul>
                </div>
            </div>

            <div className="h-[67px] bg-black flex px-10 items-center">
                <a
                className="w-[74px] h-[67px] overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={handleTrangChu}
                >
                <img
                    
                    src="../logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                />
                </a>
                <ul className="flex text-white ml-[100px] space-x-20 font-bold ">
                <li>
                    <a className="hover:text-green-400" onClick={handleTrangChu} href="#">Trang chủ</a>
                </li>
                <li>
                    <a className="hover:text-green-400" onClick={handleTinT} href="#">Tin tức</a>
                </li>
                <li>
                    <a className="hover:text-green-400" onClick={handleGameZ} href="#">Game zone</a>
                </li>
                <li>
                    <a className="hover:text-green-400" onClick={handleCont} href="#">Liên hệ</a>
                </li>
                <li>
                    <a className="hover:text-green-400" onClick={handleAbout} href="#">Về chúng tôi</a>
                </li>
                </ul>
                <button onClick={handleGameZ} className="bg-[#ffff] ml-20 py-2 px-3 rounded-4xl font-bold cursor-pointer hover:bg-green-400 transition">
                Đặt máy
                </button>
            </div>
        </div>
    );
}