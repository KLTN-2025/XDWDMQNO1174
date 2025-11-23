// import React, { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";

// type Message = {
//   MessID?: string;
//   SendID: string;
//   ReceiveID: string;
//   Content?: string;
//   URL_Img?: string;
//   createdAt?: string;
//   fromMe?: boolean;
// };

// const SOCKET_URL = "http://localhost:8080"; // Đổi thành URL backend của bạn

// // Giả định user hiện tại
// const CURRENT_USER_ID = "0d260b55-a78e-41fc-bd59-b0e5503a2314";
// const TARGET_USER_ID = "045bc9a0-6b18-4c9f-96e1-b13183193c55";

// export default function ChatApp() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const socketRef = useRef<Socket | null>(null);
//   const listRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // Kết nối socket
//     const socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       reconnection: true,
//     });
//     socketRef.current = socket;

//     const roomId = [CURRENT_USER_ID, TARGET_USER_ID].sort().join("_");
//     socket.emit("joinRoom", roomId);

//     // Lắng nghe tin nhắn mới từ server
//     socket.on("receiveMessage", (msg: Message) => {
//       console.log("📩 Tin nhắn nhận được từ socket:", msg); // ✅ Log tin nhắn thật sự từ server
//       const isMine = msg.SendID === CURRENT_USER_ID;
//       setMessages((prev) => [...prev, { ...msg, fromMe: isMine }]);
//     });

//     socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
//     socket.on("disconnect", () => console.log("❎ Socket disconnected"));

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     // auto scroll khi có tin mới
//     if (listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = () => {
//     const text = input.trim();
//     if (!text) return;

//     const newMsg: Message = {
//       SendID: CURRENT_USER_ID,
//       ReceiveID: TARGET_USER_ID,
//       Content: text,
//     };

//     // Gửi tới server
//     socketRef.current?.emit("sendMessage", newMsg);

//     // Hiển thị tạm thời (cho cảm giác gửi ngay)
//     //setMessages((s) => [...s, { ...newMsg, fromMe: true }]); này client tự thêm sẽ gây lỗi double
//     setInput("");
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div className="flex h-[100vh] w-full max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
//       {/* Sidebar */}
//       <aside className="w-1/3 border-r border-gray-200 p-4 bg-gray-50">
//         <div className="font-semibold text-lg mb-4">Conversations</div>
//         <div className="space-y-3">
//           <div className="flex items-center gap-3 p-2 rounded-lg bg-white">
//             <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center">
//               B
//             </div>
//             <div className="flex-1">
//               <div className="font-medium">Bạn B</div>
//               <div className="text-sm text-gray-500 truncate">
//                 Đang chat realtime
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main chat */}
//       <main className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center px-6 py-4 border-b border-gray-200">
//           <div className="w-12 h-12 rounded-full bg-indigo-300 mr-4 flex items-center justify-center">
//             B
//           </div>
//           <div className="flex-1">
//             <div className="font-semibold">Bạn B</div>
//             <div className="text-sm text-gray-500">Online</div>
//           </div>
//         </div>

//         {/* Message list */}
//         <div
//           ref={listRef}
//           className="flex-1 overflow-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50"
//         >
//           {messages.map((m, idx) => (
//             <div
//               key={m.MessID || idx}
//               className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[70%] break-words p-3 rounded-xl shadow-sm ${
//                   m.fromMe
//                     ? "bg-blue-600 text-white rounded-br-none"
//                     : "bg-white text-gray-800 rounded-bl-none border"
//                 }`}
//               >
//                 <div className="text-sm whitespace-pre-wrap">{m.Content}</div>
//                 <div className="text-[10px] text-gray-400 mt-1 text-right">
//                   {new Date(m.createdAt || new Date()).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Composer */}
//         <div className="px-4 py-3 border-t border-gray-200 bg-white">
//           <div className="flex items-center gap-3">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Nhập tin nhắn..."
//               className="flex-1 rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-300"
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full"
//             >
//               Gửi
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

//Gửi tin nhắn có hình ảnh rõ ràng
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  MessID?: string;
  SendID: string;
  ReceiveID: string;
  Content?: string;
  URL_Img?: string;
  createdAt?: string;
  fromMe?: boolean;
  pending?: boolean;
};

const SOCKET_URL = "http://localhost:8080";
const API_UPLOAD_URL = "http://localhost:8080/api/messenger/newMessengerAPI";
const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxOThiYjRiLWI4MDYtNGU3Yi1iM2Y2LTZkOGRhMTAzYTk0NSIsImVtYWlsIjoiaHVuZ2RvYW4yNTEyMDAzQGdtYWlsLmNvbSIsImlhdCI6MTc2Mjg3Njk4NiwiZXhwIjoxNzYyOTYzMzg2fQ.CkqJeLv7aG3xpCsENgTAOwhj6_GulwQcygxlsBWafmo"

