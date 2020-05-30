import React from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import { Link } from 'umi';

export default connect(({ loading }) => ({ loading: loading.effects['login/fakeLogin'] }))((props) => {
  const { dispatch, loading } = props;
  const handleLogin = async () => {
    const loginResponse = await dispatch({
      type: 'login/fakeLogin'
    });
    console.log('loginResponse', loginResponse);
  }
  return <div>
    Login page
    <br />
    <Button loading={loading} onClick={handleLogin}>Login</Button><br />
    <Link to='/'>Go home</Link>
  </div>
});