import React from "react";
import { Link } from "react-router-dom";

const WelcomeBanner = () => {
  return (
    <div
      className="w-4/5 bg-blue-pondr rounded-xl p-6 mx-auto mb-8 flex items-center justify-between"
      data-aos="fade-down"
    >
      {/* Content */}
      <div className="text-white">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-1 ">
          Welcome to Pondr Demo 👋
        </h1>
        <p>
          {" "}
          Click around the dashboard and explore all our powerful features!
        </p>
      </div>
      <div>
        <Link
          to="/enterprise/create-product"
          className="btn border-0 mx-auto align-center text-center justify-center focus:outline-none px-10 py-3 font-bold rounded-3xl text-white text-xl bg-black hover:bg-purple-light hover:text-black focus:outline-none"
        >
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeBanner;
