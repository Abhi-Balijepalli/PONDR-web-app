import React from "react";
import { Link } from "react-router-dom";

function PostSingle3() {
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
                  Pondr Selected for Microsoft for Startups Designed to Help
                  Startups Quickly Scale
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
                            "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FAkshay-official.webp?alt=media&token=7e717672-7a7e-4927-9a10-891987839254"
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
                        Akshay Murthy
                      </a>
                      <span className="text-gray-600"> · May 21, 2021</span>
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
                      Seattle, WA, March 15th, 2021 – Pondr, a leading
                      technology company providing detailed product analytics
                      and product feedback to companies using GPT-3, today
                      announced its induction into Microsoft for Startups, a
                      global program dedicated to accelerating the trajectory of
                      high-potential startups to enable growth at scale. As a
                      program member, Pondr will have exclusive access to
                      Microsoft technology, mentorship, and business support.
                    </p>
                    <p className="mb-8">
                      Pondr's central mission is to facilitate truth and
                      authenticity on the internet, in a world where over 40% of
                      online reviews are fake or unreliable. Pondr aims to
                      provide companies the qualitative product feedback and
                      product reviews they need to scale their business, by
                      using their innovative Product Analysis Tool which
                      harnesses the power of GPT-3, Natural Language Processing,
                      and internet scraping to extract detailed information
                      about products. Some of this vital data includes pros/cons
                      about a product, customer sentiment toward a product,
                      product sentiment trend over time, the likelihood of
                      product recommendation, how their product compares to its
                      competitors, and much more. This information is given in
                      the form of an interactive report on their platform which
                      is simplified using charts, graphs, and diagrams to
                      pinpoint areas of improvement for marketing or product
                      development.
                    </p>

                    <p className="mb-8">
                      They have also developed an innovative AI Review Q & A
                      System for companies that take in any question about their
                      customer reviews and gives a detailed response with
                      tangible feedback for what they could improve on.
                    </p>

                    <p className="mb-8">
                      On their platform, "Review Gurus" are consumers who will
                      receive free products from companies in exchange for
                      writing informative, thorough, and unbiased reviews about
                      the product, following a 10-point criterion, which allows
                      companies to receive vital feedback and data points in a
                      focus group-like setting. This can be used to tailor their
                      products and approach to their customer's needs for a
                      fraction of the cost compared to traditional focus groups.
                    </p>

                    <p className="mb-8">
                      Pondr will utilize Microsoft's powerful Azure resources
                      and marketplace to reach a wide-scale audience in a short
                      time, with built-in redundancy and security, and automate
                      their product review experience for Review Gurus, and
                      provide companies with a streamlined B2B solution. Pondr
                      will be using Azure to host their API using App Service
                      and testing the later version of their API with Azure
                      Kubernetes Service. They are also using Azure for hosting
                      their containerized web app. In the future, they plan on
                      utilizing Azure's AI/ML Pipeline to further develop their
                      intelligent Review Q & A System.
                    </p>

                    <p className="mb-8">
                      “We’re honored to be among such a select group of
                      companies from around the world chosen to join the
                      Microsoft for Startups program, and we plan to leverage
                      this amazing opportunity to its fullest,” said Akshay
                      Murthy, Co-Founder & CMO of Pondr, "Our participation in
                      the program comes at a critical time for our company as we
                      launch our product analytics and feedback platform for
                      customers on June 1st.”
                    </p>

                    <p className="mb-8">
                      “Pondr's mission to address an unresolved problem in one
                      of the fastest-growing segments of the retail and
                      e-commerce industry is a great fit for the program. We
                      look forward to helping Pondr deliver their innovative
                      solution to our joint customers,” said ShiSh Shridhar,
                      Microsoft for Startups.
                    </p>

                    <figure className="mb-8">
                      <img
                        className="w-full rounded"
                        src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-msfst.webp?alt=media&token=99fb8b2b-6dc6-49b4-87d8-f1101d96dc08"}
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

export default PostSingle3;
