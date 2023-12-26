import React, { useRef } from "react";
import style from "./style.module.scss";
import { useWebSocket } from "../../WebScoketContext";
import { userStore } from "../../../store/user";
import send from "./../../../assets/send-icon.svg";
import { v4 } from "uuid";
import { message } from "../../../types/main";
const MessageSet = () => {
  const { socket } = useWebSocket();

  const formRef = useRef<HTMLFormElement>(null);

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current && socket) {
      const formData = new FormData(formRef.current);

      const dataMessage: message = {
        uuid: v4(),
        name: userStore.getUserName(),
        message: formData.get("text") as string,
        dateTime: new Date(),
      };

      if (dataMessage.message.length) {
        socket.emit("message", dataMessage);
        formRef.current.reset();
      }
    }
  };

  return (
    <form
      onSubmit={(e) => handleMessageSend(e)}
      className={style.sendMsg}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleMessageSend(e);
        } else {
          return null;
        }
      }}
      ref={formRef}
    >
      <input
        id="text"
        type="text"
        placeholder="Наберите сообщение..."
        name="text"
        className={style.input}
      />
      <button type="submit" className={style.button}>
        <img src={send} alt={"send"} />
      </button>
    </form>
  );
};
export default MessageSet;
