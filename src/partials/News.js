import React from "react";
import { Link } from "react-router-dom";

function News() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 text-gray-800">Interested? Read more on our blog</h2>
          </div>

          {/* Articles list */}
          <div className="max-w-sm mx-auto md:max-w-none">
            <div className="grid gap-12 md:grid-cols-3 md:col-gap-6 md:row-gap-8 items-start">
              {/* 1st article */}
              <article
                className="flex flex-col h-full"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <header>
                  <Link to="/launch-announcement" className="block mb-6">
                    <figure className="relative h-0 pb-9/16 overflow-hidden translate-z-0 rounded">
                      <img
                        className="absolute inset-0 w-full h-full object-cover transform scale-105 translate-z-0 hover:-translate-y-1 transition duration-700 ease-out"
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fabout-us_25.webp?alt=media&token=99a79acf-2484-448a-adc4-093aca7ab2f0"
                        }
                        width="352"
                        height="198"
                        alt="News 03"
                      />
                    </figure>
                  </Link>
                  <h3 className="text-xl font-bold leading-snug tracking-tight">
                    <Link to="/launch-announcement" className="hover:underline">
                      “Pondr, Welcome to the World”
                    </Link>
                  </h3>
                </header>
                <footer className="text-sm flex items-center mt-4">
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
                        }width="32"
                        height="32"
                        alt="Author 01"
                      />
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-600">By </span>
                    <a className="font-medium hover:underline" href="#0">
                      Graham Sabin
                    </a>
                  </div>
                </footer>
              </article>

              {/* 2nd article */}
              <article
                className="flex flex-col h-full"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <header>
                  <Link to="/blog-post3" className="block mb-6">
                    <figure className="relative h-0 pb-9/16 overflow-hidden translate-z-0 rounded">
                      <img
                        className="absolute inset-0 w-full h-full object-cover transform scale-105 translate-z-0 hover:-translate-y-1 transition duration-700 ease-out"
                        src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2Fpondr-msfst.webp?alt=media&token=99fb8b2b-6dc6-49b4-87d8-f1101d96dc08"}
                        width="352"
                        height="198"
                        alt="News 03"
                      />
                    </figure>
                  </Link>
                  <h3 className="text-xl font-bold leading-snug tracking-tight">
                    <Link to="/blog-post3" className="hover:underline">
                      “Pondr Selected for Microsoft for Startups Designed to
                      Help Startups Quickly Scale”
                    </Link>
                  </h3>
                </header>
                <footer className="text-sm flex items-center mt-4">
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
                        alt="Author 01"
                      />
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-600">By </span>
                    <a className="font-medium hover:underline" href="#0">
                      Akshay Murthy
                    </a>
                  </div>
                </footer>
              </article>

              {/* 3rd article */}
              <article
                className="flex flex-col h-full"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                <header>
                  <Link to="/blog-post2" className="block mb-6">
                    <figure className="relative h-0 pb-9/16 overflow-hidden translate-z-0 rounded">
                      <img
                        className="absolute inset-0 w-full h-full object-cover transform scale-105 translate-z-0 hover:-translate-y-1 transition duration-700 ease-out"
                        src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FAmazon-garage-delivery-porch-pirates-retail.webp?alt=media&token=a9a6fb01-c852-4c74-b2f9-cc995d35f5c3"}
                        width="352"
                        height="198"
                        alt="News 02"
                      />
                    </figure>
                  </Link>
                  <h3 className="text-xl font-bold leading-snug tracking-tight">
                    <Link to="/blog-post2" className="hover:underline">
                      “The 5 Star Review System: A Consumer Nightmare”
                    </Link>
                  </h3>
                </header>
                <footer className="text-sm flex items-center mt-4">
                  <div className="flex flex-shrink-0 mr-3">
                    <a className="relative -ml-2" href="#0">
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
                        } width="32"
                        height="32"
                        alt="Author 03"
                      />
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-600">By </span>
                    <a className="font-medium hover:underline" href="#0">
                      Graham Sabin
                    </a>
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;
