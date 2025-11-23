import { useEffect, useState } from "react";
import LeftSide from "../LeftSide/LeftSide";

type StatKey = "usedMachines" | "canceledMachines" | "dailyRevenue";

interface Stats {
  usedMachines: number | null;
  canceledMachines: number | null;
  dailyRevenue: number | string | null;
}

export default function Statistical() {
  const [stats, setStats] = useState<Stats>({
    usedMachines: null,
    canceledMachines: null,
    dailyRevenue: null,
  });

  const [loading, setLoading] = useState(true);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("vi-VN", { 
    month: "2-digit",
    day: "2-digit",
  }); 

  useEffect(() => {
    async function fetchData() {
      try {
        // Lấy ngày ISO để gửi cho API (yyyy-mm-dd)
        const dateParam = today.toISOString().split("T")[0];

        const response = await fetch(`https://your-api.com/statistical?date=${dateParam}`);
        const data = await response.json();
        setStats({
          usedMachines: data.usedMachines,
          canceledMachines: data.canceledMachines,
          dailyRevenue: data.dailyRevenue.toLocaleString("vi-VN"),
        });
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, );

  const ThongKe: { label: string; key: StatKey }[] = [
    { label: "Số máy đã sử dụng", key: "usedMachines" },
    { label: "Số máy huỷ", key: "canceledMachines" },
    {
      label: `Doanh thu ngày ${formattedDate}`,
      key: "dailyRevenue",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftSide />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Thống kê hệ thống
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ThongKe.map((item) => (
            <div
              key={item.key}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <span className="block text-gray-600 text-lg font-medium mb-2">
                {item.label}
              </span>

              {loading ? (
                <span className="text-gray-400">Đang tải...</span>
              ) : (
                <span className="block text-3xl font-semibold text-blue-600">
                  {stats[item.key] ?? "0"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
