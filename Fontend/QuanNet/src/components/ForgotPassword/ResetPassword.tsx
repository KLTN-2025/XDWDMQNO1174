import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

interface LocationState {
  email: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email;

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Dùng useEffect để đảm bảo toast hiển thị đúng thời điểm
  useEffect(() => {
    if (!email) {
      toast.error("Email không tồn tại. Vui lòng thử lại.");
      navigate("/forgotPassword"); // ⚠️ đúng path: /forgotPassword (viết thường)
    }
  }, [email, navigate]);

  if (!email) return null; // dừng render UI sau khi toast và navigate

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || !confirmPass || !code) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/changePass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Code: code,
          NewPass: newPass,
          ComfirmPass: confirmPass,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Đổi mật khẩu thành công!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(result.message || "Đổi mật khẩu thất bại!");
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
          <h2 className="mt-5 text-3xl font-extrabold text-center text-[#001a00] mb-6">
            Đổi mật khẩu
          </h2>
          <form className="flex flex-col space-y-3" onSubmit={handleReset}>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <input
              type="text"
              placeholder="Nhập mã xác nhận"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#55FE00] mt-2 py-2 rounded-2xl font-bold text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Đang xác nhận..." : "Xác nhận"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
