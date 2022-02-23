import React from "react";
import { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import HeroHome from "../partials/HeroHome";
import MetricsCounter from "../partials/MetricsCounter";
import FeaturesHome from "../partials/FeaturesHome";
import NewHome from "../partials/NewHome";
import MicrosoftSection from "../partials/MicrosoftSection";
import News from "../partials/News";
import JoinNow from "../partials/JoinNow";
import ProblemSolved from "../partials/ProblemSolved";
import WhyPondr from "../partials/WhyPondr";
import Testimonial from "../partials/Testimonial";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import MetaTags from "react-meta-tags";
import { logFirestoreEvent } from "../merlinv1/beta_api";

const Home = (props) => {
  // Sets screen analytics
  useEffect(() => {
    logFirestoreEvent("HomePageView", {});
    window.scroll(0, 0);
    logScreenName("Home");
    logEvent("page_view", { page_name: "Home" });
  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <MetaTags>
        <title>Home</title>
        <meta
          name="description"
          content="Pondr is an intelligent product analytics and feedback platform using GPT-3, helping companies unlock the full potential of their online customer reviews through data visualization and market research tools to build better products."
        />
        <meta property="og:title" content="Pondr | Home" />
      </MetaTags>

      {/*  Site header */}

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <Header />

        <HeroHome />
        <MetricsCounter numAI={452} numProducts={94} numReviews={112453} />
        {/* <FeaturesHome /> */}
        <NewHome />
        <Testimonial />
        <ProblemSolved />
        <WhyPondr />
        <MicrosoftSection />
        <JoinNow />
        <div className="pb-5"></div>
        <News />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
};

export default Home;
