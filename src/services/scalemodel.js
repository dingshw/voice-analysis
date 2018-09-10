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
