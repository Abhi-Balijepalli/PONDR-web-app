import React from "react";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={
        props.disabled
          ? "btn text-white bg-gray-400 hover:bg-gray-400 outline-none " + props.className
          : "btn text-white bg-blue-pondr hover:bg-blue-pondrdark outline-none " +
            props.className
      }
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
