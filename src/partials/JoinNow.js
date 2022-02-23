import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition.js";
import AboutCard from "./AboutCard";
import MediaQuery from "react-responsive";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function JoinNow() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <section className="relative" data-aos="fade-left">
        {/* Section background (needs .relative class on parent and next sibling elements) */}

        <div>
          <MediaQuery maxWidth={1149}>
            <AboutCard
              className="w-full mt-24 mb-10 pb-10 mx-auto justify-center bg-gradient-to-r from-orange-500 to-red-400 align-center"
              data-aos="fade-left"
            >
              <div
                className="flex flex-wrap relative w-full pl-10 max-w-4xl px-10 sm:px-6 "
                data-aos="fade-left"
              >
                <div className="flex flex-wrap relative w-full text-left pt-12 md:pt-20">
                  {/* Section header */}
                  <div className="flex flex-wrap w-full text-left pb-10 md:pb-16">
                    <h1 className="h2 mb-4 sm: pb-0 text-white ">
                      Get started for free.
                    </h1>
                    <p className="p2 text-left font-medium leading-relaxed text-lg text-white pt-3">
                      Accelerate your product growth today! Use our platform
                      completely free for 30-days.
                    </p>
                    <div className="flex flex-grow pt-10" data-aos="fade-right">
                      <Link to={"/enterprise/create-product"}>
                        <button
                          className="flex flex-row w-auto p-2 pl-5 font-bold rounded-3xl text-white border-2 border-white text-left pr-3"
                          data-aos="fade-right"
                        >
                          Start your journey
                          <IoIosArrowForward
                            size="18px"
                            className="ml-3 mt-1 align-middle justify-center items-center"
                          />{" "}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AboutCard>
          </MediaQuery>

          <MediaQuery minWidth={1150}>
            <AboutCard
              className="w-3/4 mt-40 mb-10 pb-10 mx-auto justify-center bg-gradient-to-r from-orange-500 to-red-400 align-center rounded-2xl "
              data-aos="fade-left"
            >
              <div
                className="justify-center align-center pl-10 max-w-4xl px-10 sm:px-6 "
                data-aos="fade-left"
              >
                <div className="pt-12 pl-10 md:pt-20">
                  {/* Section header */}
                  <div className="max-w-4xl text-left pb-20 md:pb-16">
                    <h1 className="h2 mb-4 sm: pb-0 text-white ">
                      Get started for free.
                    </h1>
                    <p className="p2 text-left font-medium leading-relaxed text-xl text-white pt-3">
                      Accelerate your product growth today! Use our platform
                      completely free for 30-days.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-grow ml-12" data-aos="fade-right">
                <Link to={"/enterprise/create-product"}>
                  <button
                    className="flex flex-row w-auto p-2 pl-5 font-bold rounded-3xl text-white border-2 border-white text-left pr-3"
                    data-aos="fade-right"
                  >
                    Start your journey
                    <IoIosArrowForward
                      size="18px"
                      className="ml-3 mt-1 align-middle justify-center items-center"
                    />{" "}
                  </button>
                </Link>
              </div>
            </AboutCard>
          </MediaQuery>
        </div>
      </section>
    </html>
  );
}

export default JoinNow;
