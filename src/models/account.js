import { user, login } from '@/services/user';

/**
 * @author hmy
 */
export default {
  namespace: 'account',

  state: {
    user: {},
  },

  reducers: {
    user(state, { payload }) {
      return {
        ...state,
        user: payload,
      };
    },
  },

  effects: {
    *userRemote(_, { call, put }) {
      const response = yield call(user);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'user',
          payload: resp,
        });
      }
    },
    *login({ payload ,callback}, { call, put }) {
      const response = yield call(login, payload);
      console.log(response);

      if (response) {
        const { resp } = response;
        wx.setStorageSync('token', resp.token);
        console.log(resp.token);
        if(callback){
          callback()
        }
      }
    },

    logout: [
      function* ({ payload = {} }, { put, call }) {
        const { tokenInvalid } = payload;
        if (tokenInvalid) {
          // token失效跳转到用户中心,token跳转需带上appId以便登录成功后能正确从用户中心跳回
          // if(isProduction()){
          //   window.location.replace(
          //     isProduction()
          //       ? `${getLoginUrl()}?appId=TASK`
          //       : 'http://localhost:8001/#/user/login?appId=TASK'
          //   );  
          // }
        } else {
          // 若是用户主动退出登录则直接跳转到用户中心登录页面
          // const response = yield call();
        }
      },
      { type: 'throttle', ms: 3000 },
    ],
  },
};
