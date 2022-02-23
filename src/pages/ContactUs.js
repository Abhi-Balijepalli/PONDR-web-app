import React from "react";
import { useEffect } from "react";
import Header from "../partials/Header";
import ContactForm from "../partials/ContactForm";
import Footer from "../partials/Footer";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import MetaTags from 'react-meta-tags';

function ContactUs(props) {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("ContactUs");
    logEvent("page_view", { page_name: "ContactUs" });
  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
        <MetaTags>
          <title>Contact Us</title>
          <meta
            name="description"
            content="Have a question about our product? We would love to hear your feedback! Or, stop by to say hello. We will get back to you as soon as possible!"
          />
          <meta property="og:title" content="Pondr | Contact Us" />
        </MetaTags>
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        {/*  Page sections */}
        <ContactForm circleDisplayed={props.circleDisplayed} />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default ContactUs;
