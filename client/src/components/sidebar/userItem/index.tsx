import React from "react";
import style from "./style.module.css";
import { user } from "../../../types/main";

interface Props {
  item: user;
}

const UserItem: React.FC<Props> = ({ item }) => {
  return <li className={style.listItem}>{item}</li>;
};

export default UserItem;
