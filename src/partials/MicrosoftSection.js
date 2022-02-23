import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition.js";
import AboutCard from "./AboutCard";
import MediaQuery from "react-responsive";
import { IoIosArrowForward } from "react-icons/io";

function MicrosoftSection() {
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

        <div>
          <MediaQuery maxWidth={1149}> 
          <AboutCard
              className="flex flex-wrap w-full mt-10 mb-10 text-left left-align items-start shadow-none"
              data-aos="fade-left"
            >
              <div
                className="flex flex-wrap relative w-full justify-center text-left px-4 sm:px-6 "
                data-aos="fade-left"
              >
                <div className="text-left pt-12 md:pt-20">
                  {/* Section header */}
                  <div className="flex flex-wrap w-full text-left pb-5 md:pb-16 pl-5 pr-8">
                    <h1 className="h2 mb-4 sm: pb-0 text-gray-800 ">
                      We are a Microsoft Accelerated Startup
                    </h1>
                    <p className="p2 font-medium leading-relaxed text-lg text-gray-400 pt-5">
                      We are proud to be recognized by Microsoft as a leading
                      technology company in retail and eCommerce, helping
                      companies build better products through our powerful
                      product analytics solutions.
                    </p>
                  </div>

                  <div className="mx-auto w-full flex mt-5 ml-50 p-3 pb-12" data-aos="fade-right">
                    <div className="flex w-full justify-center items-center">
                      <img
                        className="w-full h-auto rounded object-contain opacity-40"
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FMS-BLACK.webp?alt=media&token=3173136a-cb08-4858-b713-4b14b1ab6b5a"
                        }
                        alt="pondr-ms-startups-logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-grow pl-10" data-aos="fade-right">
                <a href="https://startups.microsoft.com/en-us/blog/pondr">
                  <button
                    className="flex flex-row ml-50 align-middle items-center justify-center w-auto p-2 pl-5 bg-black font-bold rounded-3xl text-white text-left pr-3"
                    data-aos="fade-right"
                  >
                    View announcement
                    <IoIosArrowForward
                      size="18px"
                      className="ml-3 align-middle justify-center items-center"
                    />{" "}
                  </button>
                </a>
              </div>
            </AboutCard>
            </MediaQuery>

            <MediaQuery minWidth={1150}>
            <AboutCard
              className="w-3/4 mt-10 mb-10 mx-auto justify-center text-center align-center shadow-none"
              data-aos="fade-left"
            >
              <div
                className="justify-center text-center align-center max-w-4xl mx-auto px-4 sm:px-6 "
                data-aos="fade-left"
              >
                <div className="pt-12 md:pt-20">
                  {/* Section header */}
                  <div className="max-w-4xl mx-auto text-center pb-20 md:pb-16">
                    <h1 className="h2 mb-4 sm: pb-0 text-gray-800 ">
                      We are a Microsoft Accelerated Startup
                    </h1>
                    <p className="p2 font-medium leading-relaxed text-xl text-gray-400 mb-10 pt-5">
                      We are proud to be recognized by Microsoft as a leading
                      technology company in retail and eCommerce, helping
                      companies build better products through our powerful
                      product analytics solutions.
                    </p>
                  </div>

                  <div className="w-full flex mt-5 ml-50" data-aos="fade-right">
                    <div className="flex w-full justify-center -mt-20 mb-10">
                      <img
                        className="w-3/5 h-auto rounded object-contain opacity-40"
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FMS-BLACK.webp?alt=media&token=3173136a-cb08-4858-b713-4b14b1ab6b5a"
                        }
                        alt="pondr-ms-startups-logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-grow m-auto" data-aos="fade-right">
                <a href="https://startups.microsoft.com/en-us/blog/pondr">
                  <button
                    className="flex flex-row ml-50 align-middle items-center justify-center w-auto p-2 pl-5 bg-black font-bold rounded-3xl text-white text-left pr-3 hover:bg-blue-pondr"
                    data-aos="fade-right"
                  >
                    View announcement
                    <IoIosArrowForward
                      size="18px"
                      className="ml-3 align-middle justify-center items-center"
                    />{" "}
                  </button>
                </a>
              </div>
            </AboutCard>
            </MediaQuery>

            </div>
      </section>
    </html>
  );
}

export default MicrosoftSection;
