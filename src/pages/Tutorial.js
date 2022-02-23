import React, { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import TutorialsList from "../partials/TutorialsList";

function Tutorial() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("Tutorial");
    logEvent("page_view", { page_name: "Tutorial" });
  }, []);

  return (
    <main className="flex-grow">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/*  Page sections */}
      <TutorialsList />
    </main>
  );
}

export default Tutorial;
