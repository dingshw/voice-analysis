import { queryTestModel, queryTestConditions, queryLayingSchemes, queryScaleCondition } from '../services/scalemodel';

export default {
  namespace: 'scalemodel',

  state: {
    testModel: [],
    testConditions: [],
    layingSchemes: [],
    scaleCondition: {},
  },

  effects: {
    *getTestModel(_, { call, put }) {
      const response = yield call(queryTestModel);
      if(response){
        const data = response.data || []
        yield put({
          type: 'changeTestModel',
          payload: data,
        });
      }
    },
    *getTestConditions(_, { call, put }) {
      const response = yield call(queryTestConditions);
      if(response) {
        const data = response.data || []

        yield put({
          type: 'changeTestConditions',
          payload: data,
        });
      }
    },
    *getLayingSchemes(_, { call, put }) {
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
  },
};
