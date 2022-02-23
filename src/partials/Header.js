import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import Transition from "../utils/Transition.js";
import Dropdown from "../utils/Dropdown";

const Header = (props) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [top, setTop] = useState(true);

  const mobileNav = useRef(null);

  // close the mobile menu on click outsidemy
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNavOpen || mobileNav.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const history = useHistory();

  // Declares a variable to store the className of the header links. Also checks to see which tab is selected
  const baseHeaderClassname =
    "text-black hover:text-blue-pondr mx-3 lg:mx-5 py-2 flex items-center transition duration-150 ease-in-out outline-none text-md";
  const currentSelectedPathname = window.location.pathname;

  return (
    <header
      className={` fixed w-full z-30 md:bg-opacity-80 text-md transition duration-300 ease-in-out ${
        !top && "text-md bg-white blur shadow-lg"
      }`}
    >
      <div className="text-md max-w-6xl font-medium mx-auto px-5 sm:px-6">
        <div className="text-md flex items-center justify-between h-16 md:h-20  outline-none">
          {/* Site branding */}
          {/* Logo */}
          <Link to="/Home" className="block" aria-label="Cruip">
            <img
              className="mx-auto outline-none"
              src={
                "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FAsset%2025%402x.webp?alt=media&token=e1414add-2f42-4933-bdd5-3e236928a6ac"
              }
              width="100"
              height="40"
              alt="Hero"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="text-md hidden md:flex md:flex-grow">
            {/* Desktop menu links */}
            <ul className="flex text-md flex-grow justify-end flex-wrap items-center">
              <li>
                <Link
                  to="/Home"
                  className={
                    currentSelectedPathname === "/Home"
                      ? baseHeaderClassname +
                        " text-md font-semibold border-b-4 border-solid border-blue-pondr pb-2"
                      : baseHeaderClassname
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/demo"
                  className={
                    currentSelectedPathname === "/demo"
                      ? baseHeaderClassname +
                        " text-md font-semibold border-b-4 border-solid border-blue-pondr pb-2"
                      : baseHeaderClassname
                  }
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className={
                    currentSelectedPathname === "/pricing"
                      ? baseHeaderClassname +
                        " text-md font-semibold border-b-4 border-solid border-blue-pondr pb-2"
                      : baseHeaderClassname
                  }
                >
                  Pricing
                </Link>
              </li>

              <li className="text-md font-medium">
                <Link
                  to="/about"
                  className={
                    currentSelectedPathname === "/about"
                      ? baseHeaderClassname +
                        " text-md font-semibold border-b-4 border-solid border-blue-pondr pb-2"
                      : baseHeaderClassname
                  }
                >
                  About Us
                </Link>
              </li>

              <span className="text-md">
                <Dropdown
                  title="More Resources"
                  className={"bg-white shadow-lg absolute right-0"}
                  openOnHover={true}
                >
                  <li>
                    <Link
                      to="/contact-us"
                      className={
                        currentSelectedPathname === "/contact-us"
                          ? baseHeaderClassname +
                            " text-md font-semibold border-b-4 border-solid border-blue-pondr pb-2"
                          : baseHeaderClassname
                      }
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community"
                      className={
                        currentSelectedPathname === "/community"
                          ? baseHeaderClassname +
                            " font-semibold border-b-4 border-solid border-blue-pondr pb-2"
                          : baseHeaderClassname
                      }
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/updates"
                      className={
                        currentSelectedPathname === "/updates"
                          ? baseHeaderClassname +
                            " font-semibold border-b-4 border-solid border-blue-pondr pb-2"
                          : baseHeaderClassname
                      }
                    >
                      Updates
                    </Link>
                  </li>
                </Dropdown>
              </span>
            </ul>

            {/* Desktop sign in links */}
            {!props.auth.uid ? (
              <>
                <ul className="flex flex-grow justify-end flex-wrap items-center">
                  <li>
                    <Link
                      to="/signin"
                      className="btn-sm font-bold rounded-3xl pl-8 pr-8 text-white bg-black hover:bg-blue-pondr ml-3 focus:outline-none"
                    >
                      <span>Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/enterprise/create"
                      className="btn-sm font-bold rounded-3xl pl-8 pr-8 text-black border-black bg-transparent hover:bg-blue-pondr hover:border-white hover:text-white ml-3 focus:outline-none"
                    >
                      <span>Sign Up</span>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    to="/enterprise/product/"
                    className="btn-sm rounded-3xl font-bold pl-8 pr-8 text-white bg-black hover:bg-blue-pondr ml-3 focus:outline-none"
                  >
                    <span>Dashboard</span>
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden">
            {/* Hamburger button */}
            <button
              className={`hamburger ${
                mobileNavOpen && "active"
              } focus:outline-none`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-gray-900"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" />
                <rect y="11" width="24" height="2" />
                <rect y="18" width="24" height="2" />
              </svg>
            </button>

            {/* Mobile navigation */}
            <div ref={mobileNav}>
              <Transition
                show={mobileNavOpen}
                tag="nav"
                id="mobile-nav"
                className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white transition-all duration-300 ease-in-out"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              >
                <ul className="px-5 py-2">
                  <li>
                    <Link
                      to="/about"
                      className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community"
                      className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/updates"
                      className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
                    >
                      Updates
                    </Link>
                  </li>
                </ul>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (creds) => {
      dispatch(signOut(creds));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
