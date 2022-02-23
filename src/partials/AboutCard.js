import React from "react";

const AboutCard = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={
        "relative flex flex-col bg-white px-3 py-2 justify-between min-w-40 " +
        props.className
      }
    >
      {props.children}
    </div>
  );
});

//bg-gradient-to-r from-green-500 to-yellow-400

export default AboutCard;
