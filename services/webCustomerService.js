import http from "./httpService";
import apiUrl from "../config";
import {headerWithUserAuthToken} from "./authService";
const apiEndPoint = apiUrl + "/web/customer/getall/category";

export function fetchCustomerTypes() {
  return http.get(apiEndPoint);
}

export function getprofileByCustomer(user) {
  return http.get(
    apiUrl + `/web/customer/getprofile/${user.uid}/${user.contact}`,
    {
      headers: {
        Authorization: user.token_id,
      },
    }
  );
}

export function updateprofileByCustomer(data) {
  return http.post(apiUrl + `/web/customer/update/${data.uid}`, data, {
    headers: {
      Authorization: data.token_id,
    },
  });
}

export function updateprofilePicture(data, user) {
  return http.post(
    apiUrl + `/web/customer/upload-profile-image/${user.uid}`,
    data,
    {
      headers: {
        Authorization: user.token_id,
      },
    }
  );
}

export function changeProfilePassword(data,user) {
  return http.post(
    apiUrl + `/web/customer/update-password/${user.uid}`,
    data,
    {
      headers: {
        Authorization: user.token_id,
      },
    }
  );
}

export function getOrderHistoryByCustomerId(customerId) {
  return http.get(
    apiUrl + `/web/customer/order/getall/${customerId}`,
    headerWithUserAuthToken()
  );
}
