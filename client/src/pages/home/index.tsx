import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/user";
import style from "./style.module.css";
import { useWebSocket } from "../../components/WebScoketContext";
const Home: React.FC = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { socket } = useWebSocket();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket) {
      socket.emit("login", userName);
      socket.emit("getusers");
      userStore.Login(userName);
      navigate("/chat");
    }
  };

  return (
    <div className={style.main}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1>ВХОД В ЧАТ</h1>
        <div className={style.wrapperInp}>
          <label htmlFor="userName">Введите свое имя</label>
          <input
            type="text"
            id="userName"
            className={style.inp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
            }}
            placeholder="Введите имя..."
          />
        </div>
        <button type="submit" className={style.button}>
          Зайти в чат
        </button>
      </form>
    </div>
  );
};

export default Home;
