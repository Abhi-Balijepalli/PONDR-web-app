import React from "react";
import MediaQuery from "react-responsive";
import AboutCard from "./AboutCard";
import { FaBalanceScale } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";

import { IoIosArrowForward } from "react-icons/io";
import { GiBrain } from "react-icons/gi";
import { MdTagFaces } from "react-icons/md";
import { BiGlasses } from "react-icons/bi";
import { HiTrendingUp } from "react-icons/hi";

const FeaturesHome = () => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}

        <div>
          <MediaQuery maxWidth={1149}>
            <div
              className="absolute inset-0 bg-gray-100 pointer-events-none mb-50"
              aria-hidden="true"
            />
            <div className="flex flex-wrap w-full relative px-4 sm:px-6 pb-10">
              <div className="pt-12 md:pt-20">
                <div className="max-w-4xl pb-20 md:pb-16 text-left pl-5 pr-8">
                  <p className="p2 text-base text-left text-orange-400 font-bold pb-5">
                    WHY PONDR
                  </p>
                  <h1 className="h2 mb-4 sm: pb-0 text-gray-800">
                    A formative and analytical approach to feedback.
                  </h1>
                  <p className="p2 text-lg text-base text-left text-gray-500 leading-relaxed pt-3">
                    {" "}
                    We help you get one step above the competition by extracting
                    millions of data points from your customer reviews, down to
                    the tone, voice, and emotion of what your customers are
                    saying to develop a stronger customer profile and product
                    fit for your company.{" "}
                  </p>
                </div>
                <div className="w-max flex flex-col grid-flow-col auto-cols-max pr-8">
                  <div className="flex flex-col w-max">
                    <GiBrain
                      className="text-orange-400 left-align ml-8 mb-2"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 text-left">
                      {" "}
                      Natural Language Processing
                    </div>
                    <p className="p2 text-gray-400 pt-3 leading-tight font-semibold ml-8 pb-10">
                      {" "}
                      Deduces accurate meaning behind any block of text
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <MdTagFaces
                      className="text-orange-400 left-align ml-8 mb-2"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 text-left pr-2">
                      {" "}
                      Sentiment Analysis
                    </div>
                    <p className="p2 text-gray-400 font-semibold pt-3 leading-tight ml-8 pb-10">
                      Draws out customer likes/dislikes and sentiment towards
                      features
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <BiGlasses
                      className="text-orange-400 left-align ml-8 mb-2"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 text-left pr-2">
                      {" "}
                      Competitor Insights
                    </div>
                    <p className="p2 text-gray-400 font-semibold pt-3 leading-tight ml-8 pb-10">
                      Side-by-side comparison of product trends, feature
                      sentiment, and ratings
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <HiTrendingUp
                      className="text-orange-400 left-align ml-8 mb-2"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 pr-2 left">
                      {" "}
                      Product Category Trends
                    </div>
                    <p className="p2 text-gray-400 font-semibold pt-3 leading-tight ml-8 pb-10">
                      Customer perception trend of color, size, durability,
                      taste, customer support, etc.
                    </p>
                  </div>
                </div>
                {/* Section content */}
              </div>
            </div>
          </MediaQuery>

          <MediaQuery minWidth={1150}>
            <div
              className="absolute inset-0 bg-gray-100 pointer-events-none mb-50  text-left left-align"
              aria-hidden="true"
            />
            <div className="flex flex-col relative max-w-6xl px-4 sm:px-6 text-left ml-20 pl-10">
              <div className="pt-12 md:pt-20">
                <div className="max-w-4xl pb-20 md:pb-16 text-left pl-20">
                  <p className="p2 text-base text-left text-orange-400 font-bold pb-5">
                    WHY PONDR
                  </p>
                  <h1 className="h2 mb-4 sm: pb-0 text-gray-800">
                    A formative and analytical approach to feedback.
                  </h1>
                  <p className="p2 text-xl text-base text-left text-gray-500 leading-relaxed pt-3">
                    {" "}
                    We help you get one step above the competition by extracting
                    millions of data points from your customer reviews, down to
                    the tone, voice, and emotion of what your customers are
                    saying to develop a stronger customer profile and product
                    fit for your company.{" "}
                  </p>
                </div>
                <div className="w-max grid grid-cols-4 grid-flow-row pl-12 gap-10 pb-20 auto-cols-max">
                  <div className="flex flex-col w-max">
                    <GiBrain
                      className="text-orange-400 left-align ml-8 mb-5"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 text-left">
                      {" "}
                      Natural Language Processing
                    </div>
                    <p className="p2 text-gray-400 pt-3 leading-tight  font-semibold ml-8">
                      {" "}
                      Deduces accurate meaning behind any block of text
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <MdTagFaces
                      className="text-orange-400 left-align ml-8 mb-5"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 text-left pr-2">
                      {" "}
                      Sentiment Analysis
                    </div>
                    <p className="p2 text-gray-400 font-semibold pt-3 leading-tight ml-8">
                      Draws out customer likes/dislikes and sentiment towards
                      features
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <BiGlasses
                      className="text-orange-400 left-align ml-8 mb-5"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 text-left pr-2">
                      {" "}
                      Competitor Insights
                    </div>
                    <p className="p2 text-gray-400 font-semibold pt-3 leading-tight ml-8">
                      Side-by-side comparison of product trends, feature
                      sentiment, and ratings
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <HiTrendingUp
                      className="text-orange-400 left-align ml-8 mb-5"
                      size="40px"
                    />
                    <div className="font-semibold text-lg text-gray-800 ml-8 pr-2 left">
                      {" "}
                      Product Category Trends
                    </div>
                    <p className="p2 text-gray-400 font-semibold pt-3 ml-8 leading-tight">
                      Customer perception trend of color, size, durability,
                      taste, customer support, etc.
                    </p>
                  </div>
                  <div className="flex flex-grow pt-3 pl-8">
                    <a href="/demo">
                      <button className="flex flex-grow w-full p-2 pl-5 bg-orange-400 font-bold rounded-3xl text-white text-left left-align pr-3 hover:bg-orange-600">
                        See how it works
                        <IoIosArrowForward
                          size="18px"
                          className="ml-3 mt-1 align-middle justify-center items-center"
                        />{" "}
                      </button>
                    </a>
                  </div>
                </div>
                {/* Section content */}
              </div>
            </div>
          </MediaQuery>
        </div>
      </section>
    </html>
  );
};

export default FeaturesHome;
