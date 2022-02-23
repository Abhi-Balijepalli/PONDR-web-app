import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar} from "react-icons/ai";
import MediaQuery from "react-responsive";

function Join() {
  return (
    <section>
      <div>
        <MediaQuery maxWidth={1149}>
        <div
          className="max-w-2xl p-10 mx-auto align-middle justify-center h-1/2"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="h-full mt-10 md:py-20">
            {/* Section header */}
            <div className="mx-auto text-center">
              <div className=" flex flex-row mx-auto align-middle justify-center items-center text-yellow-300">
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
              </div>
              <div className="p2 pt-5 left-align items-start text-gray-400 text-lg italic leading-relaxed text-left">
                {" "}
                "While we have worked with many different analytics tools,
                review software and Amazon store management platforms, Pondr has
                a unique proposition. We were able to simply input an ASIN and
                product title and Pondr returned real insights about each
                product's ratings and sentiment over time."
              </div>
              <div className="max-w-3xl mx-auto text-left pb-10 md:pb-20">
                <div className="p2 pt-10 items-start left-align text-left text-gray-600 font-semibold tracking-tight text-xl italic leading-relaxed ">
                  {" "}
                  - Mike Grill, eCommerce and Digital Marketing Director, Boost
                  Oxygen LLC
                </div>
              </div>
            </div>
          </div>
        </div>
        </MediaQuery>



        <MediaQuery minWidth={1150}>
        <div
          className="max-w-3xl p-4 mx-auto align-middle justify-center h-1/2"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="h-1/2 mt-10 md:py-20">
            {/* Section header */}
            <div className="mx-auto text-center">
              <div className=" flex flex-row mx-auto align-middle justify-center items-center text-yellow-300">
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
                <AiFillStar size="20px" />
              </div>
              <div className="p2 pt-5 align-middle text-gray-400 text-xl italic leading-relaxed text-center">
                {" "}
                "While we have worked with many different analytics tools,
                review software and Amazon store management platforms, Pondr has
                a unique proposition. We were able to simply input an ASIN and
                product title and Pondr returned real insights about each
                product's ratings and sentiment over time."
              </div>
              <div className="max-w-3xl mx-auto text-center pb-10 md:pb-20">
                <div className="p2 pt-10 align-middle text-gray-600 font-semibold tracking-tight text-xl italic leading-relaxed text-center">
                  {" "}
                  - Mike Grill, eCommerce and Digital Marketing Director, Boost
                  Oxygen LLC
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
