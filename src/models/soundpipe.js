import _ from 'lodash'
import { queryBackingData, querySampleData, querySoundPipeData,
  querySoundManageData, queryUpdateSampleData, queryAddSampleData,
  queryDelSampleData, queryUpdateBackingData, queryAddBackingData,
  queryDelBackingData, queryAddSoundData, queryDelSoundData, queryUpdateSoundData } from '../services/soundpipe';

export default {
  namespace: 'soundpipe',

  state: {
    backingData: [],
    sampleData: [],
    soundPipeData: {},
    soundManageData: [],
  },

  effects: {
    *getBackingData(___, { call, put }) {
      const response = yield call(queryBackingData);
      if(response){
        const data = response.data || []
        yield put({
          type: 'changeBackingData',
          payload: data,
        });
      }
    },
    *getSampleData(___, { call, put }) {
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
    *getSoundManageData({ payload }, { call, put }) {
      const response = yield call(querySoundManageData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'soundManageDataHandle',
          payload: data,
        });
      }
    },
    *updateSampleData({ payload }, { call, put }) {
      const response = yield call(queryUpdateSampleData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelUpdateSample',
          payload: data,
        });
      }
    },
    *addSampleData({ payload }, { call, put }) {
      const response = yield call(queryAddSampleData, payload)
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelAddSample',
          payload: data,
        });
      }
    },
    *delSampleData({ payload }, { call, put }) {
      const response = yield call(queryDelSampleData, payload);
      if(response) {
        yield put({
          type: 'handelDeleteSample',
          payload,
        });
      }
    },
    *updateBackingData({ payload }, { call, put }) {
      const response = yield call(queryUpdateBackingData, payload)
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelUpdateBacking',
          payload: data,
        });
      }
    },
    *addBackingData({ payload }, { call, put }) {
      const response = yield call(queryAddBackingData, payload)
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelAddBacking',
          payload: data,
        });
      }
    },
    *delBackingData({ payload }, { call, put }) {
      const response = yield call(queryDelBackingData, payload);
      if(response) {
        yield put({
          type: 'handelDeleteBacking',
          payload,
        });
      }
    },
    *addSoundData({ payload }, { call, put }) {
      const response = yield call(queryAddSoundData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelAddSoundData',
          payload: data,
        });
      }
    },
    *updateSoundData({ payload }, { call, put }) {
      const response = yield call(queryUpdateSoundData, payload);
      if(response) {
        // const data = response.data || []
        yield put({
          type: 'handelUpdateSoundData',
          payload,
        });
      }
    },
    *delSoundData({ payload }, { call, put }) {
      const response = yield call(queryDelSoundData, payload);
      if(response) {
        yield put({
          type: 'handelDelSoundData',
          payload,
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
    soundManageDataHandle(state, { payload }) {
      return {
        ...state,
        soundManageData: payload,
      };
    },
    handelUpdateSample(state, { payload }) {
      const {sampleData} = state
      const sampleDataTemp = _.cloneDeep(sampleData)
      for(const item of sampleDataTemp) {
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
        sampleData: sampleDataTemp,
      }
    },
    handelAddSample(state, { payload }) {
      const {sampleData} = state
      const sampleDataTemp = _.cloneDeep(sampleData)
      sampleDataTemp.push(payload)
      return {
        ...state,
        sampleData: sampleDataTemp,
      }
    },
    handelDeleteSample(state, { payload }) {
      const {sampleData} = state
      const sampleDataTemp = _.cloneDeep(sampleData)
      for(let i=0; i < sampleDataTemp.length; i+=1) {
        if(sampleDataTemp[i].pk === payload.pk) {
          sampleDataTemp.splice(i, 1)
          return {
            ...state,
            sampleData: sampleDataTemp,
          }
        }
      }
    },
    handelUpdateBacking(state, { payload }) {
      const {backingData} = state
      const backingDataTemp = _.cloneDeep(backingData)
      for(const item of backingDataTemp) {
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
        backingData: backingDataTemp,
      }
    },
    handelAddBacking(state, { payload }) {
      const {backingData} = state
      const backingDataTemp = _.cloneDeep(backingData)
      backingDataTemp.push(payload)
      return {
        ...state,
        backingData: backingDataTemp,
      }
    },
    handelDeleteBacking(state, { payload }) {
      const {backingData} = state
      const backingDataTemp = _.cloneDeep(backingData)
      for(let i=0; i < backingDataTemp.length; i+=1) {
        if(backingDataTemp[i].pk === payload.pk) {
          backingDataTemp.splice(i, 1)
          return {
            ...state,
            backingData: backingDataTemp,
          }
        }
      }
    },
    handelAddSoundData(state, { payload }) {
      const {soundManageData} = state
      const soundManageDataTemp = _.cloneDeep(soundManageData)
      soundManageDataTemp.push(payload)
      return {
        ...state,
        soundManageData: soundManageDataTemp,
      }
    },
    handelUpdateSoundData(state, { payload }) {
      const {soundManageData} = state
      const soundManageDataTemp = _.cloneDeep(soundManageData)
      for(const item of soundManageDataTemp) {
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
        soundManageData: soundManageDataTemp,
      }
    },
    handelDelSoundData(state, { payload }) {
      const {soundManageData} = state
      const soundManageDataTemp = _.cloneDeep(soundManageData)
      for(let i=0; i < soundManageDataTemp.length; i+=1) {
        if(soundManageDataTemp[i].pk === payload.pk) {
          soundManageDataTemp.splice(i, 1)
          return {
            ...state,
            soundManageData: soundManageDataTemp,
          }
        }
      }
    },
  },
};
