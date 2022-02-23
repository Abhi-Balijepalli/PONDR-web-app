import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import AboutCard from "./AboutCard";
import { FaBolt } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import MediaQuery from "react-responsive";

const FeaturesHome = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
              className="absolute inset-0 bg-blue-pondrgray pointer-events-none mb-50 text-left left-align pb-20"
              aria-hidden="true"
            />
            <div className="flex flex-wrap relative w-full px-4 pb-10 sm:px-6 text-left">
              <div className="pt-12 md:pt-20">
                <div className={"flex flex-wrap justify-between"}>
                  <div className={"w-full pr-5"}>
                    <div className="w-full pb-20 md:pb-16 text-left pl-5 pr-8 ">
                      <p className="p2 text-base text-left text-pink-500 font-bold pb-5">
                        FEATURES
                      </p>
                      <h1 className="h2 mb-4 sm: pb-0 text-white">
                        The complete product analytics and feedback solution.
                      </h1>
                      <p className="p2 text-xl text-base text-left text-gray-300 leading-relaxed pt-3">
                        {" "}
                        We turn your customer reviews into actionable insights.
                        Pinpoint specific areas of improvement in your marketing
                        strategy, customer support, or product features to
                        improve customer and brand satisfaction, guaranteed.{" "}
                      </p>
                    </div>
                    <div className="w-full flex flex-col flex-wrap pl-5 justify-between pb-5">
                      <div
                        className="flex w-full pb-5"
                        onClick={() => setSelectedImageIndex(0)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaBolt
                            className="text-orange-400 align"
                            size="20px"
                          />
                          <div className="font-bold text-lg text-gray-600 ml-8 -mt-5 text-left">
                            {" "}
                            GPT-3 Q & A
                          </div>
                        </AboutCard>
                      </div>
                      <div
                        className="flex w-full pb-5"
                        onClick={() => setSelectedImageIndex(1)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaRegChartBar
                            className="text-green-400 align"
                            size="20px"
                          />
                          <div className="font-bold text-lg text-gray-600 ml-8 -mt-5 text-left pr-2">
                            {" "}
                            Interactive Report
                          </div>
                        </AboutCard>
                      </div>
                      <div
                        className="flex w-full"
                        onClick={() => setSelectedImageIndex(2)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaBalanceScale
                            className="text-pink-500 align"
                            size="20px"
                          />
                          <div className="font-bold text-lg text-gray-600 ml-8 -mt-5 text-left pr-2">
                            {" "}
                            Product Comparison
                          </div>
                        </AboutCard>
                      </div>
                      <div
                        className="flex w-full pt-5"
                        onClick={() => setSelectedImageIndex(3)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaSlidersH
                            className="text-blue-400 align"
                            size="20px"
                          />
                          <div className="font-bold text-lg text-gray-600 ml-8 -mt-5 pr-2 left">
                            {" "}
                            Categorized Reviews
                          </div>
                        </AboutCard>
                      </div>
                    </div>
                    <div
                      className={
                        "flex flex-grow mx-auto w-full pt-12 justify-center align-middle items-center "
                      }
                    >
                      <Carousel
                        className={"w-full"}
                        selectedItem={selectedImageIndex}
                        onChange={(newIndex) => setSelectedImageIndex(newIndex)}
                        showThumbs={false}
                        showStatus={false}
                      >
                        <div className={"w-full"}>
                          <img
                            className={"shadow-2xl rounded-xl"}
                            src="https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-qa.webp?alt=media&token=cf9c7fd5-0652-46f9-bfce-d14dcb71419f"
                          />
                        </div>
                        <div className={"w-full"}>
                          <img
                            className={"shadow-2xl rounded-xl"}
                            src="https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-analytics.webp?alt=media&token=1cd74aae-aaa1-4f15-b664-9d8ee8b8c9e6"
                          />
                        </div>
                        <div className={"w-full"}>
                          <img
                            className={"shadow-2xl rounded-xl"}
                            src="https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-comparison.webp?alt=media&token=5d435f4b-3e9a-4169-896b-bf5fb08c8429"
                          />
                        </div>
                        <div className={"w-full"}>
                          <img
                            className={"shadow-2xl rounded-xl"}
                            src={
                              "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-categorized.webp?alt=media&token=1a66d4e0-fd40-4b76-8aa4-f58a68cca968"
                            }
                          />
                        </div>
                      </Carousel>
                    </div>
                  </div>
                </div>
                {/* Section content */}
              </div>
            </div>
          </MediaQuery>



          <MediaQuery minWidth={1150}>
            <div
              className="absolute inset-0 bg-blue-pondrgray pointer-events-none mb-50 text-left left-align pb-20"
              aria-hidden="true"
            />
            <div className="flex flex-col relative w-full px-4 sm:px-6 text-left">
              <div className="pt-12 md:pt-20">
                <div className={"flex flex-row justify-between"}>
                  <div className={"w-1/2 pr-5"}>
                    <div className="w-full pb-32 md:pb-16 text-left pl-20">
                      <p className="p2 text-base text-left text-pink-500 font-bold pb-5">
                        FEATURES
                      </p>
                      <h1 className="h2 mb-4 sm: pb-0 text-white">
                        The complete product analytics and feedback solution.
                      </h1>
                      <p className="p2 text-xl text-base text-left text-gray-300 leading-relaxed pt-3">
                        {" "}
                        We turn your customer reviews into actionable insights.
                        Pinpoint specific areas of improvement in your marketing
                        strategy, customer support, or product features to
                        improve customer and brand satisfaction, guaranteed.{" "}
                      </p>
                    </div>
                    <div className="w-full flex flex-row flex-wrap pl-20 justify-between pb-5">
                      <div
                        className="flex w-1/2 pb-5"
                        onClick={() => setSelectedImageIndex(0)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaBolt
                            className="text-orange-400 align"
                            size="20px"
                          />
                          <div className="font-bold text-gray-600 ml-8 -mt-5 text-left">
                            {" "}
                            GPT-3 Q & A
                          </div>
                        </AboutCard>
                      </div>
                      <div
                        className="flex w-1/2 pb-5"
                        onClick={() => setSelectedImageIndex(1)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaRegChartBar
                            className="text-green-400 align"
                            size="20px"
                          />
                          <div className="font-bold text-gray-600 ml-8 -mt-5 text-left pr-2">
                            {" "}
                            Interactive Report
                          </div>
                        </AboutCard>
                      </div>
                      <div
                        className="flex w-1/2"
                        onClick={() => setSelectedImageIndex(2)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaBalanceScale
                            className="text-pink-500 align"
                            size="20px"
                          />
                          <div className="font-bold text-gray-600 ml-8 -mt-5 text-left pr-2">
                            {" "}
                            Product Comparison
                          </div>
                        </AboutCard>
                      </div>
                      <div
                        className="flex w-1/2"
                        onClick={() => setSelectedImageIndex(3)}
                      >
                        <AboutCard className="flex flex-row rounded-md pt-3 hover:bg-gray-800 cursor-pointer">
                          <FaSlidersH
                            className="text-blue-400 align"
                            size="20px"
                          />
                          <div className="font-bold text-gray-600 ml-8 -mt-5 pr-2 left">
                            {" "}
                            Categorized Reviews
                          </div>
                        </AboutCard>
                      </div>
                      <div className="flex pt-10 pb-10">
                        <a href="/demo">
                          <button className="flex flex-row align-middle items-center justify-center w-auto p-2 pl-5 bg-pink-500 font-bold rounded-3xl text-white text-left left-align pr-3 hover:bg-pink-600">
                            Try Demo
                            <IoIosArrowForward
                              size="18px"
                              className="ml-3 align-middle justify-center items-center"
                            />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      "w-1/2 pl-5 flex justify-center items-center pr-20"
                    }
                  >
                    <Carousel
                      className={"w-full"}
                      selectedItem={selectedImageIndex}
                      onChange={(newIndex) => setSelectedImageIndex(newIndex)}
                      showThumbs={false}
                      showStatus={false}
                    >
                      <div className={"w-full"}>
                        <img
                          className={"shadow-2xl rounded-xl"}
                          src="https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-qa.webp?alt=media&token=cf9c7fd5-0652-46f9-bfce-d14dcb71419f"
                        />
                      </div>
                      <div className={"w-full"}>
                        <img
                          className={"shadow-2xl rounded-xl"}
                          src="https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-analytics.webp?alt=media&token=1cd74aae-aaa1-4f15-b664-9d8ee8b8c9e6"
                        />
                      </div>
                      <div className={"w-full"}>
                        <img
                          className={"shadow-2xl rounded-xl"}
                          src="https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-comparison.webp?alt=media&token=5d435f4b-3e9a-4169-896b-bf5fb08c8429"
                        />
                      </div>
                      <div className={"w-full"}>
                        <img
                          className={"shadow-2xl rounded-xl"}
                          src={
                            "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-categorized.webp?alt=media&token=1a66d4e0-fd40-4b76-8aa4-f58a68cca968"
                          }
                        />
                      </div>
                    </Carousel>
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
