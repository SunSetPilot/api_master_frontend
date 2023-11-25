import {
  queryProjectList,
  queryProjectDetail,
  createProject,
  updateProject,
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
      const response = yield call(queryProjectDetail, payload);
      return response;
    },
    *createProject({ payload }, { call, put }) {
      const response = yield call(createProject, payload);
      return response;
    },
    *updateProject({ payload }, { call, put }) {
      const response = yield call(updateProject, payload);
      return response;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
