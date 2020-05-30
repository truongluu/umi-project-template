import React from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
import storage from '@/utils/storage';

const { LOGIN_PAGE_BASE } = process.env;

export default connect(({ user }) => ({
  login: user.login
}))((props) => {
  if (storage.getAuthority() === 'user') {
    return props.children;
  }
  let loginPath = LOGIN_PAGE_BASE || '/user/login';
  const redirectParams = [];
  if (props.location.pathname) {
    redirectParams.push(props.location.pathname);
  }
  if (props.location.search) {
    redirectParams.push(props.location.search);
  }
  loginPath = `${loginPath}?redirectUrl=${encodeURIComponent(redirectParams.join(''))}`
  return <Redirect to={loginPath} />;

});
