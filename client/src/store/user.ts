import { makeAutoObservable } from "mobx";
import { user, message } from "../types/main";

class User {
  userName: string = "";
  userAuth: boolean = false;
  userList: user[] = [];
  countUsers: number = 0;
  messagesList: message[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  Login(name: string) {
    this.userName = name;
    this.userAuth = true;
  }

  Logout() {
    this.userName = "";
    this.userAuth = false;
    this.userList = [];
    this.messagesList = [];
  }

  setUserList(list: user[]) {
    this.userList = list;
  }
  setCountUsers(count: number) {
    this.countUsers = count;
  }
  setMessageInList(message: message) {
    this.messagesList.push(message);
  }

  getMessageList() {
    return this.messagesList;
  }

  getUserList() {
    return this.userList;
  }

  getUserName() {
    return this.userName;
  }
}

export const userStore = new User();
