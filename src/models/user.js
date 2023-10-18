import {
  queryUserInfo,
  queryUsers,
  login,
  register,
} from '../services/user';

export default {

  namespace: 'user',

  state: {
    isLoggedIn: false,
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
    *createUser({ payload }, { call, put }) {
      const response = yield call(register, payload);
      return response;
    },
    *loginUser({ payload }, { call, put }) {
      const response = yield call(login, payload);
      return response;
    },
    *login(_, { call, put }) {
      yield put({
        type: 'login'
      });
    }
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
    login(state, action) {
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload
      };
    },
    logout(state, action) {
      return {
        ...state,
        isLoggedIn: false,
        ...action.payload
      };
    }
  },

};
