import http from "./httpService";
import apiUrl from "../config";

const apiRegisterEndPoint = apiUrl + "/web/customer/register";
const apiValidateUsernameEndPoint = apiUrl + "/web/customer/check/username/";

export function register(user) {
  return http.post(apiRegisterEndPoint, {
    ...user,
  });
}

export function validateUsername(username) {
  return http.get(`${apiValidateUsernameEndPoint}${username}`);
}
