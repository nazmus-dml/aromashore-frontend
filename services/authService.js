import http from "./httpService";
import apiUrl from "../config";
import Cookies from "js-cookie";
const apiEndPoint = apiUrl + "/web/customer/login";

export async function login({ contact, password }) {
  Cookies.set("login", true)
  const { data } = await http.post(apiEndPoint, { contact, password });
  return data;
}

export function logout() {
  Cookies.remove("user");
}

export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } catch (ex) {
    return null;
  }
}
