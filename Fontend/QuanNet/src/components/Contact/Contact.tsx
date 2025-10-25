import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface Message {
  sender: "Bạn" | "Nhân viên";
  text: string;
}

export default function Contact() {
  

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "Nhân viên",
      text: "Em là A, nhân viên hiện đang trực ca của Thế Giới Gaming. Anh cần hỗ trợ gì không ạ?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "Bạn", text: input }]);
    setInput("");
  };

  return (
    <div className="bg-[#D3FFCC] min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex-grow flex justify-center items-center py-10 relative">
        <div className="bg-[#9CFFC2] w-[450px] rounded-2xl p-5 shadow-lg ">
          <h1 className="font-bold text-xl text-center">Chat với nhân viên</h1>

          {/* Khung chat */}
          <div className="bg-white w-full h-[400px] rounded-2xl mt-4 p-4 flex flex-col overflow-y-auto space-y-3 relative">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "Bạn" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.sender === "Bạn"
                      ? "bg-[#D3FFCC] text-black"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

          <div className="text-3xl absolute left-3 bottom-0">+</div>
            {/* Ô nhập và nút gửi */}
          <div className="flex items-center mt-4 bg-white rounded-xl px-3 py-2 shadow-sm absolute bottom-1 w-[90%] right-1">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow outline-none bg-transparent px-2 text-sm"
            />
            <button onClick={handleSend} className="p-1 hover:opacity-70 transition">
              <img src="../icon/send.png" alt="Gửi" className="w-5 h-5" />
            </button>
          </div>
          
          </div>

          
        </div>
        <div className="absolute right-1 bottom-0 flex items-center">
          <img src="../mail.png" alt="" className="w-[40px] text-amber-800" />
          <span>Phản ánh/Liên hệ trực tiếp chủ quán</span>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
