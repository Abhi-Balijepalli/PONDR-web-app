import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { connect } from "react-redux";
import { logEvent, logFBEvent, logScreenName } from "../utils/CommonFunctions";
import Wrapper from "../utils/Wrapper";
import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";
import { useHistory } from "react-router";
import ReactLoading from "react-loading";
import {
  getStripeCustomer,
  isCustomerSubscribed,
  createProduct,
  logFirestoreEvent,
} from "../merlinv1/beta_api";

const AddProductFormSchema = Yup.object({
  productName: Yup.string().required("Product name is required"),
  amazonLink: Yup.string()
    .trim()
    .required("Amazon Link is required")
    .matches(
      /https:\/\/www.amazon.com\/.*\/[A-Z0-9]{10}(\/|\?).*/,
      'Link must be a link to an Amazon product\'s link (example: "https://www.amazon.com/MOOSOO-Gooseneck-Temperature-Stainless-Protection/dp/B086YL1YVJ/ref=cm_cr_arp_d_product_top?ie=UTF8&th=1")'
    )
    .max(500, "cannot be more than 500 characters"),
  category: Yup.string().required("Category is required"),
  competitorsFlag: Yup.boolean(),
});

const AddProduct = (props) => {
  // Button loading state
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(AddProductFormSchema),
    defaultValues: {
      productName: "",
      amazonLink: "",
      category: "",
      competitors_flag: false,
    },
  });

  const onSubmit = async (data) => {
    // Fetches the stripe customer first
    setIsLoading(true);

    const stripeCustomer = await getStripeCustomer();
    const stripeCustomerID = stripeCustomer.data.stripe_customer.id;

    // If user is within their 30 day free trial, lets them create product. Else, checks if they are subsscribed, else, makes them pay
    let dateCreated = parseFloat(props.user.createdAt);
    dateCreated = new Date(dateCreated);
    let daysSinceCreation = Math.ceil(
      (new Date() - dateCreated) / (1000 * 60 * 60 * 24)
    );

    const isSubscribed = (await isCustomerSubscribed(stripeCustomerID)).data
      .is_subscribed;

    if (daysSinceCreation <= 30 || isSubscribed) {
      // Creates the product
      await createProduct(
        props.user.displayName,
        data.productName,
        data.amazonLink,
        data.category,
        data.competitorsFlag
      );

      setIsLoading(false);
      logFirestoreEvent("ProductCreated", { email: props.user.email });
      logFBEvent("ProductCreated", {});
      history.push("/enterprise/product/");
    } else {
      setIsLoading(false);
      // Pushes the product information to the checkout
      history.push({
        pathname: "/checkout",
        state: {
          displayName: props.user.displayName,
          productName: data.productName,
          amazonLink: data.amazonLink,
          category: data.category,
          competitorsFlag: data.competitorsFlag,
          stripeCustomer: JSON.stringify({
            stripe_customer: stripeCustomer.data.stripe_customer,
            payment_method: stripeCustomer.data.payment_method,
          }),
        },
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // Sets screen analytics
  useEffect(() => {
    logFirestoreEvent("AddProductView", {});
    logScreenName("AddProduct");
    logEvent("page_view", { page_name: "AddProduct" });
  }, []);

  return (
    <Wrapper>
      <Card className="mx-auto w-1/3 shadow-2xl md:w-3/5 h-2/5 mb-10 ">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex justify-center md:w-full w-full mx-auto"
        >
          <div className="flex flex-wrap -mx-3 mb-12">
            <div className="w-full px-3 mb-4">
              <p className="w-full h4">Analyze Product</p>
            </div>

            <Input
              className="w-full mb-8"
              name="productName"
              label="Product Name"
              placeholder="Enter the product's name"
              type="text"
              required
              ref={register}
              errors={errors}
            />
            <Input
              className="w-full mb-8"
              name="amazonLink"
              label="Amazon Link (All reviews)"
              placeholder="Enter the Amazon link"
              type="text"
              required
              ref={register}
              errors={errors}
            />

            <div className="w-full px-3 mb-8">
              <label
                className="form-label block text-gray-800 text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category<span className="text-red-600">*</span>
              </label>
              <select
                ref={register}
                name="category"
                className="form-select w-full focus:outline-none"
              >
                <option value="" disabled defaultValue>
                  Select your Category
                </option>
                <option>Art</option>
                <option>Baby</option>
                <option>Beauty</option>
                <option>Books</option>
                <option>Camera & Photo</option>
                <option>Clothing & Accessories</option>
                <option>Computer Accessories</option>
                <option>Consumer Electronics</option>
                <option>Education</option>
                <option>Health & personal Care</option>
                <option>Home & Garden</option>
                <option>Luggage & Travel Accessories</option>
                <option>Musical Instruments</option>
                <option>Office Products</option>
                <option>Outdoors</option>
                <option>Party & Event</option>
                <option>Pet Supplies</option>
                <option>Shoes, Handbags, & Sunglasses</option>
                <option>Sports</option>
                <option>Tools & Home Improvement</option>
                <option>Toys</option>
                <option>Video Games</option>
              </select>
              <p className="block text-sm font-medium text-red-600">
                <ErrorMessage errors={errors} name="category" />
              </p>
            </div>
            <div className="flex w-full px-3 mb-8">
              <p className="font-medium text-gray-800 text-sm">
                Is this a competitor's product?
              </p>
              <input
                className="my-auto ml-4"
                ref={register}
                name="competitorsFlag"
                type="checkbox"
              />
            </div>

            <div className="w-full px-3 flex justify-center items-center">
              {isLoading ? (
                <ReactLoading
                  type={"spin"}
                  color={"#7779FC"}
                  height={"10%"}
                  width={"10%"}
                />
              ) : (
                <Button
                  className="w-full bg-blue-pondr hover:bg-blue-pondrdark"
                  type="submit"
                >
                  Analyze Product
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(AddProduct);
