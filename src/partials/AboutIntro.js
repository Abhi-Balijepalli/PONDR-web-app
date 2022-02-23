import React from 'react';
import AboutCard from "./AboutCard";

function AboutIntro () {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 pb-12  md:pb-20">
          {/* Section header */}
          <div
            className="text-left sm:text-5xl justify-left align-left font-bold leading-auto tracking-tighter mb-4 pb-5"
            data-aos="fade-left"
          >
            We are at the forefront of helping companies build better products.
          </div>

          <div
            className=" p2 text-gray-400 text-left sm:text-2xl justify-left align-left leading-auto tracking-tighter mb-4 pb-20"
            data-aos="fade-left"
          >
            For ecommerce and retail companies, online reviews are the ideal
            customer feedback, but have lost potential. At Pondr, we are
            building tools to allow companies to take action of the lost
            potential of their customer feedback, through our suite of advanced
            market research and analytics tools. We take away the ambiguity of
            understanding your customers, and provide a deeper level of analysis
            to allow you to build better products.
          </div>

          {/*<div className="grid grid-cols-3 mx-auto auto-cols-min gap-10 w-full">
          <div>
            <AboutCard className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <div className="h4 text-white pb-10 pt-5 text-center align-center "> Products Analyzed</div>
          <div className="h4 text-white text-5xl pb-10 text-center align-center"data-aos="zoom-in"> 211</div>
            </AboutCard>
            </div>
          <div>
            <AboutCard className="bg-gradient-to-r from-orange-400 to-red-500">
          <div className="h4 text-white pb-10 pt-5 text-center align-center"> Reviews Analyzed</div>
          <div className="h4 text-white text-5xl pb-10 text-center align-center" data-aos="zoom-in"> 100,000</div>
            </AboutCard>
            </div>
            <div>
            <AboutCard className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500 mx-auto justify-center text-center align-center">
          <div className="h4 text-white pb-10 pt-5 text-center align-center"> AI Questions Asked</div>
          <div className="h4 text-white text-5xl pb-10 text-center align-center" data-aos="zoom-in"> 327</div>
            </AboutCard>
            </div>
  </div>*/}

          <figure className="flex justify-center items-start">
            <img
              className="rounded shadow-3xl"
              src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fabout-us_25.webp?alt=media&token=99a79acf-2484-448a-adc4-093aca7ab2f0"}
              width="768"
              height="432"
              alt="About us"
            />
          </figure>
          <p className="text-center align-center margin-auto text-gray-400 pt-5">
            Left to right: Akshay Murthy, Abhi Balijepalli, Graham Sabin, Thomas
            Stahura
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutIntro;
