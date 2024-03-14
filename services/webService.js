import http from "./httpService";
import apiUrl from "../config";

export function addNewsLetter(data, user) {
    return http.post(
        apiUrl + `/web/newsletter/add`,
        data,
        {
            headers: {
                Authorization: user.token_id,
            },
        }
    );
}

export function addResellerRequest(data) {
    return http.post(
        apiUrl + `/web/resellerrequest/add`, data);
}

export function addWebRequest(data) {
    return http.post(
        apiUrl + `/web/webrequest/add`, data);
}