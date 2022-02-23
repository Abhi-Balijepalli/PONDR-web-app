// Component represents the main counter on the Home page
import React from "react";
import MediaQuery from "react-responsive";

// Creates the exports the component
const MetricsCounter = ({ numReviews, numAI, numProducts }) => {
  return (

    <div
      className={
        "w-full py-5 pb-20 flex flex-col md:flex-row bg-white justify-evenly"
      }
    >
      <div className={"flex flex-col justify-evenly items-center"}>
        <p
          className={"text-blue-pondrpurple text-center text-5xl font-semibold tracking-wider"}
        >
          {(numProducts + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className={"text-blue-pondrpurple text-center text-xl font-light"}>
          Products Analyzed 
        </p>
      </div>
      <div className={"md:h-0 h-5"} />
      <div className={"flex flex-col justify-evenly items-center"}>
        <p
          className={"text-blue-pondrpurple text-center text-5xl font-bold tracking-wider"}
        >
          {(numReviews + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className={"text-blue-pondrpurple text-center text-xl font-light"}>
          Reviews Analyzed
        </p>
      </div>
      <div className={"md:h-0 h-5"} />
      <div className={"flex flex-col justify-evenly items-center"}>
        <p
          className={"text-blue-pondrpurple text-center text-5xl font-bold tracking-wider"}
        >
          {(numAI + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className={"text-blue-pondrpurple text-center text-xl font-light"}>
          AI Questions Asked
        </p>
      </div>
    </div>
  );
};

// Exports the counter
export default MetricsCounter;
