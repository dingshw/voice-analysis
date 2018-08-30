import { queryBackingData, querySampleData, querySoundPipeData } from '../services/soundpipe';

export default {
  namespace: 'soundpipe',

  state: {
    backingData: [],
    sampleData: [],
    soundPipeData: {},
  },

  effects: {
    *getBackingData(_, { call, put }) {
      const response = yield call(queryBackingData);
      if(response){
        const data = response.data || []
        yield put({
          type: 'changeBackingData',
          payload: data,
        });
      }
    },
    *getSampleData(_, { call, put }) {
      const response = yield call(querySampleData);
      if(response) {
        const data = response.data || []

        yield put({
          type: 'changeSampleData',
          payload: data,
        });
      }
    },
    *getSoundPipeData({ payload }, { call, put }) {
      const response = yield call(querySoundPipeData, payload);
      if(response) {
        const data = response.data || []
        const dataMap = {dataParam: payload, data}
        yield put({
          type: 'soundPipeDataHandle',
          payload: dataMap,
        });
      }
    },
  },

  reducers: {
    changeBackingData(state, { payload }) {
      return {
        ...state,
        backingData: payload,
      };
    },
    changeSampleData(state, { payload }) {
      return {
        ...state,
        sampleData: payload,
      };
    },
    soundPipeDataHandle(state, { payload }) {
      return {
        ...state,
        soundPipeData: payload,
      };
    },
  },
};
