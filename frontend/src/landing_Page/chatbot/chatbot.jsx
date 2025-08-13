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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/message`, {
        message: input,
      });
      const botMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url("/images/chatbot.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "1rem",
        position: "relative",
      }}
    >
      {/* Overlay with tagline */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          textAlign: "center",
          color: "#fff",
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          marginTop:"3rem"
        
        }}
      >
   
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1rem", opacity: 0.9 }}>
          Ask questions, get instant help, and learn more about our mission.
        </p>
      </div>

      {/* Chat container */}
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          height: "80vh",
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 2,
          marginTop:"4rem"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px",
            background: "linear-gradient(90deg, #5563DE, #4E9AF1)",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          💬 Go4Give Chat Assistant
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: "14px",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #5563DE, #4E9AF1)"
                      : "#ffffff",
                  color: msg.role === "user" ? "#fff" : "#000",
                  padding: "12px 16px",
                  borderRadius:
                    msg.role === "user"
                      ? "18px 18px 0 18px"
                      : "18px 18px 18px 0",
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  fontSize: "1rem",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.3)",
            padding: "12px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              outline: "none",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.8)",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "10px",
              background: "linear-gradient(135deg, #5563DE, #4E9AF1)",
              color: "#fff",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
