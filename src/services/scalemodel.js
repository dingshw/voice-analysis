import request from '../utils/request';

export async function queryTestModel() {
  return request('/scaleMataMng/scale/testModelObjs');
}
export async function queryTestConditions() {
  return request('/scaleMataMng/scale/testConditions');
}
export async function queryLayingSchemes() {
  return request('/scaleMataMng/scale/layingSchemes');
}
export async function queryScaleCondition(params) {
  return request('/item/pageSearchScaleCondition', {
    method: 'POST',
    body: params,
  })
}
export async function queryDownloadScale(params) {
  let url = '/excelUpload/downloadScale'
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
export async function queryScaleManage(params) {
  return request('/scaleMng/queryAll', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateTestModelData(params) {
  return request('/testModelObjMng/modifyTestModelObj', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddTestModelData(params) {
  return request('/testModelObjMng/saveTestModelObj', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelTestModelData(params) {
  return request('/testModelObjMng/deleteTestModelObj', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateTestConditions(params) {
  return request('/testConditionMng/modifyTestCondition', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddTestConditions(params) {
  return request('/testConditionMng/saveTestCondition', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelTestConditions(params) {
  return request('/testConditionMng/deleteTestCondition', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateLayingSchemes(params) {
  return request('/layingSchemeMng/modifyLayingSchemePO', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddLayingSchemes(params) {
  return request('/layingSchemeMng/saveLayingSchemePO', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelLayingSchemes(params) {
  return request('/layingSchemeMng/deleteLayingSchemePO', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddScaleData(params) {
  return request('/scaleMng/saveItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateScaleData(params) {
  return request('/scaleMng/modifyItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelScaleData(params) {
  return request('/scaleMng/deleteItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelScaleDataList(params) {
  return request('/scaleMng/deleteItems', {
    method: 'POST',
    body: params,
  })
}
export async function queryScaleMetaData(params) {
  return request('/scaleMng/queryFull', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddScaleMetaData(params) {
  return request('/scaleManager/save', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateScaleMetaData(params) {
  return request('/scaleManager/modify', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelScaleMetaData(params) {
  return request('/scaleManager/delete', {
    method: 'POST',
    body: params,
  })
}
export async function queryScaleMetaDataByCondition(params) {
  return request('/scaleManager/queryByCondition', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelScaleMetaList(params) {
  return request('/scaleManager/deleteAll', {
    method: 'POST',
    body: params,
  })
}
