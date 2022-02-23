import React from "react";
import { Link } from "react-router-dom";

function PostSingle2() {
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
                  The 5 Star Review System: A Consumer Nightmare
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
                          <span className="absolute inset-0 -m-px bg-white rounded-full"></span>
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
                      <span className="text-gray-600"> · Jan 02, 2021</span>
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
                      It started with convenience, the way many things do.
                      However, that attempt at convenience transcended into
                      laziness, a vehicle for incomplete thoughts with no
                      justification.
                    </p>
                    <p className="mb-8">
                      I’m referring to the 5-star review system, which has
                      become a nearly universal indicator of product quality by
                      crowdsourcing opinions. From Amazon to eBay and everything
                      in between, you see the 5-star review system at play, and
                      for good reason too. In theory, rating a product out of 5
                      is great. It’s convenient, fast, and understandable for
                      all parties involved, however, as with many things, this
                      review system has not played out as theory would hope.
                    </p>

                    <p className="mb-8">
                      In an ideal world, a review does a few things. First, it
                      lets a customer tell their story about a product they
                      purchased, good or bad. Secondly, a well-written review
                      allows a consumer to make an educated decision on whether
                      or not they would like to buy a product. Lastly and
                      possibly most importantly, a good review allows a company
                      to gauge customer opinion of their product, so they can
                      change it to best meet customer needs. This is how reviews
                      used to work and what reviewers used to stand for.
                      Reviewers, in order to help out their fellow consumers,
                      wrote in-depth reviews and spent time explaining each and
                      every intricacy of their experience. Products were only
                      reviewed by those who took the time to make their reviews
                      worthwhile. The 5-star review system shifted all of that.
                    </p>

                    <p className="mb-8">
                      This way of rating products dominated the internet thanks
                      to its small time commitment and the sheer quantity of
                      reviews internet users could provide. As opposed to
                      previous forms of reviews, the 5-star system requires
                      little to no justification for any given rating causing
                      reviews, over time to be less and less valuable to
                      consumers and companies alike. The widespread adoption and
                      use of the 5-star system quickly changed how consumers
                      bought products. Rather than basing opinions on thorough
                      written reviews, they began forming their opinions based
                      on an arbitrary number of stars between 1 and 5. It became
                      a decision of a product rated at 4.3 stars over a product
                      rated at 4.0 stars, no justification for those reviews on
                      either side of the aisle. This way of shopping online is
                      incenting bad actors to artificially increase their star
                      rating to bump up sales. Worst of all, the lack of
                      explanation associated with reviews, halted the ability
                      for companies to improve and innovate on their products.
                      Companies no longer have high quality, explanatory
                      feedback associated with long-form reviews, meant to help
                      them perfect their product to all customer needs.
                    </p>

                    <p className="mb-8">
                      Beyond feedback for companies, reviews are critical to how
                      consumers spend their money. On Amazon, eBay, Facebook,
                      and any other site that offers reviews, consumer
                      perception of a product comes down to how that product has
                      been reviewed, essentially judging a book by its cover.
                      Seeing an average of 3.2 stars immediately deters a
                      consumer from even clicking to learn more about a product.
                      This phobia against products reviewed below a 5-star
                      rating represents a real downside to the 5-star review
                      system. For a process that requires no justification, the
                      5-star review system has too much power over our
                      decisions, more than we as consumers would like to admit.
                    </p>

                    <p className="mb-8">
                      We’ve all heard the phrase, ‘the customer is always
                      right’, and we all know that is often not true. The same
                      goes for online reviews. As a supplier, by allowing any
                      customer to quickly rate a product out of 5, you are
                      essentially letting strangers decide how many sales you
                      will get, where your product is going to appear within
                      search results, and most importantly, how your potential
                      customers will perceive the quality of your product. As
                      online shoppers, we are letting strangers decide where our
                      dollars are going and which products are right for us. If
                      we as internet users continue down this track, we are
                      subjecting ourselves and our choices to the whims of
                      people we don’t know and who don’t know us.
                    </p>

                    <p className="mb-8">
                      Every year, companies and consumers are hurt by this
                      review system. Billions of dollars are spent by both
                      companies in the form of marketing to rebuild image, and
                      consumers in the form of bad purchases, as a result of the
                      5-star system. These costs fall disproportionately on
                      smaller companies who can't afford marketing or PR
                      agencies and need to know what their customers really
                      think about their product or service. These companies long
                      for clear responses from customers about what went well,
                      what didn’t, and what they need to change to make the
                      customer experience better. Additionally, only a few
                      negative reviews have the power to decimate a small
                      company that would have otherwise provided a great product
                      if said feedback was more constructive.
                    </p>

                    <p className="mb-8">
                      This event of one bad review stopping a company is not an
                      anomaly, but rather a product of the 5-star review system
                      we rely on so heavily. As clear as it is, no big companies
                      like Amazon and eBay will solve the problem, as they are
                      too far entrenched in it. Any necessary change these
                      companies would need to take would be detrimental to their
                      businesses and thus not worth fixing. These companies
                      would say “if it ain’t broke, don’t fix it”, well I’m here
                      to tell you, it is “broke” and we need to fix it. The main
                      takeaway here is don’t always trust those ratings you see
                      on the front page, peel back the cover and look further.
                      Occasionally you may see that the best products are the
                      ones without the best ratings...
                    </p>

                    <p className="mb-8">
                      Pondr is changing the way you buy, through high quality,
                      thorough, and educational reviews on everything you want
                      or need. No more ads and no more pay to win, learn about
                      us by going to our website.
                    </p>

                    <figure className="mb-8">
                      <img
                        className="w-full rounded"
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FAmazon-garage-delivery-porch-pirates-retail.webp?alt=media&token=a9a6fb01-c852-4c74-b2f9-cc995d35f5c3"
                        }
                        width="768"
                        height="432"
                        alt="Blog single"
                      />
                    </figure>
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

export default PostSingle2;
