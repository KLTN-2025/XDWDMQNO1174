import React, { useState } from "react";
import LeftSide from "../LeftSide/LeftSide";

interface MachineData {
  id: number;
  time: string;
  name: string;
  phone: string;
  machine: string;
  money: string;
}

const MachineMN: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const data: MachineData[] = [
    {
      id: 1,
      time: "17:30 5/10/2025",
      name: "Đoàn Văn Duy Hưng",
      phone: "0793555927",
      machine: "Fps-11",
      money: "20.000",
    },
    
  ];

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  return (
    <div className="flex bg-[#D3FFCC] min-h-screen">
      {/* LEFT SIDE */}
      <LeftSide />

      {/* MAIN CONTENT */}
      <div className="w-[80%] bg-white">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 m-10">
          Quản lý đặt máy
        </h1>

        {/* Search bar */}
        <div className="flex items-center gap-3 m-10">
          <input
            type="text"
            placeholder="Nhập tên, sđt để tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() => setSearch("")}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            <img
              src="../icon/load.png"
              alt="refresh"
              className="w-5 h-5 object-contain"
            />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm m-10">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-900 text-center">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Tên</th>
                <th className="py-3 px-4">SĐT</th>
                <th className="py-3 px-4">Máy</th>
                <th className="py-3 px-4">Tiền</th>
                <th className="py-3 px-4">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-center border-t hover:bg-green-50 transition"
                  >
                    <td className="py-4 px-4">{index + 1}</td>
                    <td className="py-4 px-4">{item.time}</td>
                    <td className="py-4 px-4 font-medium">{item.name}</td>
                    <td className="py-4 px-4">{item.phone}</td>
                    <td className="py-4 px-4">{item.machine}</td>
                    <td className="py-4 px-4">{item.money}</td>
                    <td className="py-4 px-4 flex justify-center gap-2">
                      <button className="px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition">
                        Chấp nhận
                      </button>
                      <button className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    Không tìm thấy dữ liệu phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MachineMN;
