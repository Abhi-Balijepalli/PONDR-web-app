import React , { useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import Header from '../partials/Header';
import PostSingle2 from '../partials/PostSingle2';
import Footer from '../partials/Footer';

function BlogPost2() {
  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("BlogPost2");
    logEvent("page_view", { page_name: "BlogPost2" });
  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <PostSingle2 />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default BlogPost2;