import React, { useEffect } from "react";
import style from "./style.module.css";
import { userStore } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
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
