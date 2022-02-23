// This is the pricing screen which will show users our different pricing packages
import React, { useEffect } from "react";
import Wrapper from "../utils/Wrapper";
import * as FaIcons from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { useHistory } from "react-router";
import { logScreenName, logEvent } from "../utils/CommonFunctions";
import MetaTags from "react-meta-tags";
import { logFirestoreEvent } from "../merlinv1/beta_api";

// Creates the component
const Pricing = () => {
  // The history hook
  const history = useHistory();

  // Logs screen analytics
  useEffect(() => {
    logFirestoreEvent("PricingView", {});
    logScreenName("PricingPage");
    logEvent("page_view", { page_name: "PricingPage" });
  }, []);

  // Function takes index at which features stop being included and returns array of features with an "included?" property. (not inclusive)
  const getProductFeatures = (indexToStopIncluding) => {
    // All current product features
    const features = [
      "Unlimited Product Analytics",
      "Ask Data",
      "Categorized Reviews",
      "Product Comparison",
      "Export analytics graphs",
    ];

    // Maps the included features
    const includedFeatures = features.map((eachFeature, index) => {
      return {
        title: eachFeature,
        included: index <= indexToStopIncluding,
      };
    });

    return includedFeatures;
  };

  // Returns the UI for each one of the prices
  const getPriceCard = (
    name,
    icon,
    price,
    isRecommended,
    indexToStopIncludingFeatures
  ) => (
    <div
      className={"w-27.5% bg-white shadow-lg rounded-3xl"}
      style={{
        minWidth: "400px",
      }}
    >
      <div className={"flex flex-col ml-10"}>
        {isRecommended ? (
          <div className={"w-full flex justify-between -mt-2"}>
            <div className={"mt-12"}>{icon}</div>
            <div
              className={
                "flex justify-center items-center bg-yellow-100 h-0 py-5 px-8 mr-5 rounded-3xl mt-10"
              }
            >
              <p className={"text-lg text-white font-semibold"}>RECOMMENDED</p>
            </div>
          </div>
        ) : (
          <div className={"mt-12"}>{icon}</div>
        )}
        <p className={"h4 font-bold text-blue-pondrgray mt-3"}>{name}</p>
        <div className={"text-blue-pondr flex items-start mt-2"}>
          <span className={"font-bold text-3xl self-center"}>
            Free for 30 days
          </span>
        </div>
        <div className={"text-blue-pondr flex items-start mt-2 pb-5"}>
          <span className={"font-medium text-lg self-center"}>Then&nbsp;</span>
          <span className={"font-medium text-lg self-start"}>$</span>
          <span className={"font-medium text-lg self-center"}>{price}</span>
          <span className={"font-medium text-lg self-center"}>
            &nbsp;/&nbsp;Month
          </span>
        </div>
        <div className={"mt-4"}>
          {getProductFeatures(indexToStopIncludingFeatures).map(
            (eachFeature, index) => (
              <div key={index} className={"flex items-center mb-6"}>
                {eachFeature.included ? (
                  <FaCheck color={"#3DD598"} size={30} />
                ) : (
                  <AiFillLock size={30} color={"#DFDFDF"} />
                )}
                <p
                  className={
                    eachFeature.included
                      ? "font-medium text-lg ml-5"
                      : "text-gray-300 font-medium text-lg ml-5"
                  }
                >
                  {eachFeature.title}
                </p>
              </div>
            )
          )}
        </div>
        <button
          onClick={() => {
            history.push({
              pathname: "/enterprise/create-product",
            });
          }}
          className={
            "button-large btn mx-auto align-center text-center self-center -ml-5 mr-5 justify-center px-8 py-3 mt-16 font-bold rounded-3xl text-white text-xl bg-black hover:bg-blue-pondr hover:border-white hover:text-white focus:outline-none"
          }
        >
          Get Started
        </button>
      </div>
      <div className={"h-8"} />
    </div>
  );

  // Contains an array with the most commonly asked questions
  const commonlyAskedQs = [
    {
      question: 'What does "Ask Data" mean?',
      answer:
        "This is one of our most popular features - we allow you to ask questions about your dataset of reviews, to receive instant, actionable insights based on your customer feedback.",
    },
    {
      question: "How many products can I analyze?",
      answer:
        "With our current pricing model, you can analyze as many products as you would like, all for $15 per month after your first free month.",
    },
    {
      question: "What is the “Comparison Tool”?",
      answer:
        "Another favorite feature of Pondr Analytics, lets you compare two products, side by side in order to see their strengths and weaknesses in correlation to your other products, or your direct competitors.",
    },
    {
      question:
        "Do you need any private information from me in order to analyze reviews?",
      answer:
        "Lucky for you, all we need is a link to your product on Amazon. We make the whole analysis non-intrusive and hands off, so all you have to do is wait for insights!",
    },
    {
      question: "Can you analyze reviews from sites other than Amazon?",
      answer:
        "Currently, we can only analyze Amazon reviews, however we are weeks away from letting users upload exported CSV files of reviews in order to be analyzed.",
    },
    {
      question: "Is there a subscription plan I can use?",
      answer:
        "Not just yet, but you will be able to soon. Our flexible subscription plan will be releasing in late 2021!",
    },
  ];

  // Returns the UI
  return (
    <Wrapper isGrey={true} fullWidth={true}>
      <MetaTags>
        <title>Pricing</title>
        <meta
          name="description"
          content="Get started with Pondr! Choose an affordable pricing plan that best suits your needs to help take your products to the next level."
        />
        <meta property="og:title" content="Pondr | Pricing" />
      </MetaTags>
      <div className={"w-full flex -pt-20 -mt-20 flex-col"}>
        <div
          style={{
            backgroundImage: `url(${"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FPricingBG1.webp?alt=media&token=1a849f1a-b6bd-40fb-9d25-f019cf6f40eb"})`,
            backgroundSize: "stretch",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
          className={"flex flex-col"}
        >
          <p
            className={
              "font-bold text-4xl self-center text-white pt-10 text-center mt-10"
            }
          >
            Ready to get started with Pondr?
          </p>
          <p className="text-xl self-center text-white text-center mb-20">
            Pick a flexible pricing model that best suits your needs
          </p>
          <div className={"w-full flex justify-evenly -mb-112 text-2xl"}>
            {getPriceCard(
              "Beta Plan",
              <FaIcons.FaPlane name="FaPlane" color={"#7779FC"} size={40} />,
              15,
              true,
              5
            )}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FPricingBG2.webp?alt=media&token=4df6e49a-3653-4f22-baaa-d2f8fd819b94"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className={"flex flex-col pb-20"}
        >
          <p
            className={
              "font-bold text-3xl self-center text-blue-pondr mt-112 text-center mx-5 pt-20"
            }
          >
            Try our demo today
          </p>
          <p
            className={
              "font-normal text-xl self-center text-blue-pondrgray mt-4 w-1/2 text-center"
            }
          >
            Play around with all our helpful features to see how we can help
            take your business to the next level
          </p>
          <button
            onClick={() => history.push("/demo")}
            className={
              "button-large btn mx-auto align-center text-center justify-center px-8 py-3 mt-16 font-bold rounded-3xl text-white text-xl bg-black hover:bg-blue-pondr hover:border-white hover:text-white focus:outline-none"
            }
          >
            Try Demo
          </button>
        </div>
        <div className={"flex flex-col bg-white"}>
          <p
            className={
              "font-bold text-3xl self-center text-blue-pondrgray mt-20 text-center mx-10 pb-10"
            }
          >
            Commonly Asked Questions
          </p>
          <div
            className={
              "flex flex-wrap w-4/5 justify-between self-center mt-16 pb-20"
            }
          >
            {commonlyAskedQs.map((eachQuestion, index) => (
              <div className={"w-5/12 mb-10"} key={index}>
                <p className={"font-semibold text-xl text-blue-pondrgray mb-5"}>
                  {eachQuestion.question}
                </p>
                <p className={"p2 font-medium text-lg text-gray-400"}>
                  {eachQuestion.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

// Exports the component
export default Pricing;
