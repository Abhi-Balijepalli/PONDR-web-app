import React, { useEffect } from "react";
import AboutIntro from "../partials/AboutIntro";
import JoinNow from "../partials/JoinNow";
import Wrapper from "../utils/Wrapper";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import MetaTags from "react-meta-tags";
import { logFirestoreEvent } from "../merlinv1/beta_api";

function About() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logFirestoreEvent("AboutView", {});
    logScreenName("About");
    logEvent("page_view", { page_name: "About" });
  }, []);

  return (
    <Wrapper>
      <MetaTags>
        <title>About Us</title>
        <meta
          name="description"
          content="At Pondr, we are building tools to allow companies to take action of the lost potential of their customer feedback, through our suite of advanced market research and analytics tools."
        />
        <meta property="og:title" content="Pondr | About Us" />
      </MetaTags>
      <AboutIntro />
      <JoinNow />
    </Wrapper>
  );
}

export default About;
