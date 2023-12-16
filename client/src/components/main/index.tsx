import style from "./style.module.css";
import MessageSet from "./messageSet";
import ChatWindow from "./chatWindow";

const Main = () => {
  return (
    <main className={style.chat}>
      <ChatWindow />
      <MessageSet />
    </main>
  );
};

export default Main;
