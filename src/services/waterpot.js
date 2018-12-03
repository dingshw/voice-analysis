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
export async function queryDownloadBig(params) {
  let url = '/excelUpload/downloadBig'
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
  return request(url)
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
  return request('/testModelMng/modifyTestSystem', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddBigTestSystemsData(params) {
  return request('/testModelMng/saveTestSystem', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelBigTestSystemsData(params) {
  return request('/testModelMng/deleteTestSystem', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddWaterData(params) {
  return request('/bigMng/saveItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateWaterData(params) {
  return request('/bigMng/modifyItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelWaterData(params) {
  return request('/bigMng/deleteItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelWaterDataList(params) {
  return request('/bigMng/deleteItems', {
    method: 'POST',
    body: params,
  })
}
export async function queryWaterMetaData(params) {
  return request('/bigMng/queryFull', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddWaterMetaData(params) {
  return request('/bigMng/addMetaData', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateWaterMetaData(params) {
  return request('/bigMng/updateMetaData', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelWaterMetaData(params) {
  return request('/bigMng/delMetaData', {
    method: 'POST',
    body: params,
  })
}
