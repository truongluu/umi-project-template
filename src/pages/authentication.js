/**
 * Routes:
 * - ./src/components/Security/Authentication.js
 */
import React from 'react';
import { connect } from 'dva';

export default connect()(function(props) {
  const handleLogout = () => {
    const { dispatch } = props;
    dispatch({
      type: 'login/logout'
    });
  }

  return (
    <p>
      The page need authentication<br/>
      <button onClick={handleLogout}>Logout</button>
    </p>
  );
});
