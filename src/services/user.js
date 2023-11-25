import { stringify } from 'qs';
import request from '../utils/request';

// user login
export function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params,
  })
}

// get user info
export function queryUserInfo(params) {
  return request(`/api/user/${params.id}`);
}

// register
export function register(params) {
  return request('/api/user/register', {
    method: 'POST',
    body: params
  })
}

// get user list
export function queryUsers(params) {
  return request(`/api/users`);
}