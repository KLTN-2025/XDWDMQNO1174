import React, { useRef, useState, useEffect } from "react";
import LeftSide from "../LeftSide/LeftSide";

export default function Chat() {
  const [messages, setMessages] = useState<Array<{ sender: string; text?: string; image?: string }>>([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "Bạn", text: input }]);
    setInput("");
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      setMessages((prev) => [
        ...prev,
        { sender: "Bạn", image: event.target?.result as string },
      ]);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex bg-[#D3FFCC] min-h-screen">
      {/* Sidebar bên trái */}
      <LeftSide />

      {/* Khu vực chat full width */}
      <div className="w-[80%] flex flex-col bg-white p-6">
        <div className="bg-white w-full flex-1 rounded-2xl p-4 flex flex-col justify-between shadow-md border border-gray-300 fixed-height">
          {/* Khung tin nhắn */}
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
          <div className="flex items-center mt-3 bg-white rounded-xl px-3 py-2 shadow-sm border">
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
    </div>
  );
}
