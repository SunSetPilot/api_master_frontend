import {
  queryAPIList,
  queryAPIDetail,
  createAPI,
  updateAPI,
  deleteAPI,
  batchImportAPI,
} from '../services/api';

export default {

  namespace: 'api',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchAPIList({ payload }, { call, put }) {
      const response = yield call(queryAPIList, payload);
      return response;
    },
    *fetchAPIDetail({ payload }, { call, put }) {
      const response = yield call(queryAPIDetail, payload);
      return response;
    },
    *createAPI({ payload }, { call, put }) {
      const response = yield call(createAPI, payload);
      return response;
    },
    *updateAPI({ payload }, { call, put }) {
      const response = yield call(updateAPI, payload);
      return response;
    },
    *deleteAPI({ payload }, { call, put }) {
      const response = yield call(deleteAPI, payload);
      return response;
    },
    *batchImportAPI({ payload }, { call, put }) {
      const response = yield call(batchImportAPI, payload);
      return response;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
