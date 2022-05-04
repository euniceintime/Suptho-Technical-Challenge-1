import React from 'react';
import PropTypes from 'prop-types';

function PlaintextEditor({ file, write }) {
  console.log(file, write);
  return (
    <div className={css.editor}>
      <h3>TODO</h3>
      <i>text/plain</i>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
