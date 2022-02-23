import React, { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import Header from "../partials/Header";
import PostSingle4 from "../partials/PostSingle4";
import Footer from "../partials/Footer";

function BlogPost4() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("BlogPost4");
    logEvent("page_view", { page_name: "BlogPost4" });
  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <PostSingle4 />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default BlogPost4;
