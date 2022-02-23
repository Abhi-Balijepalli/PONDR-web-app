import React from 'react';

const Card3 = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={'relative flex flex-col w-full shadow-xl p-6 pl-30 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-lg justify-center mr-10 ' + props.className}>
      {props.children}
    </div>
  );
});

export default Card3;
