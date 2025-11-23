import { useState, useRef, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface Message {
  sender: "Bạn" | "Nhân viên";
  text?: string;
  image?: string;
}

export default function Contact() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "Nhân viên",
      text: "Em là A, nhân viên hiện đang trực ca của Thế Giới Gaming. Anh cần hỗ trợ gì không ạ?",
    },
  ]);
  const [input, setInput] = useState("");

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 100); 

    return () => clearTimeout(timer);
  }, [messages]);

  const handleSend = (): void => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "Bạn", text: input }]);
    setInput("");
  };

  const handleAddImageClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setMessages((prev) => [...prev, { sender: "Bạn", image: imageURL }]);
    }
  };

  return (
    <div className="bg-[#D3FFCC] min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex-grow flex justify-center items-center py-10 relative">
        <div className="bg-[#9CFFC2] w-[450px] rounded-2xl p-5 shadow-lg flex flex-col">
          <h1 className="font-bold text-xl text-center">Chat với nhân viên</h1>

          {/* Khung chat */}
          <div className="bg-white w-full h-[400px] rounded-2xl mt-4 p-4 flex flex-col justify-between">
            {/* Tin nhắn (cuộn được) */}
            <div
              ref={chatBoxRef}
              className="flex-1 overflow-y-auto space-y-3 pr-1"
            >
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
                    {msg.text && <p>{msg.text}</p>}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="uploaded"
                        className="rounded-lg mt-2 max-w-[200px]"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Ô nhập tin nhắn */}
            <div className="flex items-center mt-3 bg-white rounded-xl px-3 py-2 shadow-sm">
              <button
                onClick={handleAddImageClick}
                className="text-xl cursor-pointer mr-2"
              >
                +
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />

              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-grow outline-none bg-transparent px-2 text-sm"
              />
              <button
                onClick={handleSend}
                className="p-1 hover:opacity-70 transition"
              >
                <img src="../icon/send.png" alt="Gửi" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Góc phải - liên hệ chủ quán */}
        <div className="absolute right-3 bottom-0 flex items-center">
          <img src="../mail.png" alt="" className="w-[40px]" />
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwsLDlFKFHWHfRHvfSfFLNHzhCqZPGfgNfmnWGcVLrBTtwxlbfHVHdJHjrQMjcpXmTFrpphttps://mail.google.com/mail/u/0/#inbox?compose=https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwsLDlFKFHWHfRHvfSfFLNHzhCqZPGfgNfmnWGcVLrBTtwxlbfHVHdJHjrQMjcpXmTFrpp" className="ml-1 text-[18px] font-semibold">
            Phản ánh/Liên hệ trực tiếp chủ quán
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
