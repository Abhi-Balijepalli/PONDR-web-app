import React, { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Terms from "../partials/Terms";

function TermsAndConditions() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("TermsConditions");
    logEvent("page_view", { page_name: "TermsConditions" });
  }, []);
  return (
    <div className="d-flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <Terms />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
