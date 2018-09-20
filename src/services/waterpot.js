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
export async function queryWaterpotManageData(params) {
  return request('/bigMng/queryAll', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateBigTestData(params) {
  return request('/testModelMng/modifyTestModel', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddBigTestData(params) {
  return request('/testModelMng/saveTestModel', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelBigTestData(params) {
  return request('/testModelMng/deleteTestModel', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateBigTestSystemsData(params) {
  return request('/testModelMng/modifyTestModel', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddBigTestSystemsData(params) {
  return request('/testModelMng/saveTestModel', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelBigTestSystemsData(params) {
  return request('/testModelMng/deleteTestModel', {
    method: 'POST',
    body: params,
  })
}
