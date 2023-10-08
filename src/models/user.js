import {
  queryUserInfo,
  queryUsers,
  login,
  register,
} from '../services/user';

export default {

  namespace: 'user',

  state: {
    user: {},
    userList: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchUser(_, { call, put }) {
      const response = yield call(queryUserInfo);
      yield put({
        type: 'savetUser',
        payload: response,
      });
      return response;
    },
    *fetchUserList(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: {
          userList: response.data,
        },
      });
      return response;
    },
    *createUser(_, { call, put }) {
      const response = yield call(register);
      return response;
    },
    *login(_, { call, put }) {
      const response = yield call(login);
      return response;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveUser(state, action) {
      return {
        ...state,
        user: action.payload.data,
      };
    },
  },

};
