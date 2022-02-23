import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Transition from "../utils/Transition.js";

function Dropdown({ children, title, className, openOnHover }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <li
      className="w-full relative z-50"
      onMouseEnter={() => {
        if (openOnHover) {
          setDropdownOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (openOnHover) {
          setDropdownOpen(false);
        }
      }}
      onClick={() => setDropdownOpen(!dropdownOpen)}
      aria-expanded={dropdownOpen}
    >
      <a
        className="text-black hover:text-blue-pondr px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out outline-none text-md"
        href="#0"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        {title}
        <svg
          className="w-3 h-3 fill-current ml-2 text-gray-600 cursor-pointer ml-1 flex-shrink-0 text-black hover:text-blue-pondr"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" />
        </svg>
      </a>
      <Transition
        show={dropdownOpen}
        tag="ul"
        className={
          "origin-top-right top-full w-full py-2 ml-4 rounded " + className
        }
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        {children}
      </Transition>
    </li>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
  title: PropTypes.string.isRequired,
};
