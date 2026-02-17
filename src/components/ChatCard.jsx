import React from "react";
import user from "../assets/user.png";

const ChatCard = ({ msg }) => {
  if (!msg) return null;

  const isUser = msg.side === "user";

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        marginBottom: "10px",
        backgroundColor: isUser ? "#e6f2ff" : "#f2f2f2",
        borderRadius: "8px",
      }}
    >
      <img
        src={user}
        alt="avatar"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>
          {isUser ? "You" : "Customer Support AI"}
        </p>

        <p style={{ margin: 0 }}>{msg.text}</p>

        <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
          {msg.timestamp
            ? new Date(msg.timestamp).toLocaleTimeString()
            : ""}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
