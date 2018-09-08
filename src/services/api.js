import request from '../utils/request';

export async function fakeAccountLogin(params) {
  let url = '/user/login'
  if (params) {
    const paramsArray = [];
    // 拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key  }=${  params[key]}`))
    if (url.search(/\?/) === -1) {
        url += `?${  paramsArray.join('&')}`
    } else {
        url += `&${  paramsArray.join('&')}`
    }
  }
  return request(url);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}
