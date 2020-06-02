import React from 'react';
import SelectLang from '../SelectLang';

export default props => {
  return (
    <div>
      <div style={{position: 'absolute', right: 0}}>
      <SelectLang />
      </div>
      <h1>Basic layout</h1>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};
