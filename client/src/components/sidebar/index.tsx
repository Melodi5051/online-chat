import style from "./style.module.scss";
import { userStore } from "../../store/user";
import { useWebSocket } from "../WebScoketContext";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserItem from "./userItem";
import { user } from "../../types/main";
const UserList = () => {
  const navigate = useNavigate();
  const { socket } = useWebSocket();
  const handleLogout = () => {
    const userName = userStore.getUserName();
    if (socket) {
      socket.emit("logout", userName);
      userStore.Logout();
      navigate("/");
    }
  };
  return (
    <div className={style.sidebar}>
      <h1 className={style.title}>Онлайн чат</h1>
      <ul className={style.usersList}>
        {userStore.getUserList().map((el: user, index: number) => (
          <UserItem item={el} key={index} />
        ))}
      </ul>
      <button onClick={handleLogout} className={style.btnLogout}>
        Выйти
      </button>
    </div>
  );
};

export default observer(UserList);
