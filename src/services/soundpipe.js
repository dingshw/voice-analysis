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
export async function queryDownloadSmall(params) {
  let url = '/excelUpload/downloadSmall'
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
export async function querySoundManageData(params) {
  return request('/smallMng/queryAll', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateSampleData(params) {
  return request('/sampleMng/modifySample', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddSampleData(params) {
  return request('/sampleMng/saveSample', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelSampleData(params) {
  return request('/sampleMng/deleteSample', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateBackingData(params) {
  return request('/backingMng/modifyBacking', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddBackingData(params) {
  return request('/backingMng/saveBacking', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelBackingData(params) {
  return request('/backingMng/deleteBacking', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddSoundData(params) {
  return request('/smallMng/saveItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateSoundData(params) {
  return request('/smallMng/modifyItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelSoundData(params) {
  return request('/smallMng/deleteItem', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelSoundDataList(params) {
  return request('/smallMng/deleteItems', {
    method: 'POST',
    body: params,
  })
}
export async function querySoundMetaData(params) {
  return request('/smallMng/queryFull', {
    method: 'POST',
    body: params,
  })
}
export async function queryAddSoundMetaData(params) {
  return request('/smallManager/save', {
    method: 'POST',
    body: params,
  })
}
export async function queryUpdateSoundMetaData(params) {
  return request('/smallManager/update', {
    method: 'POST',
    body: params,
  })
}
export async function queryDelSoundMetaData(params) {
  return request('/smallManager/delete', {
    method: 'POST',
    body: params,
  })
}
export async function querySoundMetaDataByCondition(params) {
  return request('/smallManager/queryByCondition', {
    method: 'POST',
    body: params,
  })
}
