import React from "react";
import { useEffect } from "react";
import Header from "../partials/Header";
import BlogList from "../partials/BlogList";
import Footer from "../partials/Footer";
import { logEvent, logScreenName } from "../utils/CommonFunctions";

function Blog() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("BlogList");
    logEvent("page_view", { page_name: "BlogList" });
  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <BlogList />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Blog;
