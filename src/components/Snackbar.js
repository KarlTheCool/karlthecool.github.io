import './Snackbar.scss';
import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId';

const Snackbar = (props) => {
  const { children } = props;
  const [id] = useState(() => uniqueId('snackbar-'));
  return (
    <>
      <input className="action_input" type="checkbox" id={id} />
      <div className="Snackbar">
        <div className="body">
          {children}
        </div>
        <div className="actions">
          <label className="action_label" htmlFor={id}>
            Cool, Thanks!
          </label>
        </div>
      </div>
    </>
  );
};

export default Snackbar;