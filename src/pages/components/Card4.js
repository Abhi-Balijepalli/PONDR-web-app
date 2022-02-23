import React from "react";

const Card4 = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={
        "relative flex flex-col shadow-xl drop-shadow-xl p-6 bg-white rounded-xl shadow-md justify-between min-w-40 " +
        props.className
      }
    >
      {props.children}
    </div>
  );
});

//bg-gradient-to-r from-green-500 to-yellow-400

export default Card4;
