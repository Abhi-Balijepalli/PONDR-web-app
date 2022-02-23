import React, { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import Header from "../partials/Header";
import PostSingle3 from "../partials/PostSingle3";
import Footer from "../partials/Footer";

function BlogPost3() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("BlogPost3");
    logEvent("page_view", { page_name: "BlogPost3" });
  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <PostSingle3 />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default BlogPost3;
