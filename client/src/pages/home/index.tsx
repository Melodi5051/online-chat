import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/user";
import style from "./style.module.scss";
import { useWebSocket } from "../../components/WebScoketContext";
import send from "./../../assets/send-icon.svg";
import snownam from "./../../assets/Snowman.svg";
import presents from "./../../assets/Presents.svg";
import { observer } from "mobx-react-lite";

const Home: React.FC = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { socket } = useWebSocket();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket) {
      socket.emit("login", userName);
      userStore.Login(userName);
      navigate("/chat");
    }
  };
  return (
    <div className={style.layout}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>ВХОД В ЧАТ</h1>
        <div className={style.wrapper}>
          <div className={style.inputWrapper}>
            <input
              type="text"
              id="userName"
              className={style.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(e.target.value);
              }}
              placeholder="Введите свое имя..."
            />
            <button type="submit" className={style.button}>
              <img src={send} alt="send" />
            </button>
          </div>
          <div className={style.countUsers}>
            <p className={style.info}>
              Пользователей в чате: {userStore.countUsers}
            </p>
          </div>
        </div>
      </form>
      <img className={style.presents} src={presents} alt="presents" />
      <img className={style.snownam} src={snownam} alt="snownam" />
    </div>
  );
};

export default observer(Home);
