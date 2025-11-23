import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
interface EditPassProps {
  onClose: () => void;
  onSuccess?: () => void; 
}
export default function EditPass({ onClose }: EditPassProps) {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    if (!newPass || !confirmPass) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/changePassword", {
        method: "POST", // hoặc "POST" nếu backend yêu cầu
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          NewPassword: newPass,
          ComfirmPassword: confirmPass,
        }),
      });

      const result = await response.json();
      console.log("🔐 Change Password Result:", result);

      if (response.ok) {
        toast.success("Đổi mật khẩu thành công!");
        setTimeout(() => onClose(), 2000);
      } else {
        toast.error(result.message || "Đổi mật khẩu thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi đổi mật khẩu:", error);
      toast.error("Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute flex justify-center w-full h-[450px] items-center top-0 left-0">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 font-bold text-xl"
        >
          X
        </button>

        <h2 className="text-lg font-semibold mb-4">Đổi mật khẩu</h2>

        <input
          type="password"
          placeholder="Nhập mật khẩu mới..."
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="password"
          placeholder="Nhập lại mật khẩu mới..."
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          } text-white font-semibold px-6 py-2 rounded-lg transition`}
        >
          {loading ? "Đang lưu..." : "OK"}
        </button>
      </div>

      {/* Toast hiển thị giữa màn hình */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
