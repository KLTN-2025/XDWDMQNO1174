import LeftSide from "../LeftSide/LeftSide";

export default function HomeStaff() {
  return (
    <div className="flex bg-[#D3FFCC] min-h-screen">
      {/* Sidebar */}
      <LeftSide />

      {/* Main content */}
      <div className="w-[80%] bg-gradient-to-b from-white to-[#f9fff7]">
        <div className="max-w-3xl mx-auto text-gray-800 ml-12 mt-1">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-center text-[#1a3d2e] mb-8">
            Xin chào 👋
          </h1>

          {/* Intro */}
          <p className="text-lg leading-relaxed mb-6 text-gray-700 text-center">
            Chào mừng bạn đã đăng nhập vào hệ thống quản lý của quán.  
            Hãy sử dụng các chức năng bên trái để:
          </p>

          {/* Feature list */}
          <ul className="list-disc list-inside space-y-6 text-base">
            <li>
              <span className="font-semibold text-[#1a3d2e]">
                Quản lý đặt máy cho khách
              </span>
              <div className="ml-5 text-gray-600">
                ⇒ Kiểm tra trạng thái máy đặt
              </div>
            </li>

            <li>
              <span className="font-semibold text-[#1a3d2e]">
                Quản lý tài khoản khách hàng
              </span>
              <div className="ml-5 text-gray-600">
                ⇒ Thay đổi “Tên nhân viên” mỗi khi vào ca
              </div>
            </li>

            <li>
              <span className="font-semibold text-[#1a3d2e]">
                Kiểm tra và phản hồi tin nhắn
              </span>
              <div className="ml-5 text-gray-600">
                ⇒ Lưu ý luôn kiểm tra tin nhắn của khách hàng nhanh nhất để mang
                lại trải nghiệm tuyệt vời nhất cho khách bạn nhé!!!!
              </div>
            </li>
          </ul>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Motivation message */}
          <p className="text-lg font-semibold text-orange-600 leading-relaxed text-center">
            🔥 Chúc bạn một ngày làm việc thật bùng nổ – đầy năng lượng, hỗ trợ
            khách hàng tuyệt vời – nhanh – chuẩn – chất! 🚀✨
          </p>

          {/* Support contact */}
          <p className="mt-6 text-center text-sm text-gray-600 italic">
            📞 Nếu có lỗi gì trong quá trình sử dụng hệ thống, vui lòng liên hệ{" "}
            <span className="font-semibold text-gray-800">
              0793 555 927 (Duy Hưng)
            </span>{" "}
            để được hỗ trợ ngay.
          </p>
        </div>
      </div>
    </div>
  );
}
