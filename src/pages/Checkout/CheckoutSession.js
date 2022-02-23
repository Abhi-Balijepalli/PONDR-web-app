// This is the screen which will contain the checkout session steps for users to use to checkout
import React, { useState, useEffect } from "react";
import Wrapper from "../../utils/Wrapper";
import * as FaIcons from "react-icons/fa";
import CheckoutStep1 from "./CheckoutStep1";
import CheckoutStep2 from "./CheckoutStep2";
import { useLocation, useHistory } from "react-router";
import CheckoutStep3 from "./CheckoutStep3";
import {
  attachPaymentToCustomer,
  createStripePayment,
  createProduct,
  logFirestoreEvent,
  subscribeCustomer,
} from "../../merlinv1/beta_api";
import { connect } from "react-redux";
import {
  logScreenName,
  logEvent,
  logFBEvent,
} from "../../utils/CommonFunctions";

// Creates the react component
const CheckoutSession = (props) => {
  // This indiciates the selected tab
  const [selectedTab, setSelectedTab] = useState(0);
  const [paymentInformation, setPaymentInformation] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [defaultPayment, setDefaultPayment] = useState(false);

  // The location hook
  const location = useLocation();
  const history = useHistory();

  // Fetches product information from location.state
  let { productName, stripeCustomer } = location.state;
  stripeCustomer = JSON.parse(stripeCustomer);

  // Logs screen analytics
  useEffect(() => {
    logFirestoreEvent("CheckoutStep1View", { email: props.user.email });
    logScreenName("CheckoutStep1");
    logFBEvent("CheckoutStep1", {});
    logEvent("page_view", { page_name: "CheckoutStep1" });
  }, []);

  // This is the method that is going to checkout for the user once the checkout session has been completed
  const checkout = async (priceToCharge, codeApplied) => {
    setIsCheckingOut(true);

    logFirestoreEvent("PaymentAttempt", {
      email: props.user.email,
      priceCharged: priceToCharge,
    });
    // First, attaches the payment to the customer in Stripe if new payment info
    let stripeID = "";
    if (defaultPayment === false) {
      const paymentID = paymentInformation.paymentMethod.id;
      stripeID = (await attachPaymentToCustomer(paymentID)).data
        .customer_stripe_id;
    } else {
      stripeID = stripeCustomer.stripe_customer.id;
    }
    // Charges the customer the one time charge
    await subscribeCustomer(stripeID, codeApplied);

    if (productName !== "NO_PRODUCT") {
      const {
        amazonLink,
        category,
        competitorsFlag,
        displayName,
      } = location.state;
      // Creates the product
      await createProduct(
        displayName,
        productName,
        amazonLink,
        category,
        competitorsFlag
      );
      logFirestoreEvent("ProductCreated", { email: props.user.email });
      logFBEvent("ProductCreated", {});
    }
    logFBEvent("PaymentSuccess", {});
    logFirestoreEvent("PaymentAttemptSuccess", {
      email: props.user.email,
      priceCharged: priceToCharge,
    });

    setIsCheckingOut(false);
    history.push("/enterprise/product/");
  };

  // Creates the initial plan information (More plans would be available in the future)
  const planPrice = 15;
  const planFeatures = [
    {
      title: "Unlimited Product Analytics",
      included: true,
    },
    {
      title: "Ask Data",
      included: true,
    },
    {
      title: "Categorized Reviews",
      included: true,
    },
    {
      title: "Product Comparison",
      included: true,
    },
    {
      title: "Export analytics graphs",
      included: true,
    },
  ];

  // Array of different titles based on the index
  const arrayOfTitles = [
    {
      title: "Review Your Purchase",
      subtitle: "You are a few steps away from product greatness",
    },
    {
      title: "Billing Information",
      subtitle: "Just one more step before your product gets an upgrade",
    },
    {
      title: "Checkout",
      subtitle: "This is it. Get ready to fly by your competition",
    },
  ];

  // Returns the UI
  return (
    <Wrapper isGrey={true}>
      <div className={"w-full flex flex-col pb-5"}>
        <div className={"ml-24 mt-18"}>
          <p className={"text-5xl text-blue-pondrgray font-bold"}>
            {arrayOfTitles[selectedTab].title}
          </p>
          <p className={"text-2xl mt-5 text-blue-pondr font-normal"}>
            {arrayOfTitles[selectedTab].subtitle}
          </p>
        </div>
        <div
          className={
            "flex items-center w-3/5 justify-between self-center mt-10"
          }
        >
          {["Review Purchase", "Billing Information", "Checkout"].map(
            (eachStep, index) => (
              <div
                className={
                  index < selectedTab
                    ? "flex flex-col items-center cursor-pointer"
                    : "flex flex-col items-center"
                }
                onClick={() => {
                  if (index < selectedTab) {
                    setSelectedTab(index);
                  }
                }}
              >
                <div
                  className={
                    "w-16 h-16 flex items-center justify-center rounded-full bg-purple-light mb-5"
                  }
                >
                  {index < selectedTab ? (
                    <FaIcons.FaCheck color={"#7779FC"} size={20} />
                  ) : (
                    <p className={"text-xl text-blue-pondr"}>{index + 1}</p>
                  )}
                </div>
                <p
                  className={
                    selectedTab === index
                      ? "text-xl font-semibold text-center"
                      : "text-xl font-normal text-center"
                  }
                >
                  {eachStep}
                </p>
              </div>
            )
          )}
        </div>
        <div
          className={
            "self-center w-full flex items-center justify-center mt-10"
          }
        >
          {
            [
              <CheckoutStep1
                productName={
                  productName.length > 20
                    ? productName.substring(0, 20) + "..."
                    : productName
                }
                price={planPrice}
                features={planFeatures}
                onNextClick={() => {
                  setSelectedTab(1);
                  logScreenName("CheckoutStep2");
                  logFirestoreEvent("CheckoutStep2View", {
                    email: props.user.email,
                  });
                  logEvent("page_view", { page_name: "CheckoutStep2" });
                  logFBEvent("CheckoutStep2", {});
                }}
              />,
              <CheckoutStep2
                stripeCustomer={stripeCustomer}
                user={props.user}
                paymentInformation={paymentInformation}
                onNextClick={(paymentInformation) => {
                  if (paymentInformation === "DEFAULT_PAYMENT_INFORMATION") {
                    setPaymentInformation({
                      paymentMethod: stripeCustomer.payment_method,
                    });
                    setDefaultPayment(true);
                  } else {
                    setPaymentInformation(paymentInformation);
                  }
                  setSelectedTab(2);
                  logScreenName("CheckoutStep3");
                  logFirestoreEvent("CheckoutStep3View", {
                    email: props.user.email,
                  });
                  logEvent("page_view", { page_name: "CheckoutStep3" });
                  logFBEvent("CheckoutStep3", {});
                }}
              />,
              <CheckoutStep3
                productName={
                  productName.length > 20
                    ? productName.substring(0, 20) + "..."
                    : productName
                }
                price={planPrice}
                paymentInformation={paymentInformation}
                features={planFeatures}
                isCheckingOut={isCheckingOut}
                onCheckout={(priceToCharge, codeApplied) => {
                  checkout(priceToCharge, codeApplied);
                }}
                goToPaymentInfo={() => setSelectedTab(1)}
              />,
            ][selectedTab]
          }
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(CheckoutSession);
