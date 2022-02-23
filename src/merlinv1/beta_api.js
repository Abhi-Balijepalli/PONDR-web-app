// this file will contain the Axios setup link between API and Front-end
import merlinApp from "../AxiosSetup.js";
import firebase from "firebase/app";
import "firebase/auth";

// POST request functions

// test push graham 3
export const create_review_guru = ({
  firstName,
  lastName,
  email,
  bio,
  uid,
  username,
  address,
  phoneNumber,
  categories,
  gender,
  age_group,
  review_scale,
  outreach_type,
  authCookie,
}) => {
  const data = {
    email: email,
    First_Name: firstName,
    Last_Name: lastName,
    Address: address,
    Bio: bio,
    ProfilePic: "Err",
    UserID: uid,
    Username: username,
    PhoneNumber: phoneNumber,
    Gender: gender,
    Categories: categories,
    Age_group: age_group,
    outreach_type: outreach_type,
    review_scale: 0,
  };
  return new Promise((resolve, reject) => {
    merlinApp
      .post("/review-guru/create", {
        data: {
          email: email,
          First_Name: firstName,
          Last_Name: lastName,
          Address: address,
          Bio: bio,
          ProfilePic: "Dummy",
          UserID: uid,
          Username: username,
          PhoneNumber: phoneNumber,
          Gender: gender,
          Categories: categories,
          Age_group: age_group,
          outreach_type: outreach_type,
          review_scale: 0,
        },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const enterpriseCreate = (
  companyName,
  category,
  phoneNum,
  email,
  password,
  firstname,
  lastname,
  outreachType
) => {
  return merlinApp.post("/auth/enterprise", {
    data: {
      company_name: companyName,
      category: category,
      phone_number: phoneNum,
      email: email,
      password: password,
      first_name: firstname,
      last_name: lastname,
      outreach_type: outreachType,
      company_logo: "dummy",
      survey_questions: "",
    },
  });
};

export const createProduct = async (
  companyName,
  productName,
  amazonLink,
  category,
  competitorsFlag
) => {
  return merlinApp.post(
    "/enterprise/createProduct",
    {
      data: {
        Company_name: companyName,
        Product_name: productName,
        amazon_link: amazonLink,
        Category: category,
        Competitor_flag: competitorsFlag,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

// This method is going to mark a product for reanalysis
export const reanalyzeProduct = async (productID) => {
  return merlinApp.post(
    "/enterprise/reanalyzeProduct",
    {
      data: {
        product_id: productID,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

export const getAdvanceAnalytics = async (productId) => {
  return merlinApp.get("/enterprise/product=" + productId, {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken(),
    },
  });
};

export const getBasicAnalytics = async (productId) => {
  return merlinApp.get("/product=" + productId, {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken(),
    },
  });
};

export const getProductsByCompany = async () => {
  return merlinApp.get("/enterprise/products", {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken(),
    },
  });
};

export const askAiQuestion = async (productId, question) => {
  return merlinApp.post(
    "/enterprise/product=" + productId + "/question",
    {
      data: {
        question: question,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

export const followupAiQuestion = async (
  productId,
  question,
  answer,
  gpt3_response_id,
  gpt3_file_id
) => {
  return merlinApp.post(
    "/enterprise/product=" + productId + "/question/details",
    {
      data: {
        question,
        answer,
        gpt3_response_id,
        gpt3_file_id
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

export const CompareAskAiQuestion = async (productIds, question) => {
  return merlinApp.post(
    "/enterprise/compare/question",
    {
      data: {
        question: question,
        product_ids: productIds,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

export const getAiQuestions = async (productId) => {
  return merlinApp.get("/enterprise/product=" + productId + "/ai", {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken(),
    },
  });
};

export const getDemoAnalytics = () => {
  return merlinApp.get("/demo");
};

export const askDemoAiQuestions = (question) => {
  return merlinApp.post("/demo/question", {
    data: {
      question: question,
    },
  });
};

// This is going to submit the contact form using the data it has taken in
export const submitContactForm = (name, email, phone, message) => {
  return merlinApp.post("/contact", {
    data: {
      name,
      email,
      phone,
      message,
    },
  });
};

// This is going to return the software patch updates
export const getSoftwarePatch = () => {
  return merlinApp.get("/updates");
};

// This method is going to attach a stripe payment method to the customer in stripe
export const attachPaymentToCustomer = async (paymentMethod) => {
  return merlinApp.post(
    "/enterprise/stripe/attach",
    {
      data: {
        payment_method: paymentMethod,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

// This method is going to get a stripe customer object for this company
export const getStripeCustomer = async () => {
  return merlinApp.get("/enterprise/stripe/customer", {
    headers: {
      Authorization: await firebase.auth().currentUser.getIdToken(),
    },
  });
};

// This method is going to charge a customer a specified one time transaction
export const createStripePayment = async (stripeID, amount, codeApplied) => {
  return merlinApp.post(
    "/enterprise/stripe/payment",
    {
      data: {
        customer_stripe_id: stripeID,
        amount: amount,
        has_coupon: codeApplied !== "",
        coupon_code: codeApplied,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

// This method is going to retrieve a coupon based on the code
export const getStripeCouponCode = async (couponCode) => {
  return merlinApp.post(
    "/enterprise/stripe/coupon",
    {
      data: {
        coupon_code: couponCode,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

// This method is going to subscribe a customer to a specific product
export const createStripeSubscription = (customerID, priceID) => {
  return merlinApp.post("/enterprise/stripe/subscription", {
    data: {
      customer_stripe_id: customerID,
      price_id: priceID,
    },
  });
};

// Will return a true/false boolean whether or not the customer is subscribed
export const isCustomerSubscribed = async (customerStripeID) => {
  return merlinApp.post(
    "/enterprise/stripe/subscriptionstatus",
    {
      data: {
        customer_stripe_id: customerStripeID,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

// Will subscribe a customer
export const subscribeCustomer = async (customerStripeID, codeApplied) => {
  return merlinApp.post(
    "/enterprise/stripe/subscribe",
    {
      data: {
        stripe_customer_id: customerStripeID,
        code_applied: codeApplied,
      },
    },
    {
      headers: {
        Authorization: await firebase.auth().currentUser.getIdToken(),
      },
    }
  );
};

// Method is going to log a specific event in Cloud Firestore
export const logFirestoreEvent = (eventName, eventPaylod) => {
  if (window.location.host !== "www.letspondr.com") {
    if (eventName === "404 Error") {
      console.log({ eventName, eventPaylod });
    }
  } else {
    return merlinApp.post("/log", {
      data: {
        key: "RH5cFnBB0t",
        event_name: eventName,
        event_payload: eventPaylod,
      },
    });
  }
};
