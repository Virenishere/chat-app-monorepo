// page.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function ChatBox() {
  const { sendMessage, lastMessage } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessage) {
      setMessages((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;
    sendMessage(message);
    setMessages((prev) => [...prev, `You: ${message}`]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>💬 Chat App</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSend} style={{ padding: "8px 16px" }}>
          Send
        </button>
      </div>
    </div>
  );
}
