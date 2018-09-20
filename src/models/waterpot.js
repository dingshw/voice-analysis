import _ from 'lodash'
import { queryBigSampleData, queryBigTestData, queryBigTestSystemsData,
  queryWaterpotData, queryWaterpotManageData, queryUpdateBigTestData,
  queryAddBigTestData, queryDelBigTestData,
  queryUpdateBigTestSystemsData, queryAddBigTestSystemsData, queryDelBigTestSystemsData } from '../services/waterpot';

export default {
  namespace: 'waterpot',

  state: {
    bigSampleData: [],
    bigTestData: [],
    bigTestSystemsData: [],
    waterpotData: {},
    waterpotManageData: [],
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
    *updateBigTestData({ payload }, { call, put }) {
      const response = yield call(queryUpdateBigTestData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelUpdateBigTest',
          payload: data,
        });
      }
    },
    *addBigTestData({ payload }, { call, put }) {
      const response = yield call(queryAddBigTestData, payload)
      if(response) {
        const data = response.data || []
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
        const data = response.data || []
        yield put({
          type: 'handelUpdateBigTestSystems',
          payload: data,
        });
      }
    },
    *addBigTestSystemsData({ payload }, { call, put }) {
      const response = yield call(queryAddBigTestSystemsData, payload)
      if(response) {
        const data = response.data || []
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
        if(item.name === payload.oldName) {
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
      bigTestDataTemp.push(payload)
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
        if(item.name === payload.oldName) {
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
      bigTestSystemsDataTemp.push(payload)
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
  },
};
