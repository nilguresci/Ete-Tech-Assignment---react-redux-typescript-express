import axios from "axios";
import { IUser, IUserInitialInfo } from "../../models/User";

//const API_URL = "https://642d9c2266a20ec9cea2117f.mockapi.io/users";
const API_URL = "http://localhost:3000/api/users";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
//register user
const register = async (userData: IUserInitialInfo) => {
  const response = await axios.post(API_URL, userData.user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: IUserInitialInfo) => {
  const response = await axios.post(API_URL + "/login", userData.user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//get users
const usersList: any = async () => {
  const data = await axios.get(API_URL, config);

  return data.data;
};

//found user
const foundUser: any = async (users: any, userData: any) => {
  const found = users.find((user: any): any => {
    return (
      user.username === userData.user.username &&
      user.password === userData.user.password
    );
  });

  if (found) return found;
  else false;
};

//logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
