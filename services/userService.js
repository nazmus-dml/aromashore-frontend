import http from "./httpService";
import apiUrl from "../config";
const apiEndPoint = apiUrl + "/web/customer/register";

export function register(user) {
  return http.post(apiEndPoint, {
    ...user,
  });
}
