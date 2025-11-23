import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/"); // quay lại trang đăng nhập
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Validate số điện thoại: chỉ 10 chữ số
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Số điện thoại phải gồm đúng 10 chữ số!");
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          PhoneNumber: phone,
          Email: email,
          Password: password,
          Role: "User",
        }),
      });

      const result = await response.json();
      console.log("✅ Register result:", result);

      if (response.ok) {
        toast.success(
          "Đăng ký thành công! Vui lòng kiểm tra email để xác thực."
        );
        // Chuyển sang VerifyCode page, gửi email đã đăng ký
        setTimeout(() => {
          navigate("/VerifyCode", { state: { email } });
        }, 1000);
      } else {
        toast.error(result.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi đăng ký:", error);
      toast.error("Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  // Giới hạn input phone chỉ được nhập số
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#012000] flex items-center justify-center">
      <div className="flex w-[700px] h-[500px] overflow-hidden shadow-2xl">
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
            Đăng Ký
          </h2>

          <form className="flex flex-col space-y-3" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Tên người dùng"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={handlePhoneChange}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-green-300" : "bg-[#55FE00] hover:bg-lime-400"
              } py-2 rounded-2xl font-bold text-[#fff] transition`}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
