import React from "react";
import { Link } from "react-router-dom";

function BlogList() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl pb-12 md:pb-20 text-center md:text-left">
            <h1 className="h1 mb-4">Welcome to the Pondr Publisher. </h1>
            <p className="text-xl text-gray-600">
              Immerse yourself in weekly content featuring in-depth discussions
              about consumer products, current industry trends, and why consumer
              reviews can make or break a business. Enjoy!
            </p>
          </div>

          {/* Main content */}
          <div className="md:flex md:justify-between">
            {/* Articles container */}
            <div className="md:flex-grow -mt-4">
              {/* 1st article */}
              <article className="flex items-center py-4 border-b border-gray-200">
                <div>
                  <header>
                    <h2 className="h4 mb-2">
                      <Link
                        to="/blog-post"
                        className="hover:underline outline-none"
                      >
                        Welcome to the Pondr Publisher!
                      </Link>
                    </h2>
                  </header>
                  <div className="text-lg text-gray-600 mb-4">
                    In this post, you will get introduced to our blog and our
                    blossoming community of truth seakers.
                  </div>
                  <footer className="text-sm">
                    <div className="flex items-center">
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
                        <span className="text-gray-600"> · Jan 4 2020</span>
                      </div>
                    </div>
                  </footer>
                </div>
                <Link
                  to="/blog-post"
                  className="block flex-shrink-0 ml-6 outline-none"
                >
                  <span className="sr-only">Read more</span>
                  <svg
                    className="w-4 h-4 fill-current text-blue-600"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
                  </svg>
                </Link>
              </article>

              {/* 2nd article */}
              <article className="flex items-center py-4 border-b border-gray-200">
                <div>
                  <header>
                    <h2 className="h4 mb-2">
                      <Link
                        to="/blog-post2"
                        className="hover:underline outline-none"
                      >
                        The 5 Star Review System: A Consumer Nightmare
                      </Link>
                    </h2>
                  </header>
                  <div className="text-lg text-gray-600 mb-4">
                    Ever wonder why so many products have 5 stars? have these
                    ranking lost all meaning? Read this weeks blog to find out
                    (but you can probably guess the answer is yet)
                  </div>
                  <footer className="text-sm">
                    <div className="flex items-center">
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
                            alt="Author 01"
                          />
                        </a>
                      </div>
                      <div>
                        <span className="text-gray-600">By </span>
                        <a className="font-medium hover:underline" href="#0">
                          Graham Sabin
                        </a>
                        <span className="text-gray-600"> · July 19, 2020</span>
                      </div>
                    </div>
                  </footer>
                </div>
                <Link
                  to="/blog-post2"
                  className="block flex-shrink-0 ml-6 outline-none"
                >
                  <span className="sr-only">Read more</span>
                  <svg
                    className="w-4 h-4 fill-current text-blue-600"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
                  </svg>
                </Link>
              </article>

              {/* 3rd article */}
              <article className="flex items-center py-4 border-b border-gray-200">
                <div>
                  <header>
                    <h2 className="h4 mb-2">
                      <Link
                        to="/blog-post3"
                        className="hover:underline outline-none"
                      >
                        Pondr Selected for Microsoft for Startups Designed to
                        Help Startups Quickly Scale
                      </Link>
                    </h2>
                  </header>
                  <div className="text-lg text-gray-600 mb-4">
                    Just a little company update
                  </div>
                  <footer className="text-sm">
                    <div className="flex items-center">
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
                  </footer>
                </div>
                <Link
                  to="/blog-post3"
                  className="block flex-shrink-0 ml-6 outline-none"
                >
                  <span className="sr-only">Read more</span>
                  <svg
                    className="w-4 h-4 fill-current text-blue-600"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
                  </svg>
                </Link>
              </article>

              <article className="flex items-center py-4 border-b border-gray-200">
                <div>
                  <header>
                    <h2 className="h4 mb-2">
                      <Link
                        to="/launch-announcement"
                        className="hover:underline outline-none"
                      >
                        Pondr, Welcome to the World
                      </Link>
                    </h2>
                  </header>
                  <div className="text-lg text-gray-600 mb-4">
                    Our launch blog!
                  </div>
                  <footer className="text-sm">
                    <div className="flex items-center">
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
                  </footer>
                </div>
                <Link
                  to="/launch-announcement"
                  className="block flex-shrink-0 ml-6 outline-none"
                >
                  <span className="sr-only">Read more</span>
                  <svg
                    className="w-4 h-4 fill-current text-blue-600"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
                  </svg>
                </Link>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="relative mt-12 md:mt-0 md:w-64 md:ml-12 lg:ml-20 md:flex-shrink-0">
              {/* Popular posts */}
              <div className="mb-8">
                <h4 className="text-lg font-bold leading-snug tracking-tight mb-4">
                  Popular on Pondr
                </h4>
                <ul className="-my-2">
                  <li className="flex py-2 border-b border-gray-200">
                    <svg
                      className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 mt-1 mr-3"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
                    </svg>
                    <article>
                      <h3 className="font-medium mb-1">
                        <Link
                          to="/blog-post"
                          className="hover:underline outline-none"
                        >
                          Welcom to the Pondr Publisher!
                        </Link>
                      </h3>
                      <div className="text-sm text-gray-800">
                        <span className="text-gray-600">By </span>
                        <a className="font-medium hover:underline" href="#0">
                          Graham Sabin
                        </a>
                      </div>
                    </article>
                  </li>
                </ul>
              </div>

              {/* Topics */}
              <div>
                {/* <h4 className="text-lg font-bold leading-snug tracking-tight mb-4">Topics</h4>
                <ul className="-my-2">
                  <li className="flex py-2 border-b border-gray-200">
                    <svg className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 mt-1 mr-3" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.99 15h2.02l.429-3h3.979l-.428 3h2.02l.429-3H14v-2h-2.275l.575-4H15V4h-2.418l.428-3h-2.02l-.429 3H6.582l.428-3H4.99l-.429 3H2v2h2.275L3.7 10H1v2h2.418l-.428 3zM6.3 6h3.979L9.7 10H5.725L6.3 6z" />
                    </svg>
                    <div className='font-medium mb-1'>
                      <a className='hover:underline' href='#0'>
                        Reviews
                      </a>
                    </div>
                  </li>
                  <li className='flex py-2 border-b border-gray-200'>
                    <svg className='w-4 h-4 flex-shrink-0 fill-current text-gray-400 mt-1 mr-3' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M2.99 15h2.02l.429-3h3.979l-.428 3h2.02l.429-3H14v-2h-2.275l.575-4H15V4h-2.418l.428-3h-2.02l-.429 3H6.582l.428-3H4.99l-.429 3H2v2h2.275L3.7 10H1v2h2.418l-.428 3zM6.3 6h3.979L9.7 10H5.725L6.3 6z' />
                    </svg>
                    <div className='font-medium mb-1'>
                      <a className='hover:underline' href='#0'>
                        Progress
                      </a>
                    </div>
                  </li>
                  <li className='flex py-2 border-b border-gray-200'>
                    <svg className='w-4 h-4 flex-shrink-0 fill-current text-gray-400 mt-1 mr-3' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M2.99 15h2.02l.429-3h3.979l-.428 3h2.02l.429-3H14v-2h-2.275l.575-4H15V4h-2.418l.428-3h-2.02l-.429 3H6.582l.428-3H4.99l-.429 3H2v2h2.275L3.7 10H1v2h2.418l-.428 3zM6.3 6h3.979L9.7 10H5.725L6.3 6z' />
                    </svg>
                    <div className='font-medium mb-1'>
                      <a className='hover:underline' href='#0'>
                        Review Gurus
                      </a>
                    </div>
                  </li>
                  <li className='flex py-2'>
                    <svg className='w-4 h-4 flex-shrink-0 fill-current text-gray-400 mt-1 mr-3' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M2.99 15h2.02l.429-3h3.979l-.428 3h2.02l.429-3H14v-2h-2.275l.575-4H15V4h-2.418l.428-3h-2.02l-.429 3H6.582l.428-3H4.99l-.429 3H2v2h2.275L3.7 10H1v2h2.418l-.428 3zM6.3 6h3.979L9.7 10H5.725L6.3 6z' />
                    </svg>
                    <div className='font-medium mb-1'>
                      <a className='hover:underline' href='#0'>
                        Company Spotlight
                      </a>
                    </div>
                  </li>
                </ul> */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogList;
