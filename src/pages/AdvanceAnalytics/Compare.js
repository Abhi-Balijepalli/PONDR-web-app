// This is the compare page where users will be able to compare different products with each other
import React, { useState, useEffect } from "react";
import { getAdvanceAnalytics, logFirestoreEvent } from "../../merlinv1/beta_api";
import ReactLoading from "react-loading";
import { BsPlusSquare } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { getRandomColor } from "../../utils/CommonFunctions";
import PondrBarChart from "./PondrBarChart";
import ShowMoreText from "react-show-more-text";
import PondrLineChart from "./PondrLineChart";
import ComparisonTable from "./ComparisonTable";
import CompareAIQuestions from "./CompareAIQuestions";
import Card from "../components/Card";
import {
  MacBookAnalytics,
  MacbookProduct,
  SurfaceAnalytics,
  SurfaceProduct,
} from "../Demo/DemoData";
import ReactTooltip from "react-tooltip";
import { logEvent, logScreenName } from "../../utils/CommonFunctions";
import { FaQuestionCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

// Creates the functional component
const Compare = (props) => {
  // Fetches the productID from props
  let { productId, companyProducts, demo, productInfo } = props;

  // If this is just a demo version, will preset the products to be compared
  if (demo) {
    companyProducts = [MacbookProduct, SurfaceProduct];
    productInfo = MacbookProduct;
  }

  // The state variables for this screen
  const [isScreenLoading, setIsScreenLoading] = useState(!demo);
  const [productsCompared, setProductsCompared] = useState(
    demo
      ? [
          { ...MacBookAnalytics, color: "#7779FC" },
          { ...SurfaceAnalytics, color: getRandomColor() },
        ]
      : []
  );
  const [yourProduct, setYourProduct] = useState(
    demo ? { ...MacBookAnalytics, color: "#7779FC" } : ""
  );
  const [productLoading, setProductLoading] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [comparedReviewTypeSelected, setComparedReviewTypeSelected] =
    useState("Best Review");
  const [lineDataName, setLineDataName] = useState("product_trend_all"); // product_trend_all product_trend_all_star
  const [timePeriodSelected, setTimePeriodSelected] = useState(null);

  // The useEffect will fetch the necessary data to be rendered on this screen
  useEffect(() => {
    // A helper method for useEffect (only called if this is non-demo)
    const fetchInitialScreenData = async () => {
      if (!demo) {
        try {
          // Fetches the base product's analytics
          const baseProductAnalytics = (await getAdvanceAnalytics(productId))
            .data;
          setProductsCompared([{ ...baseProductAnalytics, color: "#7779FC" }]);
          setYourProduct({ ...baseProductAnalytics, color: "#7779FC" });
          setIsScreenLoading(false);
        } catch (error) {
          // Logs error
          logFirestoreEvent("404Error", { err: error });
          history.push("/ErrorPage");
        }
      }
    };

    if (demo) {
      logScreenName("CompareDemo");
      logEvent("page_view", { page_name: "CompareDemo" });
      setIsScreenLoading(false);
    } else {
      logScreenName("Compare");
      logEvent("page_view", { page_name: "Compare", baseProduct: productId });
      fetchInitialScreenData();
    }
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

  // Takes in a product object and returns a boolean based on if it's a competitor product or not
  const isCompetitorProduct = (product) => {
    return companyProducts.find(
      (eachCompanyProduct) =>
        eachCompanyProduct.Product_id === product.product_id
    ).competitor_product;
  };

  // This function is going to return common categories across different compared products appended with " - Best Review " & " - Worst Review"
  const getCommonCategories = () => {
    const arrayOfObjectCategories = [];

    // Creates an array containing an array for each product's categories
    for (const product of productsCompared) {
      let categories = Object.keys(product.summary.category_data);
      categories = categories.filter(
        (eachCategory) => product.summary.category_data[eachCategory].length > 0
      );
      arrayOfObjectCategories.push(categories);
    }

    // Filters into a single array that contains all the common categories across all array
    let commonCategories = arrayOfObjectCategories[0];
    commonCategories = commonCategories.filter((eachCategory) => {
      for (const eachProductCategory of arrayOfObjectCategories.slice(1)) {
        if (!eachProductCategory.includes(eachCategory)) {
          return false;
        }
      }
      return true;
    });

    // Constructs new array with appended endings as the options
    const returningCommonCategories = [];
    for (const category of commonCategories) {
      const capitalizedCategory =
        category.substring(0, 1).toUpperCase() + category.substring(1);

      returningCommonCategories.push(capitalizedCategory + " - Best Review");
      returningCommonCategories.push(capitalizedCategory + " - Worst Review");
    }

    return returningCommonCategories;
  };

  // This is going to fetch a review for a specific product based on its index and the review type currently being compared
  const getReviewToCompare = (index) => {
    const product = productsCompared[index];

    // If it is not a specific category, just fetches best/worst review based on selected
    if (comparedReviewTypeSelected === "Best Review") {
      return product["Review-types"].best_review;
    } else if (comparedReviewTypeSelected === "Worst Review") {
      return product["Review-types"].worst_review;
    } else {
      // First gets the category name
      const categoryName = comparedReviewTypeSelected
        .substring(0, comparedReviewTypeSelected.indexOf("-") - 1)
        .toLowerCase();
      const category = product.summary.category_data[categoryName];

      // Will determine whether to get the worst or best review for this category
      const isBest = comparedReviewTypeSelected
        .substring(comparedReviewTypeSelected.indexOf("-"))
        .includes("Best");
      // Parses through the array to get the best/worst review (O(N) --> Hopefully can be improved)
      let scoreToCompare = isBest ? -1 : 1;
      let reviewIndex = 0;

      for (let i = 0; i < category.length; i++) {
        const score = category[i].score;
        if (isBest) {
          if (score > scoreToCompare) {
            reviewIndex = i;
            scoreToCompare = score;
          }
        } else {
          if (score < scoreToCompare) {
            reviewIndex = i;
            scoreToCompare = score;
          }
        }
      }

      // Returns the review
      return category[reviewIndex].review;
    }
  };

  // Returns the loading UI
  if (isScreenLoading) {
    return (
      <div className="w-full h-75vh flex justify-center items-center">
        <ReactLoading type="spin" color="#7779FC" height="5%" width="5%" />
      </div>
    );
  }

  // Returns the UI
  return (
    <div className="flex flex-col w-full pb-10">
      <div className="pb-10" />
      <h1 className="h3 mb-1 text-blue-pondr pb-1">Product Comparison</h1>
      <p className="text-gray-400 font-bold">
        Compare your product against your competitors product side by side
      </p>
      <p className={"mt-3 pt-5 mb-4 font-medium text-gray-800"}>
        Your Product &nbsp; | &nbsp; {productInfo.Product_name}
      </p>
      {demo ? null : (
        <div className="flex self-end w-1/3 mt-6">
          <button
            className={`flex items-center w-1/2 justify-evenly border-solid border border-gray-300 border-r-0 py-2
          focus:outline-none hover:bg-blue-pondr transition duration-150 ease-in-out hover:text-white hover:color-white`}
            onClick={() => {
              setComparedReviewTypeSelected("Best Review");
              setProductsCompared([yourProduct]);
              setRefresh(!refresh);
            }}
          >
            <p className="font-medium">Clear all</p>
            <GiCancel />
          </button>
          <button
            className={`flex items-center w-1/2 justify-evenly border-solid border border-gray-300 py-2
           focus:outline-none hover:bg-blue-pondr transition duration-150 ease-in-out hover:text-white hover:color-white`}
            onClick={() => {
              const currentProductArray = productsCompared;
              currentProductArray.push(yourProduct);
              setComparedReviewTypeSelected("Best Review");
              setProductsCompared(currentProductArray);
              setRefresh(!refresh);
            }}
          >
            <p className="font-medium">Add Product</p>
            <BsPlusSquare />
          </button>
        </div>
      )}

      <div className="w-full flex flex-wrap">
        {productsCompared.map((eachProduct, index) => {
          const companyProduct = companyProducts.find(
            (eachCompanyProduct) =>
              eachCompanyProduct.Product_id === eachProduct.product_id
          );
          return productLoading === index ? (
            <div
              className={
                index % 2 === 0
                  ? "flex w-2/5 flex-col items-center justify-center mr-1/10 mt-10"
                  : "flex w-1/2 flex-col items-center justify-center pl-1/10 border-l border-l-gray-300 mt-10"
              }
              key={index}
            >
              <ReactLoading
                type="spin"
                color="#7779FC"
                height="5%"
                width="5%"
              />
            </div>
          ) : (
            <div
              className={
                index % 2 === 0
                  ? "flex w-2/5 flex-col items-center mr-1/10 mt-10"
                  : "flex w-1/2 flex-col items-center pl-1/10 border-l border-l-gray-300 mt-10"
              }
              key={index}
            >
              <select
                className="form-select outline-none max-w-full mb-5"
                onChange={async (event) => {
                  // Makes the product load for a second, grabs the analytics for the newly selected product, and
                  // appends it to the state
                  setProductLoading(index);
                  const productID = event.target.value;
                  const analyticsForThisProduct = await getAdvanceAnalytics(
                    productID
                  );
                  const newArrayOfProductsCompared = productsCompared;
                  newArrayOfProductsCompared[index] = {
                    ...analyticsForThisProduct.data,
                    color: getRandomColor(),
                  };
                  logFirestoreEvent("ProductsCompared", {
                    numProducts: newArrayOfProductsCompared.length,
                    productNames: newArrayOfProductsCompared.map(
                      (eachProduct) => eachProduct.product_name
                    ),
                  });
                  setComparedReviewTypeSelected("Best Review");
                  setProductsCompared(newArrayOfProductsCompared);
                  setRefresh(!refresh);
                  setProductLoading("");
                }}
              >
                {companyProducts.map(
                  (eachCompanyProduct, companyProductIndex) => (
                    <option
                      key={companyProductIndex}
                      value={eachCompanyProduct.Product_id}
                      className="max-w-full"
                      selected={
                        eachCompanyProduct.Product_id === eachProduct.product_id
                      }
                    >
                      {eachCompanyProduct.Product_name.length > 25
                        ? eachCompanyProduct.Product_name.substring(0, 25) +
                          "..."
                        : eachCompanyProduct.Product_name}
                    </option>
                  )
                )}
              </select>
              {demo ? (
                <div />
              ) : (
                <div
                  className="self-end text-blue-pondr hover:text-blue-pondrdark cursor-pointer mb-3"
                  onClick={() => {
                    if (productsCompared.length > 1) {
                      const newProductsCompared = productsCompared;
                      newProductsCompared.splice(index, 1);
                      setComparedReviewTypeSelected("Best Review");
                      setProductsCompared(newProductsCompared);
                      setRefresh(!refresh);
                    }
                  }}
                >
                  <GiCancel size="1.5vw" />
                </div>
              )}

              <img
                src={
                  eachProduct.summary.images[0].includes("._AC_US40_.")
                    ? eachProduct.summary.images[0].replace(
                        "._AC_US40_.",
                        "._SL1500_."
                      )
                    : eachProduct.summary.images[0]
                }
                className="w-3/4 h-50 object-contain mb-10"
              />
              <div className="mt-auto w-full">
                <p className="text-lg font-semibold text-left mb-0 self-start">
                  {companyProduct.Product_name}
                </p>
                <p className="text-lg text-left mb-3 text-gray-500 self-start">
                  {companyProduct.Category}
                </p>
                <p className="text-lg font-semibold text-left mb-5 text-blue-pondr self-start">
                  {typeof eachProduct.summary.price === "number"
                    ? "$" + eachProduct.summary.price.toFixed(2)
                    : eachProduct.summary.price}
                </p>
                <div
                  className={
                    isCompetitorProduct(eachProduct)
                      ? "w-1/2 bg-blue-pondrgray text-white font-bold flex justify-center items-center py-3 rounded-full"
                      : "w-1/2 bg-blue-pondr text-white font-bold flex justify-center items-center py-3 rounded-full"
                  }
                >
                  {isCompetitorProduct(eachProduct)
                    ? "Competitor Product"
                    : "Your Product"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="h4 mt-20 self-center">Product Table Comparison</h3>
      <div className="w-full self-center mt-10">
        <Card>
          <ComparisonTable
            productsDisplayed={productsCompared}
            companyProducts={companyProducts}
          />
        </Card>
      </div>
      <h3 className="h4 mt-20 self-center">
        Product Sentiment Trend Over Time
      </h3>
      <select
        className="form-select w-1/2 ml-auto focus:outline-none items-end mt-5"
        onChange={(e) => {
          setLineDataName(e.target.value);
        }}
      >
        <option value="product_trend_all">All-Time Sentiment Trend</option>
        <option value="product_trend_all_star">All-Time Star Trend</option>
      </select>
      <Card className={"mt-5"}>
        <div className="flex mb-5 justify-between">
          <div className={"flex"}>
            <div className="text-gray-400 font-bold">
              Product Trends Over Time
            </div>
            <p
              className="mx-6 font-medium text-purple-600 cursor-pointer"
              data-tip
              data-for="trendLineTip"
            >
              <FaQuestionCircle className="text-gray-400 mt-1" />
            </p>
            <ReactTooltip id="trendLineTip" place="top" effect="solid">
              This graph represents the trendline for the product’s sentiment
              and star ratings over time compared to your competitors. This is
              how your reviewers generally feel about your product.
            </ReactTooltip>
          </div>
          <div className={"flex"}>
            {[
              {
                text: "3m",
                value: 3,
              },
              {
                text: "6m",
                value: 6,
              },
              {
                text: "1y",
                value: 12,
              },
              {
                text: "All",
                value: null,
              },
            ].map((eachTimePeriod) => (
              <div
                onClick={() => setTimePeriodSelected(eachTimePeriod.value)}
                className={
                  timePeriodSelected === eachTimePeriod.value
                    ? "w-10 h-10 rounded-full flex justify-center items-center mr-5 bg-blue-pondrgray text-white cursor-pointer"
                    : "w-10 h-10 rounded-full flex justify-center items-center mr-5 bg-transparent text-blue-pondrgray cursor-pointer"
                }
              >
                {eachTimePeriod.text}
              </div>
            ))}
          </div>
        </div>
        <PondrLineChart
          productsDisplayed={productsCompared}
          timePeriodSelected={timePeriodSelected}
          companyProducts={companyProducts}
          type={lineDataName}
          onMouseEnter={() =>
            lineDataName === "product_trend_all_star"
              ? logEvent("CompareStarLineUsed", {
                  numProducts: productsCompared.length,
                  productNames: productsCompared.map(
                    (eachProduct) => eachProduct.product_name
                  ),
                })
              : logEvent("CompareSentLineUsed", {
                  numProducts: productsCompared.length,
                  productNames: productsCompared.map(
                    (eachProduct) => eachProduct.product_name
                  ),
                })
          }
        />
      </Card>
      <h3 className="h4 mt-20 self-center">Most Popular Product Feature</h3>
      <Card className={"mt-10 pb-10"}>
        <PondrBarChart
          productsDisplayed={productsCompared}
          type="best_sentiment_per_category"
          companyProducts={companyProducts}
          layout={"vertical"}
          onMouseEnter={() =>
            logEvent("CompareSentPerCategoryUsed", {
              numProducts: productsCompared.length,
              productNames: productsCompared.map(
                (eachProduct) => eachProduct.product_name
              ),
            })
          }
        />
      </Card>
      <h3 className="h4 mt-20 self-center">Side-by-Side Review Analysis</h3>
      <select
        className="form-select outline-none w-2/5 mt-10 self-end"
        defaultValue={comparedReviewTypeSelected}
        onChange={async (event) => {
          setComparedReviewTypeSelected(event.target.value);
        }}
      >
        <option value="Best Review" className="max-w-full">
          Best Review
        </option>
        <option value="Worst Review" className="max-w-full">
          Worst Review
        </option>
        {getCommonCategories().map((eachCategory, index) => (
          <option key={index} value={eachCategory} className="max-w-full">
            {eachCategory}
          </option>
        ))}
      </select>
      {productsCompared.map((eachProduct, index) => (
        <Card className={"mt-10 p2 text-gray-500 text-base"}>
          <p
            className={
              isCompetitorProduct(eachProduct)
                ? "text-lg font-semibold text-blue-pondrgray text-left mb-3 self-start"
                : "text-lg font-semibold text-left text-blue-pondr mb-3 self-start"
            }
          >
            {comparedReviewTypeSelected}{" "}
            {"(" +
              companyProducts.find(
                (eachCompanyProduct) =>
                  eachCompanyProduct.Product_id === eachProduct.product_id
              ).Product_name +
              ")"}
          </p>
          <ShowMoreText
            /* Default options */
            lines={5}
            more="Show more"
            less="Show less"
            anchorClass="text-blue-pondr text-semibold outline-none focus:outline-none"
          >
            <p
              className={"p2 text-base text-grey-500 text-left mb-3 self-start"}
            >
              {getReviewToCompare(index)}
            </p>
          </ShowMoreText>
        </Card>
      ))}
      {/*
  <h3 className='h3 mt-20 self-center'>AI Question & Answer comparison</h3>
      <div className='w-full self-center mt-10'>
        <CompareAIQuestions
          productsDisplayed={productsCompared}
        />
      </div>
      */}
    </div>
  );
};

// Exports the compare page
export default Compare;
