import {
  queryProjectList,
  queryProjectDetail
} from '../services/project';

export default {

  namespace: 'project',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchProjectList(_, { call, put }) {
      const response = yield call(queryProjectList);
      return response;
    },
    *fetchProjectDetail({ payload }, { call, put }) {
      const response = yield call(queryProjectDetail);
      return response;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
