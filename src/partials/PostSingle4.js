import React from "react";
import { Link } from "react-router-dom";

function PostSingle4() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto lg:max-w-none">
            <article>
              {/* Article header */}
              <header className="max-w-3xl mx-auto mb-20">
                {/* Title */}
                <h1 className="h1 text-center mb-4">
                  Pondr, Welcome to the World
                </h1>
              </header>

              {/* Article content */}
              <div className="lg:flex lg:justify-between" data-sticky-container>
                {/* Sidebar */}
                <aside className="relative hidden lg:block w-64 mr-20 flex-shrink-0">
                  <div
                    data-sticky
                    data-margin-top="100"
                    data-sticky-for="768"
                    data-sticky-wrap
                  >
                    <h4 className="text-lg font-bold leading-snug tracking-tight mb-4">
                      Table of contents
                    </h4>
                    <ul className="font-medium -my-1">
                      <li className="py-1">
                        <a
                          className="flex items-center hover:underline"
                          href="#introduction"
                        >
                          <svg
                            className="w-4 h-4 fill-current text-gray-400 mr-3 flex-shrink-0"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
                          </svg>
                          <span>General content</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </aside>

                {/* Main content */}
                <div>
                  {/* Article meta */}
                  <div className="flex items-center mb-6">
                    <div className="flex flex-shrink-0 mr-3">
                      <a className="relative" href="#0">
                        <span
                          className="absolute inset-0 -m-px"
                          aria-hidden="true"
                        >
                          <span className="absolute inset-0 -m-px bg-white rounded-full" />
                        </span>
                        <img
                          className="relative rounded-full"
                          src={
                            "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FGraham-official_25.webp?alt=media&token=8e165d66-5ed2-4ab6-a0ab-83d9d7c0326c"
                          }
                          width="32"
                          height="32"
                          alt="Author 04"
                        />
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-600">By </span>
                      <a className="font-medium hover:underline" href="#0">
                        Graham Sabin
                      </a>
                      <span className="text-gray-600"> · Jun 8, 2021</span>
                    </div>
                  </div>
                  <hr className="w-16 h-px pt-px bg-gray-200 border-0 mb-6" />

                  {/* Article body */}
                  <div className="text-lg text-gray-600">
                    <p
                      id="introduction"
                      className="mb-8"
                      style={{ scrollMarginTop: "100px" }}
                    >
                      June 8th marks the launch of Pondr, a product analytics
                      and review platform created to support companies in their
                      quest to make the best products on the market.
                    </p>
                    <p className="mb-8">
                      At Pondr, we see a problem in the way that companies
                      interact with their products. Companies are increasingly
                      data-driven, yet when it comes to customer feedback, too
                      much data is left behind. eCommerce stores on Amazon,
                      Shopify, and eBay often have thousands of reviews, all of
                      which sit idly by as store owners struggle to improve
                      their products. Each review represents a gold mine of
                      information, holding data points far more valuable than
                      any gold nugget.
                    </p>

                    <p className="mb-8">
                      Taking advantage of reviews and pulling out the analytics
                      they offer shows companies a critical opportunity while
                      improving their products. We do just that. In minutes, we
                      compile all of our user's product reviews from various
                      sites into a database for use. Advancements in NLP make it
                      possible for us to fully analyze reviews, producing an
                      interactive report full of charts and graphs complemented
                      by explanatory text and definitions. Our reports put a
                      heavy emphasis on consumer sentiment towards our user's
                      products. We can draw out likes/dislikes, consumer
                      sentiment down to each feature, trends in sentiment over
                      time, and much more, all seamlessly displayed on the
                      user-facing dashboard.
                    </p>

                    <p className="mb-8">
                      For a long time, it was difficult to trust the reliability
                      of most AI, however, OpenAI has finally made it a reality
                      with their introduction of GPT-3. The AI, trained on
                      roughly 175 billion data points is amongst, if not the
                      most advanced AI in the world and we’ve seen its
                      incredible applications first hand. Arguably our most
                      anticipated beta feature lets users ask questions directly
                      to their reviews. Using GPT-3, we’ve created an AI Q & A
                      model which is trained by a user’s dataset of reviews.
                      Like never before, our users can dive into their reviews
                      to ask questions like “What features should be added?” or
                      “What was the hardest part about using this product?”,
                      receiving actionable answers instantly, based on what real
                      customers have said. We’ve seen the power of these
                      responses prompt users to add specific new features to
                      products, include additional instructions for setup, or
                      change sizing for increased ergonomics and usability.
                    </p>

                    <p className="mb-8">
                      While our Q & A model already shows the diverse use cases
                      of GPT-3, we also use it to categorize and sort thousands
                      of reviews, letting users easily navigate through their
                      customer’s comments. Durability, pricing, and appearance
                      are just a few of the supervised categories reviews may
                      fall into, in addition to various unsupervised categories
                      unique to each user's product. Breaking down reviews by
                      category lets users view graphs showing trends for
                      different aspects of their product next to real, easy to
                      digest, comments made by real customers. In our digital
                      world, there is no reason our users should waste their
                      precious time sorting reviews when Pondr does it for them.
                    </p>

                    <p className="mb-8">
                      If everything you saw above wasn’t exciting enough, we’re
                      happy to tell you about one more unfair advantage we are
                      more than happy to give our users. Telling a company the
                      best and worst parts about their direct competitor’s
                      products would be immensely valuable to target markets
                      they aren’t hitting and dive into ones they are. We do
                      just that. Our users can build up profiles about their
                      competitors, develop a dataset of their reviews, and find
                      out what their customers think. Knowing how their
                      competitors should improve before they do lets our users
                      stay on top of the game to create the best product in
                      whatever market segment they hope to own.
                    </p>

                    <p className="mb-8">
                      Although impressive, the features you’ve already read
                      about are just the start. Following the launch of our beta
                      on June 8th, you can expect nothing less than an
                      incredible suite of features and tools coming out in the
                      subsequent weeks and months. We’re expanding to Shopify
                      stores and independent marketplaces while building a
                      network of Review Gurus, excited to provide great insights
                      through hands-on experiences with products. We’re thrilled
                      to bring you along on the journey.
                    </p>

                    <p className="mb-8">
                      We’re in the business of making products better.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article footer */}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostSingle4;
