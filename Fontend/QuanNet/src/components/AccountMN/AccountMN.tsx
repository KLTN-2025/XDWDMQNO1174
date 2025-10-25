import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function AccountMN() {
    return (
        <div className="bg-[#D3FFCC] min-h-screen flex flex-col">
            <Header />

            {/* body */}
            <div className="w-[720px] bg-white mx-auto shadow-md p-10">
                <h1 className="text-center font-bold text-2xl mb-10">Quản lý tài khoản</h1>

                <div className="space-y-6 ml-30">
                    <div className="flex items-center">
                        <label className="w-40 font-medium">Tên</label>
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            type="text"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-40 font-medium">Số điện thoại</label>
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            type="text"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-40 font-medium">Email</label>
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            type="email"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-40 font-medium">Mật khẩu</label>
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            type="password"
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <button
                        type="button"
                        className="bg-red-300 hover:bg-red-400 text-white font-medium px-6 py-2 rounded-lg transition"
                    >
                        Chỉnh sửa
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
