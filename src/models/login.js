import { routerRedux } from "dva";
import storage from '@/utils/storage';
import * as userServices from '@/services/user';
import { delay } from '@/utils/utils';


const initialState = {
  status: undefined,
  redirectUrl: ''
};
export default {
  namespace: 'login',
  state: initialState,

  effects: {
    *fakeLogin(actions, { call, put}){
      const fakeResponse = { currentAuthority: 'user', access_token: '12345'};
      yield call(delay, 3000);// Delay 3 s
      if (fakeResponse) {
        const { access_token, currentAuthority } = fakeResponse;
        if (access_token && currentAuthority) {
          storage.setJwtToken(access_token);
          storage.setAuthority(currentAuthority);
        }
      }
      const loginStatus = !!(fakeResponse && fakeResponse.access_token);
      yield put({
        type: 'saveLoginStatus',
        status: loginStatus
      });
      return loginStatus;
    },
    *login({ payload }, { put, call }) {
      const response = yield call(userServices.login, payload);
      if (response) {
        const { access_token, currentAuthority } = response;
        if (access_token && currentAuthority) {
          storage.setJwtToken(access_token);
          storage.setAuthority(currentAuthority);
        }
      }
      yield put({
        type: 'saveLoginStatus',
        status: !!(response && response.access_token)
      });

    },
    *logout(actions, { put }) {
      storage.setJwtToken(null);
      storage.setAuthority(null);
      yield put({
        type: 'reset'
      });
      yield put(routerRedux.push('/'));
    }
  },

  reducers: {
    saveRedirectPath(state, action) {
      return {
        ...state, redirectUrl: action.redirectUrl || '/'
      };
    },
    saveLoginStatus(state, action) {
      const { status } = action;
      return {
        ...state,
        status
      };
    },
    reset(state) {
      return {
        ...state,
        ...initialState
      }
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user/login') {
          dispatch({ type: 'saveRedirectPath', redirectUrl: decodeURIComponent(query.redirectUrl) });
        }
      });
    },
  },
};
