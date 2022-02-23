// This is the second step of the CheckoutSession
import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import ReactLoading from "react-loading";
import * as FaIcons from "react-icons/fa";

// This is the form schema for this screen
const CompanySignUpFormSchema = Yup.object({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("Invalid Email")
    .required("Email address is required is required."),
  phoneNum: Yup.string()
    .required("Phone Number is required.")
    .matches(/^[0-9]+$/, "Must be only digits."),
  addressLine1: Yup.string().required("Line 1 of address is required."),
  addressLine2: Yup.string(),
  city: Yup.string().required("City is required."),
  zipCode: Yup.string().required("Zip code is required."),
});

// Creates the component
const CheckoutStep2 = ({
  onNextClick,
  stripeCustomer,
  paymentInformation,
  user,
}) => {
  // The state variables for the screen
  const [country, setCountry] = useState(
    paymentInformation === "" ? "" : paymentInformation.country
  );
  const [countryError, setCountryError] = useState(false);
  const [region, setRegion] = useState(
    paymentInformation === "" ? "" : paymentInformation.region
  );
  const [regionError, setRegionError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBilling, setShowBilling] = useState(
    stripeCustomer.payment_method === null || paymentInformation !== ""
  );

  // The stripe hooks for the screen
  const elements = useElements();
  const stripe = useStripe();

  // Creates the form values to be used below
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(CompanySignUpFormSchema),
    defaultValues: {
      firstName: paymentInformation === "" ? "" : paymentInformation.firstName,
      lastName: paymentInformation === "" ? "" : paymentInformation.lastName,
      email: paymentInformation === "" ? user.email : paymentInformation.email,
      phoneNum: paymentInformation === "" ? user.phoneNumber : paymentInformation.phoneNum,
      addressLine1:
        paymentInformation === "" ? "" : paymentInformation.addressLine1,
      addressLine2:
        paymentInformation === "" ? "" : paymentInformation.addressLine2,
      city: paymentInformation === "" ? "" : paymentInformation.city,
      zipCode: paymentInformation === "" ? "" : paymentInformation.zipCode,
    },
  });

  // Handles the submission of this form
  const onSubmit = async (data) => {
    // Tracks whether there are errors or not
    let isError = false;

    // Handles non-Yup errors
    if (country === "") {
      setCountryError(true);
      isError = true;
    }
    if (region === "") {
      setRegionError(true);
      isError = true;
    }

    if (isError === false) {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          address: {
            city: data.city,
            country: country,
            line1: data.addressLine1,
            line2: data.addressLine2,
            state: region,
          },
          email: data.email,
          name: data.firstName + " " + data.lastName,
          phone: data.phoneNum,
        },
      });

      if (error) {
        setCardError(true);
        setIsLoading(false);
      } else {
        // Constructs the payment information
        const paymentInformation = {
          ...data,
          paymentMethod: paymentMethod,
          country,
          region,
        };
        setIsLoading(false);
        onNextClick(paymentInformation);
      }
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // Returns a default payment UI if a customer has inputted
  if (!showBilling) {
    return (
      <div
        data-aos="fade-right"
        className={"w-full flex flex-col justify-center items-center"}
      >
        <div
          className={
            "w-3/5 p-6 bg-white rounded-xl shadow-xl flex flex-col mt-5"
          }
        >
          <div className={"flex w-full items-center justify-between"}>
            <p className={"text-2xl ml-5 font-semibold"}>Payment Information</p>
            <p
              className={
                "text-md text-blue-pondr font-semibold cursor-pointer focus:outline-none"
              }
              onClick={() => {
                setShowBilling(true);
              }}
            >
              Edit Payment Information
            </p>
          </div>
          <div
            className={
              "w-11/12 self-center bg-gray-light rounded-xl px-8 py-5 pt-5 mt-10 mb-10 flex items-center"
            }
          >
            <div className={"p-5 bg-white rounded-full"}>
              <FaIcons.FaCreditCard color={"#7779FC"} size={35} />
            </div>
            <div className={"ml-10 flex flex-col items-start"}>
              <p className={"text-gray-400 font-semibold text-xl mb-2"}>
                {(
                  stripeCustomer.payment_method.card.brand +
                  " " +
                  stripeCustomer.payment_method.card.funding
                )
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </p>
              <p className={"text-blue-pondrgray font-semibold text-xl mb-2"}>
                •••• •••• •••• {stripeCustomer.payment_method.card.last4}
              </p>
              <p className={"text-blue-pondrgray font-semibold text-xl"}>
                {stripeCustomer.payment_method.billing_details.name}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            onNextClick("DEFAULT_PAYMENT_INFORMATION");
          }}
          className={
            "outline-none mt-10 text-2xl focus:outline-none rounded-full shadow-xl border-0 px-12 py-5 flex items-center justify-center bg-blue-pondr btn text-white hover:bg-purple-light hover:text-blue-pondr self-center"
          }
        >
          Next
        </button>
      </div>
    );
  }

  // Returns the UI
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={"w-full flex flex-col justify-center items-center"}
      data-aos="fade-right"
    >
      <div
        className={
          "w-3/5 p-6 bg-white rounded-xl shadow-xl flex flex-col pb-10"
        }
      >
        <p className={"text-3xl font-semibold"}>Billing Information</p>
        <div
          className={"flex justify-between items-center w-full flex-wrap mt-5"}
        >
          <Input
            className="w-1/2 mb-8"
            name="firstName"
            label="First name"
            placeholder="First name..."
            type="text"
            required
            ref={register}
            errors={errors}
            autocomplete="given-name"
          />
          <Input
            className="w-1/2 mb-8"
            name="lastName"
            label="Last name"
            placeholder="Last name..."
            type="text"
            required
            ref={register}
            errors={errors}
            autocomplete="family-name"
          />
          <Input
            className="w-1/2 mb-8"
            name="email"
            label="Email Address"
            placeholder="Email address..."
            type="email"
            required
            ref={register}
            errors={errors}
            autocomplete="email"
          />
          <Input
            className="w-1/2 mb-8"
            name="phoneNum"
            label="Phone Number"
            placeholder="Phone number..."
            type="text"
            required
            ref={register}
            errors={errors}
            autocomplete="tel"
          />
          <Input
            className="w-full mb-8"
            name="addressLine1"
            label="Address Line 1"
            placeholder="Address line 1..."
            type="text"
            required
            ref={register}
            errors={errors}
            autocomplete="address-line1"
          />
          <Input
            className="w-full mb-8"
            name="addressLine2"
            label="Address Line 2"
            placeholder="Address line 2..."
            type="text"
            ref={register}
            errors={errors}
            autocomplete="address-line2"
          />
          <p
            className={
              "w-5/12 ml-3 block text-gray-800 text-sm font-medium mb-1"
            }
          >
            Country<span className={" text-red-600"}>{"*"}</span>
          </p>
          <p
            className={
              "mr-3 w-5/12 block text-gray-800 text-sm font-medium mb-1"
            }
          >
            Region<span className={" text-red-600"}>{"*"}</span>
          </p>
          <CountryDropdown
            valueType={"short"}
            classes={
              "w-5/12 ml-3 py-2 border border-gray-200 border-solid rounded-md"
            }
            value={country}
            onChange={(newCountry) => {
              if (newCountry.length === 0) {
                setCountry("");
                setCountryError(true);
                setRegion("");
                setRegionError(true);
              } else {
                setCountry(newCountry);
                setCountryError(false);
              }
            }}
          />
          <RegionDropdown
            classes={
              "w-5/12 mr-3 py-2 border border-gray-200 border-solid rounded-md"
            }
            country={country}
            value={region}
            countryValueType="short"
            onChange={(newRegion) => {
              setRegion(newRegion);
              setRegionError(false);
            }}
          />
          {countryError ? (
            <p
              className={
                "mr-3 ml-3 w-5/12 block text-red-600 text-sm font-medium mb-5"
              }
            >
              Country is required
            </p>
          ) : (
            <div className={"w-1/2 mb-8"} />
          )}
          {regionError ? (
            <p
              className={
                "mr-3 w-5/12 block text-red-600 text-sm font-medium mb-5"
              }
            >
              Region is required
            </p>
          ) : (
            <div className={"w-1/2 mb-8"} />
          )}
          <Input
            className="w-1/2 mb-8"
            name="city"
            label="City"
            placeholder="City..."
            type="text"
            required
            ref={register}
            errors={errors}
            autocomplete="city"
          />
          <Input
            className="w-1/2 mb-8"
            name="zipCode"
            label="Postal or Zip code"
            placeholder="Postal or zip code..."
            type="text"
            ref={register}
            required
            errors={errors}
            autocomplete="postal-code"
          />
          <p
            className={
              "w-11/12 mx-auto block text-gray-800 text-sm font-medium mb-1"
            }
          >
            Card Information<span className={" text-red-600"}>{"*"}</span>
          </p>
          <div
            className={
              "w-11/12 px-2 py-5 border border-solid border-gray-200 rounded-md mx-auto"
            }
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          {cardError ? (
            <p
              className={
                "mr-3 ml-6 w-5/12 block text-red-600 text-sm font-medium mt-2"
              }
            >
              Payment information is invalid.
            </p>
          ) : (
            <div className={"w-1/2 mb-8"} />
          )}
        </div>
      </div>
      {isLoading ? (
        <div
          className={"mt-10 w-full flex items-center justify-center mx-auto"}
        >
          <ReactLoading
            type={"spin"}
            color={"#7779FC"}
            height={"3%"}
            width={"3%"}
          />
        </div>
      ) : (
        <button
          type={"submit"}
          className={
            "outline-none mt-10 text-2xl focus:outline-none rounded-full shadow-xl border-0 px-12 py-5 flex items-center justify-center bg-blue-pondr btn text-white hover:bg-purple-light hover:text-blue-pondr self-center"
          }
        >
          Next
        </button>
      )}
    </form>
  );
};

// Exports the component
// Loads the stripe promise
const stripePromise = loadStripe(
  window.location.host === "www.letspondr.com"
    ? "pk_live_51J5wtwCDrAwlb0oIkqRDPeqXOFdVuutFwY529PZw6eFQKPlUZMe9wkFGRin965tcxiLxtjaNHrHwjwAWD1e5gQNV00y1jSfb90"
    : "pk_test_51J5wtwCDrAwlb0oIBDf0GFFiB9Idj95TnOQfXM5H3OmkB9MDVp4utYVahP4omKa31h32kS2w5i4EIyTPCJKn0VYd00QXUbvvI9"
);

// Exports the component
export default ({ onNextClick, stripeCustomer, paymentInformation, user }) => (
  <Elements stripe={stripePromise}>
    <CheckoutStep2
    user={user}
      onNextClick={onNextClick}
      stripeCustomer={stripeCustomer}
      paymentInformation={paymentInformation}
    />
  </Elements>
);
