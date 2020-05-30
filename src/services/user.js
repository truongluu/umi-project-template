import { apiPost, apiGet } from '@/utils/request';

const { AUTH_API } = process.env;

export function login(params) {
  return apiPost(`${AUTH_API}/user/login`, {
    body: params
  });
}

export function logout() {
  return apiGet(`${AUTH_API}/user/logout`);
}

export function getCurrent(params) {
  return apiGet(`${AUTH_API}/user/verify`, params);
}

export function getListUser(params) {
  return apiGet(`${AUTH_API}/user/list`, params);
}

export function requestResetPassword(params) {
  return apiPost(`${AUTH_API}/user/forgot`, {
    body: params
  });
}

export function changePassword(params) {
  return apiPost(`${AUTH_API}/user/change-password`, {
    body: params
  });
}

export function checkTokenPass(params) {
  return apiGet(`${AUTH_API}/user/check-token-pass`, params);
}