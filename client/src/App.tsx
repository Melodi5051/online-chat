import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWebSocket } from "./components/WebScoketContext";
import { userStore } from "./store/user";
import { user } from "./types/main";

function App() {
  const { socket } = useWebSocket();
  useEffect(() => {
    if (socket) {
      socket.on("countUsers", (res: number) => {
        userStore.setCountUsers(res);
      });
      socket.on("userList", (res: user[]) => {
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
