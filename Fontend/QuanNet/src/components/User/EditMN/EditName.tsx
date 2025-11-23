import { useState } from "react";
import { toast } from "react-toastify";

interface EditNameProps {
  onClose: () => void;
  onSuccess: (newName: string) => void;
}

export default function EditName({ onClose, onSuccess }: EditNameProps) {
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeName = async () => {
    const token = localStorage.getItem("token");
    if (!token || !newName.trim()) {
      toast.error("Vui lòng nhập tên hợp lệ!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/user/changeInformation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ Name: newName }),
        }
      );

      const result = await response.json();
      console.log("✅ Update result:", result);

      if (response.ok) {
        toast.success("Cập nhật tên thành công!");
        onSuccess(newName);
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
    <div className="absolute flex justify-center w-full h-[450px] items-center top-0 left-0">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[320px] relative flex flex-col items-center animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Đổi tên người dùng</h2>

        <input
          type="text"
          placeholder="Nhập tên mới..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleChangeName}
          disabled={loading}
          className={`${
            loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
          } text-white font-semibold px-6 py-2 rounded-lg transition w-full`}
        >
          {loading ? "Đang xử lý..." : "OK"}
        </button>
      </div>
    </div>
  );
}
