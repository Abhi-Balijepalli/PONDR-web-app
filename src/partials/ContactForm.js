import React, { useState, useRef } from "react";
import ReactLoading from "react-loading";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { logFirestoreEvent, submitContactForm } from "../merlinv1/beta_api";
import MediaQuery from "react-responsive";
import { useHistory } from "react-router-dom";

// The schema for the contact form
const ContactFormSchema = Yup.object({
  name: Yup.string().required("Person of contact's name is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  message: Yup.string().required("A message is required"),
});

const ContactForm = (props) => {
  // The state variables for the contact form
  const [captchaState, setCaptchaState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // The reCAPTCHA ref to control it
  const reCAPTCHARef = useRef();

  const history = useHistory();

  // Initializes the form's variables
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Handles the ticket information in HubSpot
  const onSubmit = async (data, e) => {
    setIsLoading(true);

    // Gets the data
    const { name, email, phone, message } = data;
    // Attemps to submit the contact form
    try {
      await submitContactForm(name, email, phone, message);
      logFirestoreEvent("ContactUsSuccess", { email: email });
      e.target.reset();
      reCAPTCHARef.current.expire();
    } catch (error) {
      logFirestoreEvent("404 Error", { error: error });
      history.push("/ErrorPage");
    }

    setIsLoading(false);
  };

  return (
    <body>
      <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
      ></link>
      <div class="w3-container">
        {props.circleDisplayed === false ? null : (
          <div>
            <span class="big-circle"></span>
            <img src="img/shape.png" class="square" alt="" />
          </div>
        )}

        <div className={"form"}>
          <div class="contact-info">
            <h3 class="font-bold title">Let's get in touch</h3>
            <p class="text text-l">
              Have a question about our product? We would love to hear your feedback! Or, stop by to say
              hello.
            </p>

            <div class="social-media">
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              ></link>
              <p>Connect with us :</p>
              <a
                href="https://www.facebook.com/letspondr/"
                class="fa fa-facebook"
              ><div/></a>
              <a href="https://twitter.com/letspondr" class="fa fa-twitter"><div/></a>
              <a
                href="https://www.linkedin.com/company/letspondr"
                class="fa fa-linkedin"
              ><div/></a>
              <a
                href="https://www.instagram.com/letspondr/"
                class="fa fa-instagram"
              ><div/></a>
            </div>
          </div>

          <div class="contact-form">
            <span class="circle one"></span>
            <span class="circle two"></span>

            <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
              <h3 class="font-bold title">Contact us</h3>
              <div class="input-container textarea ">
                <input
                  type="text"
                  name="name"
                  className={
                    "w-4/5 outline-none focus:outline-none border-2 border-solid border-gray-light bg-transparent py-1 px-3 text-white rounded-full text-md"
                  }
                  ref={register}
                  placeholder={"Name"}
                />
                <span>Name</span>
              </div>
              <p className="text-sm font-medium text-white">
                <ErrorMessage errors={errors} name={"name"} />
              </p>
              <div class="input-container textarea ">
                <input
                  type="email"
                  name="email"
                  className={
                    "w-4/5 outline-none focus:outline-none border-2 border-solid border-gray-light bg-transparent py-1 px-3 text-white rounded-full text-md"
                  }
                  ref={register}
                  errors={errors}
                  placeholder={"Email"}
                />
                <span>Email</span>
              </div>
              <p className="text-sm font-medium text-white">
                <ErrorMessage errors={errors} name={"email"} />
              </p>
              <div class="input-container textarea ">
                <input
                  type="tel"
                  name="phone"
                  className={
                    "w-4/5 outline-none focus:outline-none border-2 border-solid border-gray-light bg-transparent py-1 px-3 text-white rounded-full text-md"
                  }
                  ref={register}
                  placeholder={"Phone"}
                />
                <span>Phone</span>
              </div>
              <p className="text-sm font-medium text-white">
                <ErrorMessage errors={errors} name={"phone"} />
              </p>
              <div class="input-container textarea ">
                <textarea
                  name="message"
                  className={
                    "w-4/5 outline-none focus:outline-none border-2 border-solid border-gray-light bg-transparent py-1 px-3 text-white rounded-xl text-md"
                  }
                  placeholder={"Message"}
                  ref={register}
                ></textarea>
                <span>Message</span>
              </div>
              <p className="text-sm font-medium text-white">
                <ErrorMessage errors={errors} name={"message"} />
              </p>
              <div className={"w-full justify-between flex mb-5 mt-5"}>
                {/* Adding support for responsive captcha bc Google hasn't made it responsive */}
                <MediaQuery maxWidth={400}>
                  <ReCAPTCHA
                    sitekey="6LdWrzMbAAAAADz6zGr_LS6fkfjNZKXBB4m3UeyI"
                    onChange={(token) => setCaptchaState(token)}
                    onExpired={() => setCaptchaState("")}
                    size={"compact"}
                    ref={reCAPTCHARef}
                  />
                </MediaQuery>
                <MediaQuery minWidth={401}>
                  <ReCAPTCHA
                    sitekey="6LdWrzMbAAAAADz6zGr_LS6fkfjNZKXBB4m3UeyI"
                    onChange={(token) => setCaptchaState(token)}
                    onExpired={() => setCaptchaState("")}
                    size={"normal"}
                    ref={reCAPTCHARef}
                  />
                </MediaQuery>
              </div>
              {isLoading ? (
                <ReactLoading
                  type={"spin"}
                  color={"#FFFFFF"}
                  height={"5%"}
                  width={"5%"}
                />
              ) : (
                <input
                  type="submit"
                  value="Send Message"
                  class={
                    captchaState === ""
                      ? "btn bg-white border-none text-blue-pondr font-semibold"
                      : "btn"
                  }
                  disabled={captchaState === ""}
                />
              )}
            </form>
          </div>
        </div>
      </div>

      <script src="../partials/Contact.js"></script>
    </body>
  );
};

export default ContactForm;
