import React from 'react';

const Card2 = React.forwardRef((props, ref) => {
    const struct = " flex flex-col w-full h-full shadow-xl p-6 pl-30 rounded-xl justify-center mr-10 "
  return (
    <div ref={ref} className={props.isGreen ? struct + "bg-gradient-to-r from-yellow-500 to-orange-500 shadow-xl" : props.isBlue ? struct + "bg-gradient-to-r from-purple-600 to-blue-400 shadow-xl" : props.isRed ? struct + "bg-gradient-to-r from-purple-600 to-indigo-500" : struct + ' bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl ' + props.className}>
      {props.children}
    </div>
  );
});

export default Card2;
