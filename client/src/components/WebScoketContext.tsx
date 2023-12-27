import React, { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { userStore } from "../store/user";


interface WebSocketContextType {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
});

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};




export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socket = io("http://localhost:5000");

  window.addEventListener("pagehide", () => {
    const userName = userStore.getUserName();
    socket.emit("logout", userName);
    userStore.Logout();
    localStorage.removeItem("userName");
  });
  

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
