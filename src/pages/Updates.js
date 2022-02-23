import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import Footer from "../partials/Footer";
import ReactLoading from "react-loading";
import { getSoftwarePatch, logFirestoreEvent } from "../merlinv1/beta_api";
import { useHistory } from "react-router-dom";
import MetaTags from 'react-meta-tags';


const Updates = () => {
  // State to store the update notes
  const [isLoading, setIsLoading] = useState(true);
  const [updateNotes, setUpdateNotes] = useState("");

  const history = useHistory();

  // useEffect fetches the update notes
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("Updates");
    logEvent("page_view", { page_name: "Updates" });

    // Helper for the useEffect
    const fetchSoftwareNotes = async () => {
      try {
        const response = await getSoftwarePatch();
        let updates = response.data[Object.keys(response.data)[0]];
        updates.sort((a, b) => new Date(b.date) - new Date(a.date));
        setUpdateNotes(updates);
        setIsLoading(false);
      } catch (error) {
        logFirestoreEvent("404Error", { err: error });
        history.push("/ErrorPage");
      }
    };

    fetchSoftwareNotes();
  }, []);

  // isLoading state
  if (isLoading) {
    return (
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <ReactLoading
          type={"spin"}
          color={"#7779FC"}
          height={"5%"}
          width={"5%"}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <MetaTags>
          <title>Product Updates</title>
          <meta
            name="description"
            content="Detailed documentation about the newest updates for our product. At Pondr, we are constantly improving our tools and platform to help you build the best product!"
          />
          <meta property="og:title" content="Pondr | Product Updates" />
        </MetaTags>

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 mt-10">
          <div className="pt-10 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-left pb-5">
              <h1 className="h2 mb-4">Updates</h1>
              <h2 className="text-xl">Notes about what we've rolled out.</h2>
            </div>
          </div>

          {/* Renders the updates */}
          {updateNotes.map((eachUpdate) => (
            <div className="max-w-3xl mx-auto text-left pb-20 md:pb-16">
              <h1 className="h3 mb-1 text-blue-pondr pb-1">
                {eachUpdate.title}
              </h1>
              <p className="text-1 mb-1 text-blue-pondr pb-1">
                {eachUpdate.date}
              </p>
              <ul className={"ml-5"}>
                {eachUpdate.updates.map((eachNote) => (
                  <li className={"list-disc mb-2"}>{eachNote}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
};

export default Updates;
