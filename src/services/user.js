import { stringify } from 'qs';
import request from '../utils/request';

// user login
export function login(params) {
  return request('/api/v1/user/login', {
    method: 'POST',
    body: {
      ...params,
    },
  })
}

// get user info
export function queryUserInfo(params) {
  return request(`/api/v1/user/${params.id}`);
}

// register
export function register(params) {
  return request('/api/v1/user/register', {
    method: 'POST',
    body: {
      ...params,
    },
  })
}

export function logout(params) {
  return request('/api/v1/user/logout')
}

// get user list
export function queryUsers(params) {
  return request(`/api/v1/user/all`);
}