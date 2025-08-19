import React, { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat/message`,
        { message: input }
      );
      const botMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    }
  };

  /* -------------  UI ONLY  ------------- */
  return (
    <div className="chat-page">
      {/* animated gradient background */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .chat-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
          padding: 1rem;
          position: relative;
          background: linear-gradient(-45deg,#1a2a6c,#b21f1f,#fdbb2d,#4E9AF1,#5563DE);
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
        }
        .chat-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.35);
        }
        /* glass-morphic card */
        .chat-card {
          width: 100%;
          max-width: 650px;
          height: 80vh;
          background: rgba(255,255,255,.15);
          backdrop-filter: blur(20px) saturate(120%);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,.35);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 2;
        }
        .chat-header {
          padding: 16px;
          background: rgba(255,255,255,.1);
          color: #fff;
          font-weight: 600;
          font-size: 1.15rem;
          text-align: center;
          letter-spacing: .5px;
        }
        .messages {
          flex: 1;
          padding: 14px;
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        .msg {
          display: flex;
          margin-bottom: 12px;
          animation: fadeIn .35s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg.user { justify-content: flex-end; }
        .msg.assistant { justify-content: flex-start; }
        .bubble {
          padding: 12px 18px;
          max-width: 75%;
          word-break: break-word;
          font-size: .95rem;
          line-height: 1.4;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,.08);
        }
        .user .bubble {
          background: linear-gradient(135deg,#5563DE,#4E9AF1);
          color: #fff;
          border-bottom-right-radius: 6px;
        }
        .assistant .bubble {
          background: rgba(255,255,255,.85);
          color: #111;
          border-bottom-left-radius: 6px;
        }
        .chat-footer {
          display: flex;
          gap: 8px;
          padding: 14px;
          background: rgba(255,255,255,.1);
          border-top: 1px solid rgba(255,255,255,.18);
        }
        .chat-input {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          background: rgba(255,255,255,.65);
          transition: background .25s;
        }
        .chat-input:focus {
          background: rgba(255,255,255,.9);
        }
        .send-btn {
          background: linear-gradient(135deg,#5563DE,#4E9AF1);
          color: #fff;
          border: none;
          padding: 12px 22px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: transform .2s, box-shadow .25s;
          box-shadow: 0 4px 12px rgba(85,99,222,.35);
        }
        .send-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(85,99,222,.5);
        }
        .send-btn:active {
          transform: translateY(0);
        }
        .tagline {
          position: absolute;
          top: 2.5rem;
          text-align: center;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,.6);
          z-index: 1;
        }
        .tagline p {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1rem;
          opacity: .9;
        }
      `}</style>

      <div className="tagline">
        <p>Ask questions, get instant help, and learn more about our mission.</p>
      </div>

      <div className="chat-card">
        <div className="chat-header">💬 Go4Give Chat Assistant</div>

        <div className="messages">
          {messages.map((msg, i) => (
            <div className={`msg ${msg.role}`} key={i}>
              <div className="bubble">{msg.content}</div>
            </div>
          ))}
          {/* auto-scroll anchor */}
          <div style={{ float: "left", clear: "both" }} />
        </div>

        <div className="chat-footer">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}