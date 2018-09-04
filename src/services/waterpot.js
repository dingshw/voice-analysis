import request from '../utils/request';

export async function queryBigSampleData() {
  return request('/bigmetaMng/big/sample');
}
export async function queryBigTestData() {
  return request('/bigmetaMng/big/testModel');
}
export async function queryBigTestSystemsData() {
  return request('/bigmetaMng/big/testSystems');
}

export async function queryWaterpotData(params) {
  return request('/item/pageSearchBigCondition', {
    method: 'POST',
    body: params,
  })
}
