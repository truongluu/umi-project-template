import React from 'react';

export default props => {
  return (
    <div>
      <h1>Basic layout</h1>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};
