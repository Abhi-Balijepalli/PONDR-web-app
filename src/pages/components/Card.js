import React from 'react';

const Card = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={'relative flex flex-col w-full p-6 bg-white rounded-lg shadow-md justify-center ' + props.className}>
      {props.children}
    </div>
  );
});

export default Card;
