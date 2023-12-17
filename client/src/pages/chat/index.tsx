import React, { useEffect } from "react";
import style from "./style.module.scss";
import { userStore } from "../../store/user";
import { useWebSocket } from "../../components/WebScoketContext";

import Sidebar from "../../components/sidebar";
import Main from "../../components/main";
const Chat: React.FC = () => {
  const { socket } = useWebSocket();

  useEffect(() => {
    if (socket) {
      const handleReceivedMessage = (data: any) => {
        userStore.setMessageInList(data);
      };
      socket.on("message", handleReceivedMessage);
      return () => {
        socket.off("message", handleReceivedMessage);
      };
    }
  }, [socket]);

  return (
    <div className={style.layout}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Chat;
