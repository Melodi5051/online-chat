import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { io } from "socket.io-client";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWebSocket } from "./components/WebScoketContext";
import { userStore } from "./store/user";
import { setTimeout } from "timers/promises";

function App() {
  const { socket } = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.on("userList", (res) => {
        if (res) {
          userStore.setUserList(res);
        }
      });
      return () => {
        socket.off("userList");
      };
    }
  }, [socket]);
  return <RouterProvider router={router} />;
}

export default observer(App);
