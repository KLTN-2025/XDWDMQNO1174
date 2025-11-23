import { useState } from "react";
import { toast } from "react-toastify";

interface EditPhoneProps {
  onClose: () => void;
  onSuccess: (newPhone: string) => void;
}

export default function EditPhone({ onClose, onSuccess }: EditPhoneProps) {
  const [newPhone, setNewPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePhone = async () => {
    const token = localStorage.getItem("token");

    if (!token || !newPhone.trim()) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ!");
      return;
    }

    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(newPhone)) {
      toast.warning("Số điện thoại không hợp lệ!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/changeInformation", {
        method: "POST", // Đổi sang "PUT" nếu backend yêu cầu
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ PhoneNumber: newPhone }),
      });

      const result = await response.json();
      console.log("✅ Update result:", result);

      if (response.ok) {
        toast.success("Cập nhật số điện thoại thành công!");
        onSuccess(newPhone);
        onClose();
      } else {
        toast.error(result.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật:", error);
      toast.error("Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute flex justify-center w-full h-[450px] items-center top-0 left-0 ">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[320px] relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 font-bold text-xl"
        >
          X
        </button>

        <h2 className="text-lg font-semibold mb-4">Đổi số điện thoại</h2>

        <input
          type="text"
          placeholder="Nhập số điện thoại mới..."
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleChangePhone}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          } text-white font-semibold px-6 py-2 rounded-lg transition`}
        >
          {loading ? "Đang lưu..." : "OK"}
        </button>
      </div>
    </div>
  );
}
