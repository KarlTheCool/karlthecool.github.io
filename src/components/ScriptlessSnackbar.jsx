/* eslint-disable jsx-a11y/label-has-associated-control */
import "./ScriptlessSnackbar.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";

const ScriptlessSnackbar = (props) => {
  const { children } = props;
  const [id] = useState(() => uniqueId("scriptlessnackbar-"));
  return (
    <>
      <input
        aria-label="message visible"
        className="action_input"
        type="checkbox"
        id={id}
      />
      <div aria-label="message" className="ScriptlessSnackbar">
        <div className="body">{children}</div>
        <div className="actions">
          <label className="action_label" htmlFor={id}>
            Cool, Thanks!
          </label>
        </div>
      </div>
    </>
  );
};

ScriptlessSnackbar.propTypes = {
  children: PropTypes.node,
};

ScriptlessSnackbar.defaultProps = {
  children: null,
};

export default ScriptlessSnackbar;
