import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAdvanceAnalytics, logFirestoreEvent } from "../../merlinv1/beta_api";
import ReactLoading from "react-loading";
import Card from "../components/Card";
import { formatDate } from "../../utils/CommonFunctions";
import PondrLineChart from "./PondrLineChart";
import { MacBookAnalytics, MacbookProduct } from "../Demo/DemoData";
import { logEvent, logScreenName } from "../../utils/CommonFunctions";
import { FaQuestionCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import Card4 from "../components/Card4";
import { FaRegThumbsDown, FaRegThumbsUp, FaSmile } from "react-icons/fa";
import { scaleSentiment } from "../../utils/CommonFunctions";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import ShowMoreText from "react-show-more-text";
import { useHistory } from "react-router-dom";

const CategoriesReviews = (props) => {
  // Fetches data from the props
  let { productId, companyProducts, demo } = props;
  const { productInfo } = props;

  // Sets default data if this is a demo screen
  if (demo) {
    companyProducts = [MacbookProduct];
  }

  // State variables for the screen
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState(demo ? MacBookAnalytics : "");
  const [categories, setCategories] = useState("");
  const [lineDataName, setLineDataName] = useState("");
  const [sortType, setSortType] = useState("Positive");
  const [timePeriodSelected, setTimePeriodSelected] = useState(null);

  const history = useHistory();

  // UseEffect helper
  const fetchData = async () => {
    let analyticsObj = "";
    if (!demo) {
      // get from server if it isn't in the redux store (only does this if this is non-demo)
      if (!props.advanceAnalytics[props.productId]) {
        try {
          const res = await getAdvanceAnalytics(productId);
          await props.addAdvanceAnalytics({ ...res.data, color: "#7779FC" });
          setAnalytics({ ...res.data, color: "#7779FC" });
          analyticsObj = { ...res.data, color: "#7779FC" };
        } catch (err) {
          logFirestoreEvent("404Error", { err: err });
          history.push("/ErrorPage");
        }
        // else get it from redux
      } else {
        setAnalytics(props.advanceAnalytics[productId]);
        analyticsObj = props.advanceAnalytics[productId];
      }
    } else {
      analyticsObj = MacBookAnalytics;
    }
    let categories = Object.keys(analyticsObj.summary.category_data);
    categories = categories.filter(
      (eachCategory) =>
        analyticsObj.summary.category_data[eachCategory].length > 0 // This filter statement makes sure there is data for the category in order to actually display it
    );
    setCategories(categories);
    setLineDataName(categories[0]);
    setIsLoading(false);
  };

  // UseEffect fetches from server
  useEffect(() => {
    if (demo) {
      logScreenName("DemoCategorized");
      logEvent("page_view", { page_name: "DemoCategorized" });
    } else {
      logScreenName("Categorized");
      logEvent("page_view", { page_name: "Categorized", productId: productId });
    }
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  // Returns the average sentiment score for the category selected
  const getAverageSentimentForCategory = () => {
    let sum = 0;
    for (const review of analytics.summary.category_data[lineDataName]) {
      sum += scaleSentiment(review.score);
    }

    return (sum / analytics.summary.category_data[lineDataName].length).toFixed(
      2
    );
  };

  // Returns a loading state if it is loading
  if (isLoading) {
    return (
      <div className="w-full h-75vh flex justify-center items-center">
        <ReactLoading type="spin" color="#7779FC" height="5%" width="5%" />
      </div>
    );
  } else {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className={"flex justify-between w-full mt-10"}>
          <div className={"w-full"}>
            <p className="flex flex-col h3 mb-2 text-blue-pondr">
              Categorized Reviews{"\n"}
            </p>
            <div className={"font-bold w-max text-gray-400 text-md pb-10"}>
              Customer reviews sorted by your most talked about product
              categories.
            </div>
            <p className={"pt-0 mb-4 pb-5 font-medium text-gray-800"}>
              Current Product &nbsp; | &nbsp; {productInfo.Product_name}
            </p>
            <span
              className={
                "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-400  h3"
              }
            >
              {lineDataName.substring(0, 1).toUpperCase() +
                lineDataName.substring(1)}
            </span>
          </div>
          <div className={"flex flex-col items-end w-full mt-2"}>
            <p className={"font-bold text-gray-400 text-md text-right"}>
              {" "}
              Category Selected
            </p>
            <select
              className="form-select w-1/3 outline-none mt-5"
              onChange={(e) => {
                setLineDataName(e.target.value);
                logEvent("CategorizedCategorySelected", {
                  category: e.target.value,
                });
              }}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.substring(0, 1).toUpperCase() +
                    category.substring(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pb-5"></div>

        <div
          className="flex flex-wrap justify-center width-full text-white pt-10"
          data-aos="fade-up"
        >
          {[
            {
              icon: <BsFillChatSquareQuoteFill className="mb-3" size="20px" />,
              title: "REVIEW VOLUME",
              text: analytics.summary.category_data[lineDataName].length,
            },
            {
              icon: <FaSmile className="mb-3" size="20px" />,
              title: "AVERAGE SENTIMENT (OUT OF 5)",
              text: getAverageSentimentForCategory(),
            },
            {
              icon: <FaRegThumbsUp className="mb-3" size="20px" />,
              title: "POSITIVE REVIEWS",
              text: analytics.summary.category_data[lineDataName].filter(
                (eachPoint) => eachPoint.score >= 0
              ).length,
            },
            {
              icon: <FaRegThumbsDown className="mb-3" size="20px" />,
              title: "NEGATIVE REVIEWS",
              text: analytics.summary.category_data[lineDataName].filter(
                (eachPoint) => eachPoint.score < 0
              ).length,
            },
          ].map((eachCard, index) => (
            <Card4
              className={
                index - (1 % 4) !== 2 ? "w-22.5% mr-1/30 mb-5" : "w-22.5% mb-5"
              }
              key={index}
            >
              <div className="w-full p font-medium text-gray-400 justify-left pb-3 ">
                {" "}
                {eachCard.icon}
                {eachCard.title}{" "}
              </div>
              <div className="w-min h4 text-blue-pondr"> {eachCard.text}</div>
            </Card4>
          ))}
        </div>
        <div className="pb-5"></div>
        <Card className="mt-4">
          <div className="flex mb-5 justify-between">
            <div className={"flex"}>
              <div className="text-gray-400 font-bold">
                Sentiment Per Category Over Time
              </div>
              <p
                className="mx-6 font-medium text-purple-600 cursor-pointer"
                data-tip
                data-for="trendLineTip"
              >
                <FaQuestionCircle className="text-gray-400 mt-1" />
              </p>
              <ReactTooltip id="trendLineTip" place="top" effect="solid">
                This graph represents the trendline for your product’s sentiment
                over time toward a specific product category. This is how your
                reviewers generally feel about this aspect of your product.
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
            companyProducts={companyProducts}
            productsDisplayed={[analytics]}
            timePeriodSelected={timePeriodSelected}
            type={"Categorized_" + lineDataName}
            showLegend={false}
            onMouseEnter={() =>
              logEvent("AnalyticsSentPerCategoryLineUsed", {
                productId,
                category: lineDataName,
              })
            }
          />
        </Card>
        <Card className="my-8">
          <div className={"flex w-full justify-between items-center mb-5"}>
            <div className="text-gray-400 font-bold">
              Reviews about{" "}
              {lineDataName.substring(0, 1).toUpperCase() +
                lineDataName.substring(1)}{" "}
              ({analytics.summary.category_data[lineDataName].length} Reviews)
            </div>
            <div className={"flex w-1/4 justify-between items-center"}>
              <p className="h6">Sort By</p>
              <select
                className="form-select outline-none"
                value={sortType}
                onChange={(event) => {
                  logEvent("SortedReviewsSortChange", {
                    sortBy: event.target.value,
                  });
                  setSortType(event.target.value);
                }}
              >
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
                <option value="Date">Date</option>
              </select>
            </div>
          </div>
          <div className={"h-96 overflow-auto"}>
            {analytics.summary.category_data[lineDataName]
              .sort((a, b) => {
                if (sortType === "Positive") {
                  return b.score - a.score;
                } else if (sortType === "Negative") {
                  return a.score - b.score;
                } else {
                  return new Date(b.date) - new Date(a.date);
                }
              })
              .map((review, index) => (
                <div key={index} className={"px-5"}>
                  <div className="my-6">
                    <div className="mx-2 ml-auto text-sm text-gray-700 font-bold pb-5">
                      <p>Date: {formatDate(review.date)}</p>
                      <p>
                        Score:{" "}
                        <span
                          className={
                            review.score >= -0.15 && review.score <= 0.15
                              ? "text-yellow-100"
                              : review.score >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {scaleSentiment(review.score)}
                        </span>
                      </p>
                    </div>
                    <ShowMoreText
                      className="p2 text-base text-gray-500"
                      /* Default options */
                      lines={5}
                      more="Show more"
                      less="Show less"
                      anchorClass="text-blue-pondr text-base outline-none focus:outline-none"
                    >
                      <div className=" p2 text-base w-full text-gray-500">
                        {review.review}
                      </div>
                    </ShowMoreText>
                  </div>
                  <hr className="my-2" />
                </div>
              ))}
          </div>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    advanceAnalytics: state.app.advanceAnalytics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAdvanceAnalytics: (newAdvanceAnalytics) =>
      dispatch({
        type: "ADD_ADVANCE_ANALYTICS",
        newAdvanceAnalytics: newAdvanceAnalytics,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesReviews);
