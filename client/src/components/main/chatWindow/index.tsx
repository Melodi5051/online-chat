import { userStore } from "../../../store/user";
import style from "./style.module.scss";
import { observer } from "mobx-react-lite";
import Message from "./message";
import { message } from "../../../types/main";

const ChatWindow = () => {
  return (
    <div className={style.chatWindow}>
      {userStore.getMessageList().map((el: message) => (
        <Message el={el} key={el.uuid} />
      ))}
    </div>
  );
};

export default observer(ChatWindow);
