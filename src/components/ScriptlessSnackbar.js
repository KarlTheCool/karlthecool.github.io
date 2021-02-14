import './ScriptlessSnackbar.scss';
import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId';

const ScriptlessSnackbar = (props) => {
  const { children } = props;
  const [id] = useState(() => uniqueId('scriptlsessnackbar-'));
  return (
    <>
      <input aria-label="message visible" className="action_input" type="checkbox" id={id} />
      <div aria-label="message" className="ScriptlessSnackbar">
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

export default ScriptlessSnackbar;