import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { message } from "./types/types";

const server = http.createServer();
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

let userList: string[] = [];
let countUsers: number = userList.length;

const messageSystem = (message: string): message => {
  return {
    name: "Система",
    message,
    dateTime: new Date(),
  };
};

io.on("connection", (socket: Socket) => {
  socket.emit("countUsers", countUsers);
  socket.emit("userList", userList);

  socket.on(
    "checkUserName",
    (userName: string, callback: (exists: boolean) => void) => {
      const userExists = userList.includes(userName);
      callback(userExists);
    }
  );

  socket.on("login", (userName: string) => {
    userList.push(userName);
    countUsers = userList.length;
    const message = `Пользователь "${userName}" вошел в чат`;

    io.emit("countUsers", countUsers);
    io.emit("message", messageSystem(message));
    io.emit("userList", userList);
  });

  socket.on("logout", (userName: string) => {
    
    if (userList.includes(userName)) {
      const message = `Пользователь "${userName}" вышел из чата`;
      userList = userList.filter((name: string) => name !== userName);
      countUsers = userList.length;
      io.emit("countUsers", countUsers);
      io.emit("message", messageSystem(message));
      io.emit("userList", userList);
    }
  
  });

  socket.on("getUsers", (callback: (item: string[]) => void) => {
    callback(userList);
  });

  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