const CURRENT_USER_ID = "2198bb4b-b806-4e7b-b3f6-6d8da103a945";
const TARGET_USER_ID = "9eb4d147-21b4-4249-becb-d44071f51f7c";

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Kết nối socket
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
    });
    socketRef.current = socket;

    const roomId = [CURRENT_USER_ID, TARGET_USER_ID].sort().join("_");
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg: Message) => {
      console.log("📩 Tin nhắn nhận được từ socket:", msg);
      const isMine = msg.SendID === CURRENT_USER_ID;
      setMessages((prev) => [...prev, { ...msg, fromMe: isMine }]);
    });

    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("❎ Socket disconnected"));

    // ✅ cleanup function — kiểu đúng cho useEffect
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  // Gửi tin nhắn text không có hình
  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: Message = {
      SendID: CURRENT_USER_ID,
      ReceiveID: TARGET_USER_ID,
      Content: text,
    };
    console.log("Gửi tin nhắn đi >>", newMsg);
    socketRef.current?.emit("sendMessage", newMsg);
    setInput("");
  };

  const [isSending, setIsSending] = useState(false);

  const sendImage = async () => {
    const text = input.trim();
    if ((!text && !file) || isSending) return; // 🔒 chặn khi đang gửi
    setIsSending(true); // ✅ khóa nút ngay khi bắt đầu gửi
    if (!text && !file) return;

    const tempId = Date.now().toString();
    //Này preview ảnh trước
    // const previewMsg: Message = {
    //   MessID: tempId,
    //   SendID: CURRENT_USER_ID,
    //   ReceiveID: TARGET_USER_ID,
    //   Content: text,
    //   URL_Img: previewImage || "",
    //   fromMe: true,
    //   pending: true,
    // };
    //setMessages((prev) => [...prev, previewMsg]);

    try {
      const formData = new FormData();
      formData.append("ReceiveId", TARGET_USER_ID);
      formData.append("Content", text);
      if (file) formData.append("image", file);

      const res = await fetch(API_UPLOAD_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: formData,
      });
      setFile(null);
      setPreviewImage(null);
      setInput("");
      const data = await res.json();
      const realMsg = data.data; // server trả về newMessage trong "data"
      console.log("✅ Phản hồi từ server:", realMsg);

      if (realMsg) {
        // ✅ Cập nhật tin nhắn thật thay thế tin pending
        setMessages((prev) =>
          prev.map((m) =>
            m.MessID === tempId
              ? { ...realMsg, fromMe: true, pending: false }
              : m
          )
        );

        // ✅ Gửi qua socket để realtime cho người kia
        socketRef.current?.emit("sendMessage", {
          MessID: realMsg.MessID,
          SendID: realMsg.SendID,
        });
      }
    } catch (err) {
      console.error("❌ Lỗi upload ảnh:", err);
      // Nếu lỗi thì xóa tin pending
      setMessages((prev) => prev.filter((m) => m.MessID !== tempId));
    } finally {
      // ✅ Xóa input & ảnh chọn
      setIsSending(false);
      setFile(null);
      setPreviewImage(null);
      setInput("");
    }
  };

  // Khi chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreviewImage(URL.createObjectURL(f));
    }
  };

  // Gửi khi nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !file) sendMessage();
  };

  return (
    <div className="flex h-[100vh] w-full max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/3 border-r border-gray-200 p-4 bg-gray-50">
        <div className="font-semibold text-lg mb-4">Conversations</div>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white">
          <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center">
            B
          </div>
          <div>
            <div className="font-medium">Bạn B</div>
            <div className="text-sm text-gray-500 truncate">
              Đang chat realtime
            </div>
          </div>
        </div>
      </aside>

      {/* Chat main */}
      <main className="flex-1 flex flex-col">
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-indigo-300 mr-4 flex items-center justify-center">
            B
          </div>
          <div>
            <div className="font-semibold">Bạn B</div>
            <div className="text-sm text-gray-500">Online</div>
          </div>
        </div>

        {/* Danh sách tin */}
        <div
          ref={listRef}
          className="flex-1 overflow-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50"
        >
          {messages.map((m, idx) => (
            <div
              key={m.MessID || idx}
              className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] break-words p-3 rounded-xl shadow-sm ${
                  m.fromMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                {m.Content && (
                  <div className="text-sm whitespace-pre-wrap">{m.Content}</div>
                )}
                {m.URL_Img && (
                  <img
                    src={m.URL_Img}
                    alt="sent"
                    className="rounded-lg mt-2 max-w-[250px] border border-gray-200 bg-black"
                  />
                )}
                {m.pending && (
                  <div className="text-xs text-yellow-300 mt-1">
                    Đang gửi...
                  </div>
                )}
                <div className="text-[10px] text-gray-400 mt-1 text-right">
                  {new Date(m.createdAt || new Date()).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ô nhập */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          {previewImage && (
            <div className="mb-2 flex items-center gap-3">
              <img
                src={previewImage}
                className="w-20 h-20 rounded-lg object-cover border"
              />
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setFile(null);
                }}
                className="text-red-500 text-sm"
              >
                ✕ Hủy
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <label className="cursor-pointer px-3 py-2 border rounded-full text-gray-500 hover:bg-gray-50">
              📷
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              className="flex-1 rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-300"
            />

            {!file ? (
              <button
                onClick={sendMessage}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full"
              >
                Gửi
              </button>
            ) : (
              <button
                onClick={sendImage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
              >
                {isSending ? "Đang gửi..." : "Gửi ảnh"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
