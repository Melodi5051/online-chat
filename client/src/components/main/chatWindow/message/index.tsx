import React from "react";
import { userStore } from "../../../../store/user";
import style from "./style.module.css";
import { message } from "../../../../types/main";
interface Props {
  el: message;
}
const Message: React.FC<Props> = ({ el }) => {
  const classMessage =
    el.name === userStore.getUserName() ? style.messageSend : style.messageGet;
  return (
    <div className={classMessage}>
      <h3 className={style.userName}>{el.name}</h3>
      <div className={style.messageWrapper}>
        <p className={style.textMessage}>{el.message}</p>
        <p className={style.time}>{el.dateTime}</p>
      </div>
    </div>
  );
};

export default Message;
