import express, { Request, Response } from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

let userList: string[] = [];

io.on("connection", (socket: Socket) => {
  socket.on("login", (userName: string) => {
    if (userList.includes(userName)) {
      socket.emit("loginError", "User already exists");
    } else {
      userList.push(userName);
      io.emit("userList", userList);
    }
  });

  socket.on("logout", (userName: string) => {
    userList = userList.filter((name: string) => name !== userName);
    console.log(userList);
    io.emit("userList", userList);
  });

  socket.on("getUsers", (callback: any) => {
    callback(userList);
  });

  socket.on("message", (data) => {
    console.log(data.name, "говорит:", data.message, "время", data.dateTime);
    io.emit("message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер на порте ${PORT}`);
});
