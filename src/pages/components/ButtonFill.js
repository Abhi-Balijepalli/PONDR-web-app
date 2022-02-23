import React from "react";

const ButtonFill = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={
        props.disabled
          ? "btn text-black -p-3 w-full rounded-4xl bg-white border-gray-400 border-2 " +
            props.className
          : "btn text-black -p-3 w-full rounded-4xl bg-white border-gray-400 hover:bg-blue-pondr hover:border-blue-pondr border-2 focus:outline-none " +
            props.className
      }
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonFill;
