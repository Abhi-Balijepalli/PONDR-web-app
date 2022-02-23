// This is the first step of the CheckoutSession
import React from "react";
import * as FaIcons from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";

// Creates the component
const CheckoutStep1 = ({ productName, price, features, onNextClick }) => {
  // Returns the UI
  return (
    <div
      className={"w-full flex flex-col justify-center items-center"}
      data-aos="fade-right"
    >
      <div className={"w-4/5 p-6 bg-white rounded-xl shadow-xl flex flex-col"}>
        <p className={"text-3xl ml-5 font-semibold"}>
          {"Single Product Analysis"}
        </p>
        <div
          className={
            "w-11/12 self-center bg-gray-light rounded-xl px-16 pb-5 mt-10 mb-10"
          }
        >
          <div className={"flex w-full justify-between items-center mt-5"}>
            <p className={"text-4xl font-bold text-blue-pondr"}>
              {productName === "NO_PRODUCT" ? "Unlimited Products" : productName}
            </p>
            <div className={"text-blue-pondr flex items-start"}>
              <span className={"font-medium text-xl self-start pt-3"}>$</span>
              <span className={"font-bold text-5xl self-center"}>{price}</span>
              <span className={"font-medium text-xl self-end pb-5"}>
                &nbsp;/&nbsp;Month
              </span>
            </div>
          </div>
          <div className={"w-full flex flex-wrap items-center mt-16 pl-32"}>
            {features.map((eachFeature, index) => (
              <div key={index} className={"flex items-center w-1/2 pr-5 mb-6"}>
                {eachFeature.included ? (
                  <FaIcons.FaCheck color={"#3DD598"} size={35} />
                ) : (
                  <AiFillLock size={35} color={"#DFDFDF"} />
                )}
                <p
                  className={
                    eachFeature.included
                      ? "font-medium text-xl ml-5"
                      : "text-gray-300 font-medium text-xl ml-5"
                  }
                >
                  {eachFeature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          onNextClick();
        }}
        className={
          "outline-none mt-10 text-2xl focus:outline-none rounded-full shadow-xl border-0 px-12 py-5 flex items-center justify-center bg-blue-pondr btn text-white hover:bg-purple-light hover:text-blue-pondr self-center"
        }
      >
        Next
      </button>
    </div>
  );
};

// Exports the component
export default CheckoutStep1;
