import React from 'react';
import { Redirect } from 'dva/router';
import { connect } from 'dva';
import storage from '@/utils/storage';

export default connect(({ login }) => ({
  login
}))((props) => {
  const { login } = props;

  if (!storage.getAuthority()) {
    return <>{props.children}</>;
  }
  const redirectPath = login.redirectPath || '/';
  return <Redirect to={redirectPath} />;

});
