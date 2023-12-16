import React, { useState } from "react";
import style from "./style.module.css";
import { useWebSocket } from "../../WebScoketContext";
import { userStore } from "../../../store/user";
import send from "./../../../assets/send-icon.svg";

const MessageSet = () => {
  const { socket } = useWebSocket();
  const [message, setMessage] = useState("");
  const handleMessageSend = () => {
    if (socket && message) {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${String(
        currentTime.getMinutes()
      ).padStart(2, "0")}`;
      const dataUser = {
        name: userStore.getUserName(),
        message: message,
        dateTime: formattedTime,
      };
      socket.emit("message", dataUser);
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
