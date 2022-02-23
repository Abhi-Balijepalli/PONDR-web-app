import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticlesBg from "particles-bg";
import MediaQuery from "react-responsive";
import MetricsCounter from "./MetricsCounter"

function HeroHome() {
  return (
    <div>
      <MediaQuery maxWidth={1149}>
        <div className="flex flex-wrap m-auto align-center justify-items-center text-center w-full pt-20 pl-10 pr-10">
          {/* Hero content */}
          <ParticlesBg
            color="#DCDCDC"
            num={80}
            type="cobweb"
            bg={true}
            className="mt-10"
          />
          <div className="p m-auto text-4xl pt-16 -mt-5 pb-12 md:pt-40 md:pb-20">
            <div
              className="text-left sm:text-5xl font-bold leading-tighter tracking-tighter mb-4 pb-5 text-center"
              data-aos="zoom-y-out"
            >
              Intelligent Product Analytics with{" "}
              <span className="text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-400">
                Pondr.
              </span>
            </div>

            <div
              className="w-full flex justify-center align-center"
              data-aos="fade-left"
            >
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fgraph-1.webp?alt=media&token=15421841-19ed-4154-af27-5983979b4448"
                }
                className="shadow-2xl rounded-xl w-full"
                alt="pondr-dashboard"
              />
            </div>
            <div className="m-auto max-w-2xl flex flex-col pt-10">
              <div
                className="p2 text-left text-xl text-gray-500 pb-10 text-center"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Retail and eCommerce companies around the world use Pondr's
                product analytics and feedback tools to unlock the full
                potential of their customer reviews and build better products.
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </MediaQuery>

      <MediaQuery minWidth={1150}>
        <section className="flex flex-row items-center justify-evenly w-full my-32">
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            ></meta>
          </head>

          <ParticlesBg color="#E0E0E0" num={150} type="cobweb" bg={true} />
          <div className="flex flex-wrap w-1/2">
            {/* Hero content */}

            <div className="p float-left pl-20">
              <div
                className="text-left h1 mr-5 font-bold leading-tighter tracking-tighter mb-4 pb-5"
                data-aos="zoom-y-out"
              >
                Intelligent Product Analytics with{" "}
                <span className="text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-400">
                  Pondr.
                </span>
              </div>

              <div className="text-left max-w-2xl flex flex-col">
                <div
                  className="p2 text-left text-xl font-medium mr-10 text-gray-400 pb-10 leading-relaxed"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Retail and eCommerce companies around the world use Pondr's
                  product analytics and feedback tools to unlock the full
                  potential of their customer reviews and build better products.
                </div>
                <div
                  className="max-w-xl justify-left pt-5 items-left sm:max-w-none hidden sm:flex sm:justify-center self-start"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div className={"justify-left items-start align-left mb-5 mr-3"}>
                    <Link
                      to="/enterprise/create-product"
                      className="focus:outline-none button-large p-2 pr-5 pl-5 align-left text-left text-white justify-start md:text-xl border-blue-pondr rounded-3xl bg-black hover:bg-blue-pondr w-full sm:w-auto"
                    >
                      <strong>Get Started</strong>
                    </Link>
                  </div>
                  <div className="rounded-3xl">
                    <Link
                      to="/demo"
                      className="button-large p-2 md:text-xl mx-left align-left text-left text-black justify-start rounded-3xl bg-transparent hover:text-blue-pondr w-full"
                    >
                      <strong>Try Our Demo</strong>
                    </Link>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center" data-aos="fade-left">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fgraph-1.webp?alt=media&token=15421841-19ed-4154-af27-5983979b4448"
              }
              className="shadow-2xl rounded-xl w-11/12"
              alt="pondr-dashboard"
            />
          </div>
        </section>
      </MediaQuery>
    </div>
  );
}

export default HeroHome;
