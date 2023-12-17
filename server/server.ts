import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

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

io.on("connection", (socket: Socket) => {
  socket.emit("countUsers", countUsers);

  socket.on("login", (userName: string) => {
    if (userList.includes(userName)) {
      socket.emit("loginError", "User already exists");
    } else {
      userList.push(userName);
      countUsers = userList.length;
      io.emit("userList", userList);

      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${String(
        currentTime.getMinutes()
      ).padStart(2, "0")}`;

      const data = {
        name: "Система",
        message: `Пользователь "${userName}" вошел в чат`,
        dateTime: formattedTime,
      };

      io.emit("message", data);
    }
  });

  socket.on("logout", (userName: string) => {
    userList = userList.filter((name: string) => name !== userName);
    countUsers = userList.length;
    console.log(userList);

    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${String(
      currentTime.getMinutes()
    ).padStart(2, "0")}`;

    const data = {
      name: "Система",
      message: `Пользователь "${userName}" вышел из чата`,
      dateTime: formattedTime,
    };

    io.emit("message", data);
  });

  socket.on("getUsers", (callback: (item: string[]) => void) => {
    callback(userList);
  });

  socket.on("message", (data) => {
    console.log(data.name, "говорит:", data.message, "время", data.dateTime);
    io.emit("message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
