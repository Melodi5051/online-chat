import React, { useState } from "react";
import style from "./style.module.scss";
import { useWebSocket } from "../../WebScoketContext";
import { userStore } from "../../../store/user";
import send from "./../../../assets/send-icon.svg";

const MessageSet = () => {
  const { socket } = useWebSocket();
  const [message, setMessage] = useState("");
  const handleMessageSend = () => {
    if (socket && message) {
      const dataMessage = {
        name: userStore.getUserName(),
        message: message,
        dateTime: new Date(),
      };
      socket.emit("message", dataMessage);
      setMessage("");
    }
  };
  return (
    <div className={style.sendMsg}>
      <input
        type="text"
        placeholder="Наберите сообщение..."
        className={style.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleMessageSend();
          }
        }}
      />
      <button onClick={handleMessageSend} className={style.button}>
        <img src={send} alt="" />
      </button>
    </div>
  );
};

export default MessageSet;
