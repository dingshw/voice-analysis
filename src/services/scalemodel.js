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
