import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import EditName from "../EditMN/EditName";
import EditPhone from "../EditMN/EditPhone";
import EditPass from "../EditMN/EditPass";
import { toast } from "react-toastify";

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export default function AccountMN() {
  const [user, setUser] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:8080/api/user/information",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.data) {
          setUser({
            name: data.data.Name || "",
            phone: data.data.PhoneNumber || "",
            email: data.data.Email || "",
            password: "******",
          });
        } else {
          toast.error("Không thể tải thông tin người dùng!");
        }
      } catch (error) {
        console.error("❌ Lỗi khi tải thông tin người dùng:", error);
        toast.error("Lỗi khi tải dữ liệu!");
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateName = (newName: string) => {
    setUser({ ...user, name: newName });
  };

  const handleUpdatePhone = (newPhone: string) => {
    setUser({ ...user, phone: newPhone });
  };

  const handleCloseForm = () => {
    setShowNameForm(false);
    setShowPhoneForm(false);
    setShowPassForm(false);
  };

  return (
    <div className="bg-[#D3FFCC] min-h-screen flex flex-col relative">
      <Header />

      {/* Thông tin tài khoản */}
      <div className="w-[720px] bg-white mx-auto shadow-md p-10 my-10 rounded-xl relative">
        <h1 className="text-center font-bold text-2xl mb-10">Quản lý tài khoản</h1>

        <div className="space-y-6 ml-30">
          <div className="flex items-center">
            <label className="w-40 font-medium">Tên</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              value={user.name}
              readOnly
              style={{ width: "250px" }}
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium">Số điện thoại</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              value={user.phone}
              readOnly
              style={{ width: "250px" }}
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium">Email</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="email"
              value={user.email}
              readOnly
              style={{ width: "250px" }}
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium">Mật khẩu</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="password"
              value={user.password}
              readOnly
              style={{ width: "250px" }}
            />
          </div>
        </div>

        {/* Nút chỉnh sửa */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setShowEditMenu(true)}
            className="bg-red-400 hover:bg-red-500 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Popup chọn mục chỉnh sửa */}
      {showEditMenu && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[60]">
          <div className="relative bg-white p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4 w-[300px]">
            <button
              onClick={() => setShowEditMenu(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-2">Chọn mục cần chỉnh sửa</h2>

            <button
              onClick={() => {
                setShowEditMenu(false);
                setShowNameForm(true);
              }}
              className="w-full font-bold bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition"
            >
              Tên
            </button>

            <button
              onClick={() => {
                setShowEditMenu(false);
                setShowPassForm(true);
              }}
              className="w-full font-bold bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
            >
              Mật khẩu
            </button>

            <button
              onClick={() => {
                setShowEditMenu(false);
                setShowPhoneForm(true);
              }}
              className="w-full font-bold bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition"
            >
              Số điện thoại
            </button>
          </div>
        </div>
      )}

      {/* Form đổi tên */}
      {showNameForm && (
        <div className="fixed inset-0">
          <EditName onClose={handleCloseForm} onSuccess={handleUpdateName} />
        </div>
      )}

      {/* Form đổi số điện thoại */}
      {showPhoneForm && (
        <div className="fixed inset-0">
          <EditPhone onClose={handleCloseForm} onSuccess={handleUpdatePhone} />
        </div>
      )}

      {/* Form đổi mật khẩu */}
      {showPassForm && (
        <div className="fixed inset-0">
          <EditPass
            onClose={handleCloseForm}
            onSuccess={() => toast.success("Đổi mật khẩu thành công!")}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
