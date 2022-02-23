import React, { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import Header from "../partials/Header";
import PostSingle from "../partials/PostSingle";
import Footer from "../partials/Footer";

function BlogPost() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("BlogPost1");
    logEvent("page_view", { page_name: "BlogPost1" });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <PostSingle />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default BlogPost;
