import React from 'react';
import Classes from './ArrowTextBox.module.css';

const ArrowTextBox = (props) => {
  return (
    <div class={Classes.textbox}>
      {props.children}
    </div>
  );
};

export default ArrowTextBox;
