import React from "react";
import MediaQuery from "react-responsive";

const FeaturesHome = () => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div
          className="absolute inset-0 bg-gray-100 pointer-events-none mb-50"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 ">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto pb-20 md:pb-16 text-center tracking-tighter">
              <h1 className="h3 mb-4 sm: pb-0">
                Customer Reviews All in One Spot
              </h1>
              <p className="p2 text-xl text-blue-pondr text-center tracking-tighter">
                From your Amazon to Shopify stores, we gather all of your
                customer reviews into a single dataset, ready to use.
              </p>
            </div>

            <div className="max-w-3xl mx-auto pt-22 md:pt-0 md:pb-20">
              <div
                className="flex items-center text-lg p-5 bg-white shadow-md border-gray-200 hover:shadow-lg rounded border transition duration-300 ease-in-out mb-3"
                href="#0"
              >
                <div>
                  <div className="font-bold leading-snug tracking-tight mb-1">
                    GPT-3 Q&A
                  </div>
                  <div className="p2 text-gray-600">
                    Ask any question about your reviews to our advanced AI, and
                    recieve actionable answers based on what your customer are
                    saying.
                  </div>
                </div>
              </div>
              <div
                className="flex items-center text-lg p-5 bg-white shadow-md border-gray-200 hover:shadow-lg rounded border transition duration-300 ease-in-out mb-3"
                href="#0"
              >
                <div>
                  <div className="font-bold leading-snug tracking-tight mb-1">
                    Interactive Report
                  </div>
                  <div className="p2 text-gray-600">
                    Visualize the meaning behind your reviews using charts and
                    graphs to pinpoint trends, sentiment towards features,
                    product pros & cons, and more.
                  </div>
                </div>
              </div>
              <div
                className="flex items-center text-lg p-5 bg-white shadow-md border-gray-200 hover:shadow-lg rounded border transition duration-300 ease-in-out mb-3"
                href="#0"
              >
                <div>
                  <div className="font-bold leading-snug tracking-tight mb-1">
                    Sort by Category
                  </div>
                  <div className="p2 text-gray-600 pb">
                    Navigate through your customer reviews, sorted by comments
                    related to price, durability, support, appearance, and more.
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-20"></div>

            {/* Section header */}

            {/* Section header */}
            <div className="max-w-2xl mx-auto text-center md:pb-5">
              <h1 className="h2 mb-4">Intelligent Q&A Powered by</h1>
              <h1 className="h2 mb-4">Advanced GPT-3</h1>
              <p className="text-xl text-blue-pondr text-gray-600 mb-4">
                Powerful AI to answer all your burning questions about your
                product
              </p>
            </div>
            <div className="max-w-3xl mx-auto text-left text-lg pb-10 p-5">
              <div>
                <MediaQuery minWidth={770}>
                  <div className="p2 text-xl text-gray-600">
                    Like never before, our users can dive into their reviews and
                    ask questions to our AI which produces actionable answers
                    based on their data set of reviews. We have seen the power
                    of these responses prompt enterprise users to add specific
                    new features to their product, include additional
                    instructions for product setup, or change product sizing for
                    increased ergonomics and usability. We are one of the few
                    startups around the world who provide access to this
                    technology.{" "}
                  </div>
                </MediaQuery>
                <MediaQuery maxWidth={769}>
                  <div className="text-gray-600 text-center">
                    Like never before, our users can dive into their reviews and
                    ask questions to our AI which produces actionable answers
                    based on their data set of reviews.{" "}
                  </div>
                </MediaQuery>
              </div>
            </div>

            {/* Top image */}
            <div className="max-w-3xl mx-auto text-center pb-10 md:pb-15">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FAI-example%402x.webp?alt=media&token=90d0a630-c0a3-4dd1-9f6d-6fb8309e7813"
                }
                width="1204"
                height="325"
                alt="pondr-ai-q-and-a"
                class="responsive"
              />
            </div>

            <div className="pb-20"></div>

            {/* Section content */}
            <div
              className="max-w-3xl mx-auto pb-20 md:pb-10"
              className="feature-header"
            >
              <div
                className="w-full flex flex-col sm:flex-row mt-4 items-center"
                data-aos="fade-right"
              >
                <div className="flex-1 mr-0 sm:mr-20 pb-30 sm:align-center w-full">
                  <h3 className="h3 mb-10 text-center sm:text-left">
                    Full Review Analysis Report
                  </h3>
                  <p className="text-xl text-blue-pondr pb-5 text-center sm:text-left">
                    Quickly visualize what your customers are saying about your
                    product.
                  </p>
                  <MediaQuery minWidth={770}>
                    <p className="p2 text-xl text-gray-600">
                      Advancements in NLP make it possible for us to fully
                      analyze reviews, producing an interactive report full of
                      charts and graphs complemented by explanatory text and
                      definitions. Our reports put a heavy emphasis on consumer
                      sentiment towards our user’s products. We can draw out
                      likes/dislikes, consumer sentiment for each feature,
                      trends in customer sentiment over time, the likelihood of
                      your product being recommended, and much more, all
                      seamlessly displayed on the user-facing dashboard.
                    </p>
                  </MediaQuery>
                </div>
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Freport-example.webp?alt=media&token=0f439f10-04a1-4306-a1e3-99373e9fbafa"
                  }
                  alt="pondr-interactive-report"
                  className="w-1/2 h-auto sm:ml-4 pb-30 shadow-2xl"
                />

                {/* Sorted categories to find exactly what you need */}
              </div>
              <div className="pb-20"></div>
              <div
                className="w-full flex flex-col-reverse sm:flex-row  mt-8 items-center"
                data-aos="fade-right"
              >
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fcategory-top.webp?alt=media&token=57de7c31-f837-4ecf-8499-820ddbfbd0d2"}
                  alt="pondr-category-reviews"
                  className="w-1/2 h-auto pb-30 shadow-2xl bg-white"
                />
                <div className="flex-1 ml-0 sm:ml-4 pb-10 w-full ">
                  <h3 className="h3 mb-5 text-center sm:text-right text-right">
                    Category Filtering & Search
                  </h3>
                  <p className="text-xl text-blue-pondr pb-5 text-center sm:text-right">
                    Pinpoint aspects of your product or company that customers
                    talk about the most.
                  </p>
                  <MediaQuery minWidth={770}>
                    <p className="p2 text-xl text-gray-600 text-right">
                      Using GPT-3, we categorize and sort thousands of reviews,
                      letting users easily navigate through their customer’s
                      comments. Some of the major categories include durability,
                      pricing, and appearance, along with categories generated
                      by our AI. Breaking down reviews by category lets users
                      understand what product areas their customers are talking
                      about the most, and what areas of their product experience
                      or customer service need improvement.{" "}
                    </p>
                  </MediaQuery>
                </div>
              </div>
              <div className="pb-20"></div>

              {/* Tabs items */}
              {/* <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-5 md:mb-10 md:order-1' data-aos='zoom-y-out' ref={tabs} /> */}
            </div>
          </div>
        </div>
      </section>
    </html>
  );
};

export default FeaturesHome;
