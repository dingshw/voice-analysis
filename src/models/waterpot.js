import { queryBigSampleData, queryBigTestData, queryBigTestSystemsData, queryWaterpotData } from '../services/waterpot';

export default {
  namespace: 'waterpot',

  state: {
    bigSampleData: [],
    bigTestData: [],
    bigTestSystemsData: [],
    waterpotData: {},
  },

  effects: {
    *getBigSampleData(_, { call, put }) {
      const response = yield call(queryBigSampleData);
      if(response){
        const data = response.data || []
        yield put({
          type: 'changeBigSampleData',
          payload: data,
        });
      }
    },
    *getBigTestData(_, { call, put }) {
      const response = yield call(queryBigTestData);
      if(response) {
        const data = response.data || []

        yield put({
          type: 'changeBigTestData',
          payload: data,
        });
      }
    },
    *getBigTestSystemsData(_, { call, put }) {
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
  },
};
