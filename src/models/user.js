import { routerRedux } from "dva";
import * as userSerivces from '@/services/user';
import EffectWithType from "@/configs/EffectWithType";
import { delay } from '@/utils/utils';

export default {
  namespace: 'user',

  state: {
    login: false,
    currentUser: {}
  },

  effects: {
    *fetch(action, { call, put }) {
      const defaultParams = {
        fields: 'fullName, email, phone, userCode'
      };
      const response = yield call(userSerivces.getCurrent, defaultParams);
      if (response) {
        yield put({
          type: 'updateField',
          field: 'login',
          value: true
        });
        yield put({
          type: 'updateField',
          field: 'currentUser',
          value: response
        });
      }
    },
    *requestResetPassword({ payload, callback }, { call }) {
      const response = yield call(userSerivces.requestResetPassword, {
        ...payload,
        url: `${window.location.origin}#/user/update-password`
      });
      if (response) {
        if (typeof callback === 'function') {
          callback(response);
        }
      }
    },
    *changePassword({ payload, callback }, { call }) {
      const response = yield call(userSerivces.changePassword, payload);
      if (response) {
        if (typeof callback === 'function') {
          callback(response);
        }
      }
    },
    *logout(actions, { call, put }) {
      yield call(userSerivces.logout);
      yield put({
        type: 'login/logout'
      });
      yield call(delay, 50);
      yield put({
        type: 'updateField',
        field: 'login',
        value: false
      });
    },
    loginUserWatcher: [
      function* ({ take, select, put }) {
        while (true) {
          yield take('login/saveLoginStatus');
          const { status, redirectUrl } = yield select(state => state.login);
          if (status) {
            yield put({
              type: 'updateField',
              field: 'login',
              value: true
            });
            yield put(routerRedux.push(redirectUrl));
          }
        }
      },
      EffectWithType.WATCHER
    ]
  },
  reducers: {
    updateField(state, action) {
      const { field, value } = action;
      return {
        ...state,
        [field]: value
      };
    }
  }
};
