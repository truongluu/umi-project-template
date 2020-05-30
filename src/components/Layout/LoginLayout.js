import React from 'react';

export default props => {
  return (
    <div>
      <h1>Login layout</h1>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};
