import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

interface LocationState {
  email: string;
}

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email;

  // Nếu email không có trong state, quay về trang đăng nhập
  useEffect(() => {
    if (!email) {
      toast.error("Email không tồn tại. Vui lòng đăng ký lại!");
      navigate("/register");
    }
  }, [email, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Vui lòng nhập mã xác thực!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/verifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Code: code,
        }),
      });

      const result = await response.json();
      console.log("✅ Verify result:", result);

      if (response.ok) {
        toast.success("Xác thực thành công!");
        navigate("/"); // quay về trang login
      } else {
        toast.error(result.message || "Mã xác thực không hợp lệ!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi xác thực:", error);
      toast.error("Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#012000] flex items-center justify-center">
      <div className="w-[400px] bg-lime-50 p-6 rounded-xl shadow-2xl">
        <h2 className="text-center text-2xl font-bold mb-4">Xác thực tài khoản</h2>
        <p className="text-center text-gray-700 mb-4">
          Nhập mã xác thực đã được gửi đến email của bạn.
        </p>

        <form className="flex flex-col space-y-3" onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Mã xác thực"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-green-300" : "bg-[#55FE00] hover:bg-lime-400"
            } py-2 rounded-2xl font-bold text-white transition`}
          >
            {loading ? "Đang xác thực..." : "Xác thực"}
          </button>
        </form>
      </div>
    </div>
  );
}
