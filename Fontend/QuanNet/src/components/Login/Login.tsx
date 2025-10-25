import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginResponse {
  token: string;
  user?: {
    id?: number;
    email: string;
  };
  message?: string;
}

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    NProgress.start(); // Bắt đầu thanh progress

    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:8080/api/login",
        { Email, Password }
      );

      toast.success(res.data.message || "Đăng nhập thành công!");
      console.log("Token:", res.data.token);
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate("/trangchu");
      }, 1200);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
      NProgress.done();
       // Kết thúc progress bar
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleBackQMK = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/forgotPassword");
  };

  return (
    <div className="h-screen w-screen bg-[#012000] flex items-center justify-center relative">
      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="flex w-[700px] h-[400px] overflow-hidden shadow-2xl">
        {/* Logo */}
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img
            src="../logo.png"
            alt="Gaming Logo"
            className="w-80 h-80 object-contain"
          />
        </div>

        {/* Form */}
        <div className="w-1/2 bg-lime-50 flex flex-col justify-center px-10">
          <h2 className="mt-7 text-3xl font-extrabold text-center text-[#001a00] mb-6">
            Đăng nhập
          </h2>

          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email/số điện thoại"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-[#06BF00] transition cursor-pointer"
                onClick={handleBackQMK}
              >
                Quên mật khẩu
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#55FE00] mt-2 py-2 rounded-2xl font-bold text-white transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <p className="text-[14px] mt-1">
              Chưa có tài khoản sao, phải{" "}
              <a
                className="text-[#06BF00] cursor-pointer"
                onClick={handleBack}
              >
                Đăng kí
              </a>{" "}
              ngay
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
