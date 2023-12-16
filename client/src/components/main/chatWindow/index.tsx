import React from "react";
import { userStore } from "../../../store/user";
import style from "./style.module.css";
import { observer } from "mobx-react-lite";
import Message from "./message";
import { message } from "../../../types/main";
const ChatWindow = () => {
  return (
    <div className={style.chatWindow}>
      {userStore.getMessageList().map((el: message, index: number) => (
        <Message el={el} key={index} />
      ))}
    </div>
  );
};

export default observer(ChatWindow);
