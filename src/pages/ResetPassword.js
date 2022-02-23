import React, { useEffect, useState } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import firebase from "firebase/app";
import Header from "../partials/Header";
import { withRouter } from "react-router-dom";
import { logFirestoreEvent } from "../merlinv1/beta_api";

const ResetPassword = (props) => {
  // State for the screen
  const [email, setEmail] = useState("");

  const handleSubmit = (e, history) => {
    e.preventDefault();

    firebase
      .auth()
      .sendPasswordResetEmail(email.trim())
      .then(
        function () {
          // Email sent.
          alert(
            "Please check your email " + email.trim() + " for instructions "
          );
          history.push("/signin");
        },
        function (error) {
          alert("sorry an error has occured, Please try again");
        }
      );
    logFirestoreEvent("ResetPassword", { email: email });
  };

  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("ResetPasswor");
    logEvent("page_view", { page_name: "ResetPasswor" });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Let’s get you back up on your feet</h1>
                <p className="text-xl text-gray-600">
                  Enter the email address you used when you signed up for your
                  account, and we’ll email you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form
                  onSubmit={(e) => {
                    handleSubmit(e, props.history);
                  }}
                >
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-pondr hover:bg-blue-pondrdark w-full">
                        Send reset link
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default withRouter(ResetPassword);
