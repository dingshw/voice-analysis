import request from '../utils/request';

export async function queryBackingData() {
  return request('/metaMng/small/backing');
}
export async function querySampleData() {
  return request('/metaMng/small/sample');
}

export async function querySoundPipeData(params) {
  return request('/item/pageSearchCondition', {
    method: 'POST',
    body: params,
  })
}
