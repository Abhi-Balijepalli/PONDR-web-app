import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import MediaQuery from "react-responsive";

function Join() {
  return (
    <section>
      <div>
        <MediaQuery maxWidth={1149}>
          <div
            className="flex flex-grow p-4 justify-center align-middle items-center w-full mx-auto"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-analyze.gif?alt=media&token=4fa124eb-119a-4901-b226-528c79680190"
              }
              alt="pondr-gif"
              className="w-11/12 shadow-2xl rounded-lg"
            />
          </div>
          <div className="flex flex-wrap relative w-full pt-10 px-4 ">
            <div className="flex flex-wrap w-full ">
              {/* Section header */}
              <div className="flex flex-wrap justify-between pl-5 pr-10">
                <p className="p2 text-base text-left text-blue-pondrpurple font-bold pb-5">
                  EASY SETUP
                </p>
                <h1 className="h2 mb-4 sm: pb-0 text-gray-800 text-left">
                  Get going with the click of a button.
                </h1>
                <div className=" max-w-3xl text-left pb-10 md:pb-20">
                  <p className="p2 text-lg text-base text-left text-gray-500 leading-relaxed pt-3">
                    {" "}
                    We do the hard work of analyzing all of your reviews, no
                    matter the number. Just give us your your product's name and
                    eCommerce link, and we will do the rest. You can add
                    multiple products, including your competitors.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery minWidth={1150}>
          <div
            className="flex w-1/2 float-right ml-20 pl-10 mt-5"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-analyze.gif?alt=media&token=4fa124eb-119a-4901-b226-528c79680190"
              }
              alt="pondr-gif"
              className="w-10/12 shadow-2xl rounded-lg"
            />
          </div>
          <div className="max-w-3xl p-4 items-end justify-end right-align h-1/2">
            <div className="h-1/2 md:py-10">
              {/* Section header */}
              <div className="right-align justify-end items-end ml-20">
                <p className="p2 text-base text-left text-blue-pondrpurple font-bold pb-5 ml-20 ">
                  EASY SETUP
                </p>
                <h1 className="h2 mb-4 sm: pb-0 text-gray-800 text-left ml-20">
                  Get going with the click of a button.
                </h1>
                <div className=" max-w-3xl text-left pb-10 md:pb-20  ml-20">
                  <p className="p2 text-xl text-base text-left text-gray-500 leading-relaxed pt-3">
                    {" "}
                    We do the hard work of analyzing all of your reviews, no
                    matter the number. Just give us your your product's name and
                    eCommerce link, and we will do the rest. You can add
                    multiple products, including your competitors.{" "}
                  </p>
                  <div className="flex flex-grow pt-10">
                    <a href="/enterprise/create-product">
                      <button className="flex flex-row align-middle items-center justify-center w-auto p-2 pl-5 bg-blue-pondrpurple font-bold rounded-3xl text-white text-left left-align pr-3 hover:bg-blue-pondr">
                        Analyze your product
                        <IoIosArrowForward
                          size="18px"
                          className="ml-3 align-middle justify-center items-center"
                        />{" "}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    </section>
  );
}

export default Join;
