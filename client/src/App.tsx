import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWebSocket } from "./components/WebScoketContext";
import { userStore } from "./store/user";

function App() {
  const { socket } = useWebSocket();
  useEffect(() => {
    if (socket) {
      socket.on("countUsers", (res: number) => {
        if (res) {
          userStore.setCountUsers(res);
        }
      });
      socket.on("userList", (res) => {
        if (res) {
          userStore.setUserList(res);
        }
      });
      return () => {
        socket.off("userList");
        socket.off("countUsers");
      };
    }
  }, [socket]);

  return <RouterProvider router={router} />;
}

export default observer(App);
