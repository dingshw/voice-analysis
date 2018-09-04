import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}
