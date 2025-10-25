import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";


export default function Homepage() {
  const images = ["/quan1.png", "/quan2.png", "/quan3.png"];
  const [current, setCurrent] = useState(0);

  // 🕓 Tự động chuyển ảnh mỗi 5 giây
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

  return (
    <div className="bg-[#D3FFCC] h-screen">
      {/* Gioi thieu */}
      <Header />

      {/* body */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Nút điều hướng nhỏ dưới */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-green-500" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 flex">
        <div className="w-[1000px] h-auto">
          <img className="object-fill rounded-2xl" src="../quan5.png" alt="" />
        </div>
        <div className="ml-20 border-l-[1px] pl-7">
          <p className="font-bold text-3xl py-3">Thế giới gaming</p>
          <p className="font-medium text-2xl py-2">Giới thiệu về chúng tôi</p>
          <p className="py-1 leading-normal">
            Thế Giới Gaming là phòng máy hàng đầu tại Đà Nẵng, nổi bật với thiết kế hiện đại và không gian đẳng cấp, mang đến trải nghiệm hoàn hảo cho cả game thủ chuyên nghiệp lẫn những người yêu thích eSports.
            Phòng máy được trang bị 48 PC cấu hình cao, chia thành 3 khu vực chuyên biệt:
          </p>
          <ul>
            <li>🎮 MOBA Zone – 20 máy tối ưu cho các tựa game chiến thuật.</li>
            <li>🔫 FPS Zone – 18 máy với màn hình tốc độ cao, chuẩn dành cho game bắn súng.</li>
            <li>🕹️ Fighting Zone – 10 máy dành riêng cho các tựa game đối kháng.</li>
          </ul>
          <p className="py-1 leading-normal">
            Với hệ thống thiết bị ngoại vi cao cấp, màn hình chất lượng cùng đường truyền ổn định, Thế Giới Gaming cam kết mang lại môi trường chơi game mượt mà – chuẩn eSports – đẳng cấp thi đấu
          </p>
          <button className="bg-[#00FF66] text-white font-medium p-3 mt-2 rounded cursor-pointer">
            Tìm hiểu thêm
          </button>
        </div>
      </div>

      {/* bottom */}
      <Footer />
    </div>
  );
}
