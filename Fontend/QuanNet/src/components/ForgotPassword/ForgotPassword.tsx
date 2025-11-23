import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Vui lòng nhập email!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/fogotPass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Mã xác nhận đã gửi email!");
        setTimeout(() => navigate("/ResetPassword", { state: { email } }), 1000);
      } else {
        toast.error(result.message || "Gửi mã thất bại!");
      }
    } catch {
      toast.error("Không thể kết nối server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#012000] flex items-center justify-center">
      <div className="flex w-[700px] h-[400px] overflow-hidden shadow-2xl">
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img src="../logo.png" alt="Logo" className="w-80 h-80 object-contain" />
        </div>
        <div className="w-1/2 bg-lime-50 flex flex-col justify-center px-10">
          <h2 className="mt-5 text-3xl font-extrabold text-center text-[#001a00] mb-6">Quên mật khẩu</h2>
          <form className="flex flex-col space-y-3" onSubmit={handleSendCode}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#55FE00] mt-2 py-2 rounded-2xl font-bold text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Đang gửi..." : "Nhận mã xác thực"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
