import React from 'react';
import { Link } from 'react-router-dom';

function TutorialsList() {

  return (
    <section className="relative">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="stylesheet" href="./style.css"></link>
      </head>

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <div className="pt-10 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-left pb-10 md:pb-16">
            <h1 className="h2 mb-4">Tutorial</h1>
            <h2 className="text-xl">
              Everything to help you navigate our platform
            </h2>
          </div>

          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-20 md:pb-10">
            <div className="max-w-3xl mx-auto text-left pb-20 md:pb-16">
              <h1 className="h3 mb-1 text-blue-pondr pb-1">
                Your Product Upload
              </h1>
              <p className="text-gray-500 p2 text-l">
                The first step to getting set up is uploading your product.
                Simply copy and paste the product link from Amazon, write the
                product name, and select the category it falls into. We'll
                notify you when your product has been analyzed. You can do this
                with as many products as you would like.
              </p>
            </div>

            <div className="max-w-3xl mx-auto text-left pb-20 md:pb-16">
              <h1 className="h3 mb-1 text-blue-pondr pb-1">
                Competitor Product Upload
              </h1>
              <p className="text-gray-500 p2 text-l">
                If you want to learn more about yout competitor's product,
                follow the same process of uploading your own product, but check
                the box that says "This is my competitor's product", in order to
                differentiate the product on your dashboard.
              </p>
            </div>
            <div className="flex-1 ml-4 pb-10" data-aos="fade-up">
              <img
                src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fadd-product-tut2%402x.webp?alt=media&token=6cede52d-623f-4ae7-8080-c039c73c01b9"}
                alt="tut-pondr"
                width="500"
                height="300"
                class="responsive"
                class="center"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-left pb-10 md:pb-20">
            <h1 className="h3 mb-1 text-blue-pondr pb-0">
              Understanding your Analyzed Report
            </h1>
            <p className="text-gray-500 p2 mb-10 text-l">
              A report analyzing your product reviews will be created after you
              upload your product link. You will be notified when your report is
              ready to be viewed. You can access it through your product list on
              the dashboard by selecting the product name.
            </p>
            <h2 className="font-bold text-xl leading-snug tracking-tight">
              Graphs included in Report
            </h2>
          </div>

          {/* Section content */}
          <div className="max-w-3xl mx-auto text-left pb-20 md:pb-10">
            <div className="flex-1 ml-4 pb-10" data-aos="fade-right">
              <img
                src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FtrendGraph.png?alt=media&token=fce2c557-b153-4982-ac53-6e64af3b9490"}
                alt="pondr-timeline-graph"
                width="800"
                height="300"
                class="responsive"
                class="center"
              />
            </div>
            <div className="max-w-2xl mx-auto text-left pb-5 md:pb-10 ">
              <p className="text-gray-500 p2 mb-4 text-l pb-10 sm: pb-10">
                This graph displays{" "}
                <a className="font-bold">Customer Sentiment Trend</a> over time
                for your product in <a className="font-bold">general</a>. It
                tells you on a scale from -1 (poor sentiment) to 1 (high
                sentiment) how your customer's feel about your product, by
                analyzing data based on their attitudes and opinions.
              </p>
            </div>

            {/* Sentiment Trendlines */}
            <div className="max-w-3xl mx-auto text-left pb-0 md:pb-10">
              <div className="flex-1 ml-4 pb-10" data-aos="fade-right">
                <img
                  src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FcategoryTrend.webp?alt=media&token=897ef6cf-2c5e-48c6-b800-a54718d05483"}
                  alt="pondr-sentiment-graph"
                  width="800"
                  height="300"
                  class="responsive"
                  class="center"
                />
              </div>
              <div className="max-w-2xl mx-auto text-left pb-20 md:pb-10">
                <p className="text-gray-500 p2 mb-2 text-l pb-0">
                  This graph displays{" "}
                  <a className="font-bold">Customer Sentiment Trend</a> over
                  time for a <a className="font-bold">specific category</a> of
                  your product. it tells you on a scale from -1 (poor sentiment)
                  to 1 (high sentiment) how your customer's feel about an aspect
                  of your product such as "assembly" analyzing data based on
                  their attitudes and opinions. You can filter through different
                  categories of your product to view the sentiment for each.
                </p>
              </div>
            </div>

            <div class="some-page-wrapper">
              <div class="row">
                <div class="column">
                  <img
                    src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FsentCategory.webp?alt=media&token=e1e0ed97-f7a2-4e10-8989-59833cf5df4c"}
                    alt="pondr-sentiment-bar"
                    width="300"
                    height="100"
                    class="responsive"
                  />
                </div>
                <div class="column">
                  <img
                    src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FsentVariant.webp?alt=media&token=0e803860-d573-420a-8479-447e3f6067e0"}
                    alt="pondr-sentiment-bar"
                    width="375"
                    height="200"
                    class="responsive"
                    class="flex-column"
                  />
                </div>
              </div>
            </div>

            <div className="pb-20"></div>
            <div className="max-w-2xl mx-auto text-left pb-30 md:pb-10">
              <p className="text-gray-500 p2 mb-4 text-l">
                <a className="font-bold">1. </a> This graph displays{" "}
                <a className="font-bold">Sentiment Per Category</a> of your
                product. It tells you how your customers feel about each aspect
                of your product, such as quality, price, color, durability, etc.
                A longer bar indicates a higher sentiment whereas a shorter bar
                indicates a lower sentiment
              </p>
            </div>
            <div className="max-w-2xl mx-auto text-left md:pb-10">
              <p className="text-gray-500 p2 mb-4 text-l">
                <a className="font-bold">2. </a> This graph displays the{" "}
                <a className="font-bold">Sentiment Per Variant</a> of your
                product. If you have different sizes, colors, or models of your
                product, this tell you how your customers feel about each type
                of variant, and which are more highly favored
              </p>
            </div>

            <div className="pb-10"></div>
            <div class="some-page-wrapper">
              <div class="row">
                <div class="column">
                  <img
                    src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FdistStar.webp?alt=media&token=901b36d5-9744-40f3-9648-092f98d9c728"}
                    alt="pondr-star-rating"
                    width="300"
                    height="100"
                    class="responsive"
                  />
                </div>
                <div class="column">
                  <img
                    src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FdistSent.webp?alt=media&token=d9df53b3-67f5-4eff-b9d7-b26f5191a38a"}
                    alt="pondr-sentiment-pi"
                    width="355"
                    height="200"
                    class="responsive"
                    class="flex-column"
                  />
                </div>
              </div>
            </div>

            <div className="pb-20"></div>
            <div className="max-w-2xl mx-auto text-left pb-30 md:pb-10">
              <p className="text-gray-500 p2 mb-4 text-l">
                <a className="font-bold">3. </a> This graph displays the{" "}
                <a className="font-bold">Distribution of Star Rating</a>. for
                your product. It tells you how many customers gave you a
                particular star rating from <a className="font-bold">1 to 5</a>.
                For example, this graph shows that 460 customers gave a 4-star
                rating.
              </p>
            </div>
            <div className="max-w-2xl mx-auto text-left md:pb-10">
              <p className="text-gray-500 p2 mb-4 text-l">
                <a className="font-bold">4. </a> This graph displays the{" "}
                <a className="font-bold">Distribution of Customer Sentiment</a>{" "}
                of your product. It tells you how many of your customers gave
                you a particular sentiment rating from 1 to 5, 1 being the{" "}
                <a className="font-bold">lower sentiment</a> and 5 being a{" "}
                <a className="font-bold">very high sentiment</a>. For example,
                this graph shows that 1937 customers has a sentiment rating of 3
                out of 5.
              </p>
            </div>

            <div className="pb-10"></div>


            <div className="max-w-3xl mx-auto text-left pb-20 md:pb-16">
              <h1 className="h3 mb-1 text-blue-pondr pb-1">
                AI Question & Answer System
              </h1>
              <p className="text-gray-500 p2 text-l pb-5">
                You will be able to use the Q & A feature as soon as your
                product has been analyzed. The AI Q & A can be found in your{" "}
                <a className="font-bold">product analytics tab</a>.
              </p>
              <p className="text-gray-500 p2 text-l pb-5">
                The Q & A uses your customer reviews dataset in order to answer questions you
                have about your product and customer comments. The key is asking
                the proper question to get the answer you want. Leading questions
                have shown the best results, but experiment and take note of what
                questions give great answers! After asking questions, the AI
                will take around 10 seconds to create an answer based on your customer's comments. From this, you
                can extract information such as ideas for marketing
                opportunities, new product features, change to customer support,
                and much more!
              </p>
              <p className="p2 text-gray-500 text-1">
                There is currently no limit to the number of questions you can
                ask.
              </p>
            </div>

            <div className="max-w-3xl mx-auto text-left pb-20 md:pb-16">
              <h1 className="h3 mb-1 text-blue-pondr pb-1">
                Sorting Reviews By Category
              </h1>
              <p className="text-gray-500 p2 text-1">
                Once your product is analyzed, you will be able to access your
                categorized reviews. Within your product analytics, there will
                be a tab for <a className="font-bold">"Categorized Reviews"</a>.
                There you can find a dropdown in the graph with various
                categories such as price, durability, color etc. For each category, there
                will be a graph to show the customer sentiment over time regarding that category of your product, and you can scroll
                down to see all the reviews relating to that category. This lets
                you see how consumers have changed their opinions over time,
                and lets you read comments about specific categories you are
                curious about.
              </p>
            </div>
            {/* Tabs items */}
            {/* <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-5 md:mb-10 md:order-1' data-aos='zoom-y-out' ref={tabs} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}


export default TutorialsList;