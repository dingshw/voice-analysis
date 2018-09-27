import _ from 'lodash'
import { queryTestModel, queryTestConditions, queryLayingSchemes,
  queryScaleCondition, queryScaleManage, queryUpdateTestModelData,
  queryAddTestModelData, queryDelTestModelData, queryUpdateTestConditions,
  queryAddTestConditions, queryDelTestConditions, queryUpdateLayingSchemes,
  queryAddLayingSchemes, queryDelLayingSchemes, queryAddScaleData, queryUpdateScaleData,
  queryDelScaleData, queryDelScaleDataList} from '../services/scalemodel';

export default {
  namespace: 'scalemodel',

  state: {
    testModel: [],
    testConditions: [],
    layingSchemes: [],
    scaleCondition: {},
    scaleManage: [],
  },

  effects: {
    *getTestModel(___, { call, put }) {
      const response = yield call(queryTestModel);
      if(response){
        const data = response.data || []
        yield put({
          type: 'changeTestModel',
          payload: data,
        });
      }
    },
    *getTestConditions(___, { call, put }) {
      const response = yield call(queryTestConditions);
      if(response) {
        const data = response.data || []

        yield put({
          type: 'changeTestConditions',
          payload: data,
        });
      }
    },
    *getLayingSchemes(___, { call, put }) {
      const response = yield call(queryLayingSchemes);
      if(response) {
        const data = response.data || []

        yield put({
          type: 'changeLayingSchemes',
          payload: data,
        });
      }
    },
    *getScaleCondition({ payload }, { call, put }) {
      const response = yield call(queryScaleCondition, payload);
      if(response) {
        const data = response.data || []
        const dataMap = {dataParam: payload, data}
        yield put({
          type: 'scaleConditionHandle',
          payload: dataMap,
        });
      }
    },
    *getScaleManageData({ payload }, { call, put }) {
      const response = yield call(queryScaleManage, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'scaleManageHandle',
          payload: data,
        });
      }
    },
    *updateTestModelData({ payload }, { call, put }) {
      const response = yield call(queryUpdateTestModelData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelUpdateTestModel',
          payload: data,
        });
      }
    },
    *addTestModelData({ payload }, { call, put }) {
      const response = yield call(queryAddTestModelData, payload)
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelAddTestModel',
          payload: data,
        });
      }
    },
    *delTestModelData({ payload }, { call, put }) {
      const response = yield call(queryDelTestModelData, payload);
      if(response) {
        yield put({
          type: 'handelDeleteTestModel',
          payload,
        });
      }
    },
    *updateTestConditions({ payload }, { call, put }) {
      const response = yield call(queryUpdateTestConditions, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelUpdateTestConditions',
          payload: data,
        });
      }
    },
    *addTestConditions({ payload }, { call, put }) {
      const response = yield call(queryAddTestConditions, payload)
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelAddTestConditions',
          payload: data,
        });
      }
    },
    *delTestConditions({ payload }, { call, put }) {
      const response = yield call(queryDelTestConditions, payload);
      if(response) {
        yield put({
          type: 'handelDeleteTestConditions',
          payload,
        });
      }
    },
    *updateLayingSchemes({ payload }, { call, put }) {
      const response = yield call(queryUpdateLayingSchemes, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelUpdateLayingSchemes',
          payload: data,
        });
      }
    },
    *addLayingSchemes({ payload }, { call, put }) {
      const response = yield call(queryAddLayingSchemes, payload)
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelAddLayingSchemes',
          payload: data,
        });
      }
    },
    *delLayingSchemes({ payload }, { call, put }) {
      const response = yield call(queryDelLayingSchemes, payload);
      if(response) {
        yield put({
          type: 'handelDeleteLayingSchemes',
          payload,
        });
      }
    },
    *addScaleData({ payload }, { call, put }) {
      const response = yield call(queryAddScaleData, payload);
      if(response) {
        const data = response.data || []
        yield put({
          type: 'handelAddScaleData',
          payload: data,
        });
      }
    },
    *updateScaleData({ payload }, { call, put }) {
      const response = yield call(queryUpdateScaleData, payload);
      if(response) {
        // const data = response.data || []
        yield put({
          type: 'handelUpdateScaleData',
          payload,
        });
      }
    },
    *delScaleData({ payload }, { call, put }) {
      const response = yield call(queryDelScaleData, payload);
      if(response) {
        yield put({
          type: 'handelDelScaleData',
          payload,
        });
      }
    },
    *delScaleDataList({ payload }, { call, put }) {
      const response = yield call(queryDelScaleDataList, payload);
      if(response) {
        yield put({
          type: 'handelDelScaleDataList',
          payload,
        });
      }
    },
  },

  reducers: {
    changeTestModel(state, { payload }) {
      return {
        ...state,
        testModel: payload,
      };
    },
    changeTestConditions(state, { payload }) {
      return {
        ...state,
        testConditions: payload,
      };
    },
    changeLayingSchemes(state, { payload }) {
      return {
        ...state,
        layingSchemes: payload,
      };
    },
    scaleConditionHandle(state, { payload }) {
      return {
        ...state,
        scaleCondition: payload,
      };
    },
    scaleManageHandle(state, { payload }) {
      return {
        ...state,
        scaleManage: payload,
      };
    },
    handelUpdateTestModel(state, { payload }) {
      const {testModel} = state
      const testModelTemp = _.cloneDeep(testModel)
      for(const item of testModelTemp) {
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
        testModel: testModelTemp,
      }
    },
    handelAddTestModel(state, { payload }) {
      const {testModel} = state
      const testModelTemp = _.cloneDeep(testModel)
      testModelTemp.push(payload)
      return {
        ...state,
        testModel: testModelTemp,
      }
    },
    handelDeleteTestModel(state, { payload }) {
      const {testModel} = state
      const testModelTemp = _.cloneDeep(testModel)
      for(let i=0; i < testModelTemp.length; i+=1) {
        if(testModelTemp[i].pk === payload.pk) {
          testModelTemp.splice(i, 1)
          return {
            ...state,
            testModel: testModelTemp,
          }
        }
      }
    },
    handelUpdateTestConditions(state, { payload }) {
      const {testConditions} = state
      const testConditionsTemp = _.cloneDeep(testConditions)
      for(const item of testConditionsTemp) {
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
        testConditions: testConditionsTemp,
      }
    },
    handelAddTestConditions(state, { payload }) {
      const {testConditions} = state
      const testConditionsTemp = _.cloneDeep(testConditions)
      testConditionsTemp.push(payload)
      return {
        ...state,
        testConditions: testConditionsTemp,
      }
    },
    handelDeleteTestConditions(state, { payload }) {
      const {testConditions} = state
      const testConditionsTemp = _.cloneDeep(testConditions)
      for(let i=0; i < testConditionsTemp.length; i+=1) {
        if(testConditionsTemp[i].pk === payload.pk) {
          testConditionsTemp.splice(i, 1)
          return {
            ...state,
            testConditions: testConditionsTemp,
          }
        }
      }
    },
    handelUpdateLayingSchemes(state, { payload }) {
      const {layingSchemes} = state
      const layingSchemesTemp = _.cloneDeep(layingSchemes)
      for(const item of layingSchemesTemp) {
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
        layingSchemes: layingSchemesTemp,
      }
    },
    handelAddLayingSchemes(state, { payload }) {
      const {layingSchemes} = state
      const layingSchemesTemp = _.cloneDeep(layingSchemes)
      layingSchemesTemp.push(payload)
      return {
        ...state,
        layingSchemes: layingSchemesTemp,
      }
    },
    handelDeleteLayingSchemes(state, { payload }) {
      const {layingSchemes} = state
      const layingSchemesTemp = _.cloneDeep(layingSchemes)
      for(let i=0; i < layingSchemesTemp.length; i+=1) {
        if(layingSchemesTemp[i].pk === payload.pk) {
          layingSchemesTemp.splice(i, 1)
          return {
            ...state,
            layingSchemes: layingSchemesTemp,
          }
        }
      }
    },
    handelAddScaleData(state, { payload }) {
      const {scaleManage} = state
      const scaleManageTemp = _.cloneDeep(scaleManage)
      scaleManageTemp.push(payload)
      return {
        ...state,
        scaleManage: scaleManageTemp,
      }
    },
    handelUpdateScaleData(state, { payload }) {
      const {scaleManage} = state
      const scaleManageTemp = _.cloneDeep(scaleManage)
      for(const item of scaleManageTemp) {
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
        scaleManage: scaleManageTemp,
      }
    },
    handelDelScaleData(state, { payload }) {
      const {scaleManage} = state
      const scaleManageTemp = _.cloneDeep(scaleManage)
      for(let i=0; i < scaleManageTemp.length; i+=1) {
        if(scaleManageTemp[i].pk === payload.pk) {
          scaleManageTemp.splice(i, 1)
          return {
            ...state,
            scaleManage: scaleManageTemp,
          }
        }
      }
    },
    handelDelScaleDataList(state, { payload }) {
      const {scaleManage} = state
      const scaleManageTemp = _.cloneDeep(scaleManage)
      for(const pk of payload) {
        for(let i=0; i < scaleManageTemp.length; i+=1) {
          if(scaleManageTemp[i].pk === pk) {
            scaleManageTemp.splice(i, 1)
          }
        }
      }
      return {
        ...state,
        scaleManage: scaleManageTemp,
      }
    },
  },
};
