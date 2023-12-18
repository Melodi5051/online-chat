import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/user";
import style from "./style.module.scss";
import { useWebSocket } from "../../components/WebScoketContext";
import send from "./../../assets/send-icon.svg";
import snownam from "./../../assets/Snowman.svg";
import presents from "./../../assets/Presents.svg";
import { observer } from "mobx-react-lite";
import { user } from "../../types/main";

const Home: React.FC = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { socket } = useWebSocket();
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkUserName = async (userName: user) => {
      return new Promise<boolean>((resolve) => {
        if (socket) {
          socket.emit("checkUserName", userName, (exists: boolean) => {
            if (exists) {
              setError(true);
              resolve(true);
            } else {
              setError(false);
              resolve(false);
            }
          });
        } else {
          resolve(false);
        }
      });
    };

    await checkUserName(userName).then((res: boolean) => {
      if (socket && !res) {
        socket.emit("login", userName);
        localStorage.setItem("userName", userName);
        userStore.Login(userName);
        navigate("/chat");
      }
    });
  };

  const checkStorage = () => {
    const storageValue = localStorage.getItem("userName");
    if (storageValue) {
      userStore.Login(storageValue);
      navigate("/chat");
    }
  };

  checkStorage();

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
          {error ? <p className={style.error}>Имя занято</p> : null}
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
