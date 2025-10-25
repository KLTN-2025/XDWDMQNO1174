import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/"); // quay lại trang đăng nhập
  }
  return (
    <div className="h-screen w-screen bg-[#012000] flex items-center justify-center">
      <div className="flex w-[700px] h-[400px] overflow-hidden shadow-2xl">
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img
            src="../logo.png"
            alt="Gaming Logo"
            className="w-80 h-80 object-contain"
          />
        </div>

        <div className="w-1/2 bg-lime-50 flex flex-col justify-center px-10">
          <h2 className="mt-5 text-3xl font-extrabold text-center text-[#001a00] mb-6">
            Quên mật khẩu
          </h2>

          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <div className="text-right">
              <a
                className="text-sm text-[#06BF00] transition cursor-pointer"
                onClick={handleBack}
              >
                Quay lại đăng nhập
              </a>
            </div>
            <button className="bg-[#55FE00] mt-2 py-2 rounded-2xl text font-bold text-[#fff]">Nhận mã xác thực</button>
          </form>
        </div>
      </div>
    </div>
  );
}
