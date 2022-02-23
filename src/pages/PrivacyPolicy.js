import React, { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Privacy from "../partials/Privacy";

function PrivacyPolicy() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("PrivacyPolicy");
    logEvent("page_view", { page_name: "PrivacyPolicy" });
  }, []);

  return (
    <div className="d-flex flex-col min-h-screen overflow-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <Privacy />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
