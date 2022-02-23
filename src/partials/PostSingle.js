import React from "react";
import { Link } from "react-router-dom";

function PostSingle() {
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
                  Welcome to the Pondr Publisher!
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
                      The internet is about to go through a cataclysmic shift,
                      where truth and authenticity are at the forefront. From a
                      factual dictionary to the most outlandish conspiracy
                      theory, anything can be found on the internet. Because of
                      this, for every piece of real content, we run into
                      something made up, faked for one purpose or another. Often
                      left behind in this fight against fake information is the
                      everyday consumer. As more and more shopping occurs
                      online, it is critical that consumers know what to buy,
                      where to buy, and how to buy. As we attempt to change the
                      way that consumers buy and learn about products, the team
                      at Pondr is constantly uncovering information around
                      consumer purchasing, ways people are scammed, the best
                      places to buy products, and who you should really trust.
                      With authenticity and integrity at our core, we are
                      creating the Pondr Publisher as a way to document these
                      findings and help consumers change the way they purchase.
                      Our blogs will illustrate problems within the e-commerce
                      world, the ways companies sell you products, how to avoid
                      falling into traps of online scammers, and much more.
                      Beyond all else, we look to help our readers improve their
                      knowledge of navigating the online mall that is e-commerce
                      as well as showing them examples of honest and respectable
                      companies through our Company Spotlight. Beyond
                      educational blogs, the Pondr Publisher will act as a
                      behind the scenes of what we do at Pondr, in our
                      never-ending goal of transparency. Readers will be able to
                      see our journey as we seek out new, authentic Suppliers
                      and build out our vibrant community of truth crusaders.
                    </p>
                    <p className="mb-8">Join the fight, Join the Club!</p>

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

export default PostSingle;
