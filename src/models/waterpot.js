import _ from 'lodash'
import { queryBigSampleData, queryBigTestData, queryBigTestSystemsData,
  queryWaterpotData, queryWaterpotManageData, queryUpdateBigTestData,
  queryAddBigTestData, queryDelBigTestData,
  queryUpdateBigTestSystemsData, queryAddBigTestSystemsData,
  queryDelBigTestSystemsData, queryAddWaterData, queryUpdateWaterData,
  queryDelWaterData, queryDelWaterDataList, queryWaterMetaData, queryDownloadBig,
  queryAddWaterMetaData, queryUpdateWaterMetaData, queryDelWaterMetaData} from '../services/waterpot';

export default {
  namespace: 'waterpot',

  state: {
    bigSampleData: [],
    bigTestData: [],
    bigTestSystemsData: [],
    waterpotData: {},
    waterpotManageData: [],
    waterMetaData: [],
  },

  effects: {
    *getBigSampleData(___, { call, put }) {
      const response = yield call(queryBigSampleData);
      if(response){
        const data = response.data || []
        yield put({
          type: 'changeBigSampleData',
          payload: data,
        });
      }
    },
    *getBigTestData(___, { call, put }) {
      const response = yield call(queryBigTestData);
      if(response) {
        const data = response.data || []

        yield put({
          type: 'changeBigTestData',
          payload: data,
        });
      }
    },
    *getBigTestSystemsData(___, { call, put }) {
      const response = yield call(queryBigTestSystemsData);
      if(response) {
        const data = response.data || []

        yield put({
          type: 'changeBigTestSystemsData',
          payload: data,
        });
      }
    },
    *getWaterpotDataData({ payload }, { call, put }) {
      const response = yield call(queryWaterpotData, payload);
      if(response) {
        const data = response.data || []
        const dataMap = {dataParam: payload, data}
        yield put({
          type: 'waterpotDataHandle',
          payload: dataMap,
        });
      }
    },
    *downloadBig({ payload }, { call, put }) {
      const response = yield call(queryDownloadBig, payload);
      if(response) {
        const data = response.data || []
        const dataMap = {dataParam: payload, data}
        yield put({
          type: 'downloadBigHandle',
          payload: dataMap,
        });
      }
    },
    *getWaterpotManageData({ payload }, { call, put }) {
      const response = yield call(queryWaterpotManageData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'waterpotManageDataHandle',
          payload: data,
        });
      }
    },
    *getWaterMetaData({ payload }, { call, put }) {
      const response = yield call(queryWaterMetaData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'waterMetaDataHandle',
          payload: data,
        });
      }
    },
    *updateBigTestData({ payload }, { call, put }) {
      const response = yield call(queryUpdateBigTestData, payload);
      if(response) {
        // const data = response.data || []
        // data.photos = payload.photos
        yield put({
          type: 'handelUpdateBigTest',
          payload,
        });
      }
    },
    *addBigTestData({ payload }, { call, put }) {
      const response = yield call(queryAddBigTestData, payload)
      if(response) {
        const data = response.data || []
        data.photos = payload.photos
        yield put({
          type: 'handelAddBigTest',
          payload: data,
        });
      }
    },
    *delBigTestData({ payload }, { call, put }) {
      const response = yield call(queryDelBigTestData, payload);
      if(response) {
        yield put({
          type: 'handelDeleteBigTest',
          payload,
        });
      }
    },
    *updateBigTestSystemsData({ payload }, { call, put }) {
      const response = yield call(queryUpdateBigTestSystemsData, payload);
      if(response) {
        // const data = response.data || []
        yield put({
          type: 'handelUpdateBigTestSystems',
          payload,
        });
      }
    },
    *addBigTestSystemsData({ payload }, { call, put }) {
      const response = yield call(queryAddBigTestSystemsData, payload)
      if(response) {
        const data = response.data || []
        data.photos = payload.photos
        yield put({
          type: 'handelAddBigTestSystems',
          payload: data,
        });
      }
    },
    *delBigTestSystemsData({ payload }, { call, put }) {
      const response = yield call(queryDelBigTestSystemsData, payload);
      if(response) {
        yield put({
          type: 'handelDeleteBigTestSystems',
          payload,
        });
      }
    },
    *addWaterData({ payload }, { call, put }) {
      const response = yield call(queryAddWaterData, payload);
      if(response) {
        const data = response.data || []
        const pk = data && data.pk
        yield put({
          type: 'handelAddWaterData',
          payload: {...payload, pk},
        });
      }
    },
    *updateWaterData({ payload }, { call, put }) {
      const response = yield call(queryUpdateWaterData, payload);
      if(response) {
        // const data = response.data || []
        yield put({
          type: 'handelUpdateWaterData',
          payload,
        });
      }
    },
    *delWaterData({ payload }, { call, put }) {
      const response = yield call(queryDelWaterData, payload);
      if(response) {
        yield put({
          type: 'handelDelWaterData',
          payload,
        });
      }
    },
    *delWaterDataList({ payload }, { call, put }) {
      const response = yield call(queryDelWaterDataList, payload);
      if(response) {
        yield put({
          type: 'handelDelWaterDataList',
          payload,
        });
      }
    },
    *addWaterMetaData({ payload }, { call, put }) {
      const response = yield call(queryAddWaterMetaData, payload);
      if(response) {
        const data = response.data || []
        const pk = data && data.pk
        yield put({
          type: 'handelAddWaterMetaData',
          payload: {...payload, pk},
        });
      }
    },
    *updateWaterMetaData({ payload }, { call, put }) {
      const response = yield call(queryUpdateWaterMetaData, payload);
      if(response) {
        // const data = response.data || []
        yield put({
          type: 'handelUpdateWaterMetaData',
          payload,
        });
      }
    },
    *delWaterMetaData({ payload }, { call, put }) {
      const response = yield call(queryDelWaterMetaData, payload);
      if(response) {
        yield put({
          type: 'handelDelWaterMetaData',
          payload,
        });
      }
    },
  },

  reducers: {
    changeBigSampleData(state, { payload }) {
      return {
        ...state,
        bigSampleData: payload,
      };
    },
    changeBigTestData(state, { payload }) {
      return {
        ...state,
        bigTestData: payload,
      };
    },
    changeBigTestSystemsData(state, { payload }) {
      return {
        ...state,
        bigTestSystemsData: payload,
      };
    },
    waterpotDataHandle(state, { payload }) {
      return {
        ...state,
        waterpotData: payload,
      };
    },
    waterpotManageDataHandle(state, { payload }) {
      return {
        ...state,
        waterpotManageData: payload,
      };
    },
    handelUpdateBigTest(state, { payload }) {
      const {bigTestData} = state
      const bigTestDataTemp = _.cloneDeep(bigTestData)
      for(let item of bigTestDataTemp) {
        if(item.pk === payload.pk) {
          item = _.cloneDeep(payload)
        }
      }
      return {
        ...state,
        bigTestData: bigTestDataTemp,
      }
    },
    handelAddBigTest(state, { payload }) {
      const {bigTestData} = state
      const bigTestDataTemp = _.cloneDeep(bigTestData)
      bigTestDataTemp.unshift(payload)
      return {
        ...state,
        bigTestData: bigTestDataTemp,
      }
    },
    handelDeleteBigTest(state, { payload }) {
      const {bigTestData} = state
      const bigTestDataTemp = _.cloneDeep(bigTestData)
      for(let i=0; i < bigTestDataTemp.length; i+=1) {
        if(bigTestDataTemp[i].pk === payload.pk) {
          bigTestDataTemp.splice(i, 1)
          return {
            ...state,
            bigTestData: bigTestDataTemp,
          }
        }
      }
    },
    handelUpdateBigTestSystems(state, { payload }) {
      const {bigTestSystemsData} = state
      const bigTestSystemsDataTemp = _.cloneDeep(bigTestSystemsData)
      for(const item of bigTestSystemsDataTemp) {
        if(item.pk === payload.pk) {
          for(const key in payload) {
            if(Object.prototype.hasOwnProperty.call(payload, key)
            && Object.prototype.hasOwnProperty.call(item, key)){
              item[key] = payload[key]
            }
          }
        }
      }
      return {
        ...state,
        bigTestSystemsData: bigTestSystemsDataTemp,
      }
    },
    handelAddBigTestSystems(state, { payload }) {
      const {bigTestSystemsData} = state
      const bigTestSystemsDataTemp = _.cloneDeep(bigTestSystemsData)
      bigTestSystemsDataTemp.unshift(payload)
      return {
        ...state,
        bigTestSystemsData: bigTestSystemsDataTemp,
      }
    },
    handelDeleteBigTestSystems(state, { payload }) {
      const {bigTestSystemsData} = state
      const bigTestSystemsDataTemp = _.cloneDeep(bigTestSystemsData)
      for(let i=0; i < bigTestSystemsDataTemp.length; i+=1) {
        if(bigTestSystemsDataTemp[i].pk === payload.pk) {
          bigTestSystemsDataTemp.splice(i, 1)
          return {
            ...state,
            bigTestSystemsData: bigTestSystemsDataTemp,
          }
        }
      }
    },
    handelAddWaterData(state, { payload }) {
      const {waterpotManageData} = state
      const waterpotManageDataTemp = _.cloneDeep(waterpotManageData)
      waterpotManageDataTemp.unshift(payload)
      return {
        ...state,
        waterpotManageData: waterpotManageDataTemp,
      }
    },
    handelUpdateWaterData(state, { payload }) {
      const {waterpotManageData} = state
      const waterpotManageDataTemp = _.cloneDeep(waterpotManageData)
      for(const item of waterpotManageDataTemp) {
        if(item.pk === payload.pk) {
          for(const key in payload) {
            if(Object.prototype.hasOwnProperty.call(payload, key)
            && Object.prototype.hasOwnProperty.call(item, key)){
              item[key] = payload[key]
            }
          }
        }
      }
      return {
        ...state,
        waterpotManageData: waterpotManageDataTemp,
      }
    },
    handelDelWaterData(state, { payload }) {
      const {waterpotManageData} = state
      const waterpotManageDataTemp = _.cloneDeep(waterpotManageData)
      for(let i=0; i < waterpotManageDataTemp.length; i+=1) {
        if(waterpotManageDataTemp[i].pk === payload.pk) {
          waterpotManageDataTemp.splice(i, 1)
          return {
            ...state,
            waterpotManageData: waterpotManageDataTemp,
          }
        }
      }
    },
    handelDelWaterDataList(state, { payload }) {
      const {waterpotManageData} = state
      const waterpotManageDataTemp = _.cloneDeep(waterpotManageData)
      for(const pk of payload.pks) {
        for(let i=0; i < waterpotManageDataTemp.length; i+=1) {
          if(waterpotManageDataTemp[i].pk === pk) {
            waterpotManageDataTemp.splice(i, 1)
          }
        }
      }
      return {
        ...state,
        waterpotManageData: waterpotManageDataTemp,
      }
    },
    waterMetaDataHandle(state, { payload }) {
      return {
        ...state,
        waterMetaData: payload,
      };
    },
    downloadBigHandle(state) {
      return {
        ...state,
      };
    },
    handelAddWaterMetaData(state, { payload }) {
      const {waterMetaData} = state
      const waterMetaDataTemp = _.cloneDeep(waterMetaData)
      waterMetaDataTemp.unshift(payload)
      return {
        ...state,
        waterMetaData: waterMetaDataTemp,
      }
    },
    handelUpdateWaterMetaData(state, { payload }) {
      const {waterMetaData} = state
      const waterMetaDataTemp = _.cloneDeep(waterMetaData)
      for(const item of waterMetaDataTemp) {
        if(item.pk === payload.pk) {
          for(const key in payload) {
            if(Object.prototype.hasOwnProperty.call(payload, key)
            && Object.prototype.hasOwnProperty.call(item, key)){
              item[key] = payload[key]
            }
          }
        }
      }
      return {
        ...state,
        waterMetaData: waterMetaDataTemp,
      }
    },
    handelDelWaterMetaData(state, { payload }) {
      const {waterMetaData} = state
      const waterMetaDataTemp = _.cloneDeep(waterMetaData)
      for(let i=0; i < waterMetaDataTemp.length; i+=1) {
        if(waterMetaDataTemp[i].pk === payload.pk) {
          waterMetaDataTemp.splice(i, 1)
          return {
            ...state,
            waterMetaData: waterMetaDataTemp,
          }
        }
      }
    },
  },
};
