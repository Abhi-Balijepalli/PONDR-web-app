import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import {
  getAdvanceAnalytics,
  getStripeCustomer,
} from "../../merlinv1/beta_api";
import Card4 from "../components/Card4";
import StatusLabel from "../components/StatusLabel";
import {
  FaCodeBranch,
  FaDollarSign,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import {
  formatDate,
  logEvent,
  logScreenName,
} from "../../utils/CommonFunctions";
import { GiCancel } from "react-icons/gi";
import { IoMdPrint } from "react-icons/io";
import ReactTooltip from "react-tooltip";
import PondrLineChart from "./PondrLineChart";
import PondrDistributionGraph from "./PondrDistributionGraph";
import PondrBarChart from "./PondrBarChart";
import { scaleSentiment } from "../../utils/CommonFunctions";
import { BsFillGridFill } from "react-icons/bs";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { useHistory } from "react-router";
import { BsStarFill } from "react-icons/bs";
import { Responsive, WidthProvider } from "react-grid-layout";
import { RiShareBoxFill } from "react-icons/ri";
import Modal from "react-awesome-modal";
import { MacbookProduct, MacBookAnalytics } from "../Demo/DemoData";
import { getAnalyticsLayout } from "./Layouts";
import { triggerBase64Download } from "react-base64-downloader";
import { toPng } from "html-to-image";
import { BiExport } from "react-icons/bi";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const AdvanceAnalytics = (props) => {
  // Fetches the props from the previous screen
  let { productId, companyProducts, productInfo, isDemo } = props;

  if (isDemo) {
    productId = MacBookAnalytics.product_id;
    companyProducts = [MacbookProduct];
    productInfo = MacbookProduct;
  }

  // The state variables for the screen
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState("");
  const [lineDataName, setLineDataName] = useState("product_trend_all"); // product_trend_all product_trend_all_star
  const [timePeriodSelected, setTimePeriodSelected] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDisplayed, setReviewDisplayed] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // This is the history hook
  const history = useHistory();

  // useEffect fetches the product analytics
  useEffect(() => {
    // Helper for useEffect
    const fetchAnalyticsData = async () => {
      // Attempts to fetch analytics from redux. If it doesn't find it, fetches from Firebase
      if (props.advanceAnalytics[productId]) {
        setAnalytics(props.advanceAnalytics[productId]);
        setIsLoading(false);
      } else {
        try {
          let analyticsObject = await getAdvanceAnalytics(productId);
          analyticsObject = { ...analyticsObject.data, color: "#7779FC" };
          await props.addAdvanceAnalytics(analyticsObject);
          setAnalytics(analyticsObject);
          setIsLoading(false);
        } catch (error) {
          logEvent("404Error", { err: error });
          history.push("/ErrorPage");
        }
      }
    };
    if (isDemo) {
      setAnalytics(MacBookAnalytics);
      logScreenName("DemoAnalytics");
      logEvent("page_view", { page_name: "DemoAnalytics", productId });
      setIsLoading(false);
    } else {
      logScreenName("Analytics");
      logEvent("page_view", { page_name: "Analytics", productId });
      fetchAnalyticsData();
    }
    window.scrollTo(0, 0);
  }, []);

  // Loading state for the screen
  if (isLoading) {
    return (
      <div className="w-full h-75vh flex justify-center items-center">
        <ReactLoading type="spin" color="#7779FC" height="5%" width="5%" />
      </div>
    );
  }

  // Returns UI
  return (
    <div className="pb-10">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <div className="pt-10 pb-10">
        <div className="w-full font-bold h5 text-gray-400 -pt-20">
          <p>
            <div
              className="font-bold ml-24 h5 text-gray-400 w-full pb-10 items-end right-align"
              data-aos="fade-left"
            >
              <div className="flex flex-row w-full -my-20 align-right justify-end text-black items-center">
                <FaFlagCheckered className="text-gray-600" id="capture" />
                <div className={"mr-4 font-medium text-gray-400 text-sm"}>
                  &nbsp; Competitor Product:
                </div>

                <div style={{ width: "100px" }}>
                  <StatusLabel
                    className="h-1/2 w-1/2 font-medium"
                    status={productInfo.competitor_product ? "delay" : "none"}
                    text={productInfo.competitor_product ? "Yes" : "No"}
                  />
                </div>
                <FaCodeBranch className="text-gray-600 " />
                <div className="mr-4 font-medium text-gray-400  text-sm">
                  &nbsp; Analytics Status:
                </div>
                <div style={{ width: "min-content" }}>
                  <StatusLabel
                    status={
                      productInfo.reanalyze
                        ? "reanalyzing"
                        : productInfo.processed
                        ? "ready"
                        : "processing"
                    }
                  />
                </div>
              </div>
            </div>
          </p>
          <p
            className={"flex flex-row mt-3 pt-5 mb-4 font-medium text-gray-800"}
          >
            {productInfo.Product_name} &nbsp; | &nbsp;{" "}
            {formatDate(analytics.summary.date)} &nbsp;
          </p>

          <div className={"flex items-center justify-between"}>
            <div>
              <p
                onClick={() => {
                  logEvent("ProductLinkClicked", {});
                  window.open(productInfo.Amazon_link, "_blank");
                }}
                className={
                  "text-medium underline cursor-pointer font-semibold text-blue-pondr flex items-center justify-start"
                }
              >
                View Product
                <RiShareBoxFill
                  className={"ml-2"}
                  color={"#7779FC"}
                  size={20}
                />
              </p>
            </div>
            <div
              onClick={async () => {
                setIsExporting(true);
                const url = await toPng(document.getElementById("pageRef"));
                setIsExporting(false);
                await triggerBase64Download(url, productInfo.Product_name);
              }}
              className={"cursor-pointer"}
              onMouseEnter={({ target }) => (target.style.color = "#7779FC")}
              onMouseLeave={({ target }) => (target.style.color = "#6B7280")}
            >
              <IoMdPrint className={"ml-2"} color={"#6B7280"} size={30} />
            </div>
          </div>
        </div>
      </div>

      <div id={"pageRef"}>
        <div
          className="flex flex-wrap justify-center w-full mx-auto text-white"
          data-aos="fade-up"
        >
          {[
            {
              icon: <BsFillGridFill className="mb-3 font-bold" size="20px" />,
              title: "CATEGORY ",
              text: productInfo.Category,
            },
            {
              icon: <BsFillChatSquareQuoteFill className="mb-3" size="20px" />,
              title: "REVIEW VOLUME",
              text: analytics.summary.num_of_reviews,
            },
            {
              icon: <BsStarFill className="mb-3" size="20px" />,
              title: "AVERAGE STAR RATING (OUT OF 5)",
              text: analytics.summary.mean_star_rating.toFixed(2),
            },
            {
              icon: <FaSmile className="mb-3" size="20px" />,
              title: "AVERAGE SENTIMENT (OUT OF 5)",
              text: scaleSentiment(analytics.summary.mean_sentiment.toFixed(2)),
            },
            {
              icon: <FaRegThumbsUp className="mb-3" size="20px" />,
              title: "POSITIVE REVIEWS",
              text: analytics["5"].product_trend_all.points.filter(
                (eachPoint) => eachPoint.y >= 0
              ).length,
            },
            {
              icon: <FaRegThumbsDown className="mb-3" size="20px" />,
              title: "NEGATIVE REVIEWS",
              text: analytics["5"].product_trend_all.points.filter(
                (eachPoint) => eachPoint.y < 0
              ).length,
            },
            {
              icon: <FaDollarSign className="mb-3" size="20px" />,
              title: "PRODUCT PRICE",
              text:
                typeof analytics.summary.price === "number"
                  ? "$" + analytics.summary.price.toFixed(2)
                  : analytics.summary.price,
            },
          ].map((eachCard, index) => (
            <Card4
              className={
                index - (2 % 4) !== 4 ? "w-22.5% mr-1/30 mb-5" : "w-22.5% mb-5"
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

        <div className="pb-10" />
        <ResponsiveReactGridLayout
          layouts={getAnalyticsLayout()}
          preventCollision={true}
          compactType={null}
          useCSSTransforms={true}
          measureBeforeMount={false}
        >
          <div
            id="ProductTrend"
            key={"LineChart"}
            className={
              "flex flex-col p-6 bg-white rounded-lg shadow-md justify-center"
            }
          >
            <div className="flex mb-5 justify-between">
              <div className={"flex items-center"}>
                <div className="text-gray-400 font-bold">
                  Product Trends Over Time
                </div>
                {isExporting ? (
                  <div />
                ) : (
                  <div className="flex items-center">
                    <p
                      className="mx-6 font-medium text-purple-600 cursor-pointer"
                      data-tip
                      data-for="trendLineTip"
                    >
                      <FaQuestionCircle className="text-gray-400 mt-1 -ml-2 mr-3" />
                    </p>
                    <ReactTooltip id="trendLineTip" place="top" effect="solid">
                      This graph represents the trendline for the product's
                      sentiment and star ratings over time. This is how your
                      reviewers generally feel about your product.
                    </ReactTooltip>
                    <div
                      className="bg-blue-pondr rounded-xl flex flex-row"
                      onClick={async () => {
                        setIsExporting(true);
                        const url = await toPng(
                          document.getElementById("ProductTrend")
                        );
                        setIsExporting(false);
                        await triggerBase64Download(
                          url,
                          productInfo.Product_name + " Trend Graph",
                        );
                      }}
                      className={"cursor-pointer"}
                      onMouseEnter={({ target }) =>
                        (target.style.color = "#7779FC")
                      }
                      onMouseLeave={({ target }) =>
                        (target.style.color = "#6B7280")
                      }
                    >
                      <BiExport size="22px" color="#6B7280" className="" />
                    </div>
                  </div>
                )}
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
            {isExporting ? (
              <div />
            ) : (
              <select
                id={"trendSelect"}
                className="form-select w-1/2 mb-10 self-start focus:outline-none "
                onChange={(e) => {
                  setLineDataName(e.target.value);
                }}
              >
                <option value="product_trend_all">
                  All-Time Sentiment Trend
                </option>
                <option value="product_trend_all_star">
                  All-Time Star Trend
                </option>
              </select>
            )}

            <div>
              <PondrLineChart
                companyProducts={companyProducts}
                productsDisplayed={[analytics]}
                type={lineDataName}
                showLegend={false}
                timePeriodSelected={timePeriodSelected}
                onMouseEnter={() =>
                  lineDataName === "product_trend_all_star"
                    ? logEvent("AnalyticsStarGraphUsed", { productId })
                    : logEvent("AnalyticsSentGraphUsed", { productId })
                }
              />
            </div>
          </div>

          <div
            className={
              "flex flex-col p-10 bg-white rounded-lg shadow-md justify-center"
            }
            key={"SentDist"}
          >
            <div id="SentimentDist">
              <div className="flex w-full justify-between pb-5 items-center">
                <div className="text-gray-400 font-bold">
                  Distribution of Sentiment
                </div>
                {isExporting ? (
                  <div />
                ) : (
                  <div className={"flex items-center"}>
                    <p
                      className="mx-6 font-medium text-purple-400 cursor-pointer"
                      data-tip
                      data-for="sentimentToolTip"
                    >
                      <FaQuestionCircle className="text-gray-400 mt-1 -ml-12" />
                    </p>
                    <ReactTooltip
                      id="sentimentToolTip"
                      place="top"
                      effect="solid"
                    >
                      This is a representation of how your customers generally
                      feel about your product.
                    </ReactTooltip>
                    <div
                      className="flex flex-end bg-blue-pondr rounded-xl"
                      onClick={async () => {
                        setIsExporting(true);
                        const url = await toPng(
                          document.getElementById("SentimentDist")
                        );
                        setIsExporting(false);
                        await triggerBase64Download(
                          url,
                          productInfo.Product_name + " Sentiment Distribution Graph",
                        );
                      }}
                      className={"cursor-pointer"}
                      onMouseEnter={({ target }) =>
                        (target.style.color = "#7779FC")
                      }
                      onMouseLeave={({ target }) =>
                        (target.style.color = "#6B7280")
                      }
                    >
                      <BiExport size="22px" color="#6B7280" className="" />
                    </div>
                  </div>
                )}
              </div>

              <PondrDistributionGraph
                product={analytics}
                type="distributions_of_sentiment"
                margin={{ left: 40, top: 20, bottom: 20, right: 45 }}
                onMouseEnter={() =>
                  logEvent("AnalyticsSentDistributionUsed", { productId })
                }
              />
            </div>
          </div>

          <div
            key={"StarRatingDist"}
            className={
              "flex flex-col p-10 bg-white rounded-lg shadow-md justify-center"
            }
          >
            <div id="StarDist">
              <div className="flex w-full justify-between pb-5 items-center">
                <div className="text-gray-400 font-bold">
                  Distribution of Star Rating
                </div>
                {isExporting ? (
                  <div />
                ) : (
                  <div className={"flex items-center"}>
                    <p
                      className="mx-6 font-medium text-purple-400 cursor-pointer"
                      data-tip
                      data-for="starRatingToolTip"
                    >
                      <FaQuestionCircle className="text-gray-400 mt-1 -ml-12" />
                    </p>
                    <ReactTooltip
                      id="starRatingToolTip"
                      place="top"
                      effect="solid"
                    >
                      This is a representation of how your customers have
                      reviewed your product on a 1-5 star rating.
                    </ReactTooltip>
                    <div
                      className="bg-blue-pondr rounded-xl"
                      onClick={async () => {
                        setIsExporting(true);
                        const url = await toPng(
                          document.getElementById("StarDist")
                        );
                        setIsExporting(false);
                        await triggerBase64Download(
                          url,
                          productInfo.Product_name + " Star Distribution Graph",
                        );
                      }}
                      className={"cursor-pointer"}
                      onMouseEnter={({ target }) =>
                        (target.style.color = "#7779FC")
                      }
                      onMouseLeave={({ target }) =>
                        (target.style.color = "#6B7280")
                      }
                    >
                      <BiExport size="22px" color="#6B7280" className="" />
                    </div>
                  </div>
                )}
              </div>
              <PondrDistributionGraph
                product={analytics}
                type="distributions_of_star"
                margin={{ left: 15, top: 20, bottom: 20, right: 45 }}
                onMouseEnter={() =>
                  logEvent("AnalyticsStarDistributionUsed", { productId })
                }
              />
            </div>
          </div>
          <div
            className={
              "flex flex-col p-6 bg-white rounded-lg shadow-md justify-center text-gray-500"
            }
            key={"BestRev"}
          >
            <div className="h4 ml-5 text-blue-pondr mb-2 pt-5 pb-5">
              Best Review
            </div>
            <div className=" ml-5 mr-5 pb-5">
              <div className=" p2 text-base w-full text-gray-500">
                {analytics["Review-types"].best_review.length > 300
                  ? analytics["Review-types"].best_review.substring(0, 300) +
                    "... "
                  : analytics["Review-types"].best_review}
                <span
                  onClick={() => {
                    setReviewDisplayed(analytics["Review-types"].best_review);
                    setReviewTitle("Best Review");
                    setReviewModal(true);
                  }}
                  className={
                    "text-blue-pondr text-semibold outline-none focus:outline-none cursor-pointer"
                  }
                >
                  {analytics["Review-types"].best_review.length > 300
                    ? "Show more"
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              "flex flex-col p-6 bg-white rounded-lg shadow-md justify-center text-gray-500"
            }
            key={"WorstRev"}
          >
            <p className="ml-5 h4 text-gray-600 mb-2 pt-5 pb-5">Worst Review</p>
            <div className="ml-5 mr-5 pb-5">
              <div className=" p2 text-base w-full text-gray-500">
                {analytics["Review-types"].worst_review.length > 300
                  ? analytics["Review-types"].worst_review.substring(0, 300) +
                    "... "
                  : analytics["Review-types"].worst_review}
                <span
                  onClick={() => {
                    setReviewDisplayed(analytics["Review-types"].worst_review);
                    setReviewTitle("Worst Review");
                    setReviewModal(true);
                  }}
                  className={
                    "text-blue-pondr text-semibold outline-none focus:outline-none cursor-pointer"
                  }
                >
                  {analytics["Review-types"].worst_review.length > 300
                    ? "Show more"
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div
            key={"SentVariant"}
            className={
              "flex flex-col p-8 bg-white rounded-lg shadow-md justify-center"
            }
          >
            <div id="SentimentVariant">
              <div className="flex mb-5 pt-10 items-center">
                <div className="text-gray-400 font-bold">
                  Sentiment per variant
                </div>
                {isExporting ? (
                  <div />
                ) : (
                  <div className={"flex justify-start items-center"}>
                    <p
                      className="mx-6 font-medium text-purple-600 cursor-pointer"
                      data-tip
                      data-for="variantSentimentTooltip"
                    >
                      <FaQuestionCircle className="text-gray-400 mt-1 -ml-2 mr-24" />
                    </p>
                    <ReactTooltip
                      id="variantSentimentTooltip"
                      place="top"
                      effect="solid"
                    >
                      This graph displays how your customers generally feel
                      about each different variant of your product.
                    </ReactTooltip>
                    <div
                      className="flex flex-row-reverse bg-blue-pondr rounded-xl flex flex-row"
                      onClick={async () => {
                        setIsExporting(true);
                        const url = await toPng(
                          document.getElementById("SentimentVariant")
                        );
                        setIsExporting(false);
                        await triggerBase64Download(
                          url,
                          productInfo.Product_name + " Sentiment per Variant Graph",
                        );
                      }}
                      className={"cursor-pointer"}
                      onMouseEnter={({ target }) =>
                        (target.style.color = "#7779FC")
                      }
                      onMouseLeave={({ target }) =>
                        (target.style.color = "#6B7280")
                      }
                    >
                      <BiExport size="22px" color="#6B7280" className="" />
                    </div>
                  </div>
                )}
              </div>
              <PondrBarChart
                companyProducts={companyProducts}
                productsDisplayed={[analytics]}
                type={"best_sentiment_per_variant"}
                height={500}
                showLegend={false}
                layout={"vertical"}
                onMouseEnter={() =>
                  logEvent("AnalyticsSentPerVariantUsed", { productId })
                }
              />
            </div>
          </div>
          <div
            key={"SentCategory"}
            className={
              "flex flex-col p-8 bg-white rounded-lg shadow-md justify-center"
            }
          >
            <div id="SentimentCat">
              <div className="flex mb-5 pt-10 items-center">
                <div className="text-gray-400 font-bold">
                  Sentiment per category
                </div>
                {isExporting ? (
                  <div />
                ) : (
                  <div className={"flex items-center"}>
                    <p
                      className="mx-6 font-medium text-purple-400 cursor-pointer"
                      data-tip
                      data-for="categorySentimentTooltip"
                    >
                      <FaQuestionCircle className="text-gray-400 mt-1 -ml-2 mr-24" />
                    </p>
                    <ReactTooltip
                      id="categorySentimentTooltip"
                      place="top"
                      effect="solid"
                    >
                      This graph displays how your customers generally feel
                      about each aspect of your product.
                    </ReactTooltip>
                    <div
                      className="flex flex-row-reverse bg-blue-pondr rounded-xl flex flex-row"
                      onClick={async () => {
                        setIsExporting(true);
                        const url = await toPng(
                          document.getElementById("SentimentCat")
                        );
                        setIsExporting(false);
                        await triggerBase64Download(
                          url,
                          productInfo.Product_name + " Sentiment per Category Graph",
                        );
                      }}
                      className={"cursor-pointer"}
                      onMouseEnter={({ target }) =>
                        (target.style.color = "#7779FC")
                      }
                      onMouseLeave={({ target }) =>
                        (target.style.color = "#6B7280")
                      }
                    >
                      <BiExport size="22px" color="#6B7280" className="" />
                    </div>
                  </div>
                )}
              </div>
              <PondrBarChart
                companyProducts={companyProducts}
                productsDisplayed={[analytics]}
                type="sentiment_per_category"
                height={500}
                showLegend={false}
                layout={"vertical"}
                onMouseEnter={() =>
                  logEvent("AnalyticsSentPerCategoryBarUsed", { productId })
                }
              />
            </div>
          </div>
        </ResponsiveReactGridLayout>
      </div>
      <Modal
        visible={reviewModal}
        effect="fadeInUp"
        onClickAway={() => setReviewModal(false)}
      >
        <div
          className={"p-5 overflow-y-scroll"}
          style={{ width: "75vw", height: "50vh" }}
        >
          <div className={"flex justify-between"}>
            <p className={"h3 mb-2 text-blue-pondr"}>{reviewTitle}</p>
            <div
              onClick={() => setReviewModal(false)}
              className={"focus:outline-none cursor-pointer"}
            >
              <GiCancel size={30} color={"#7779FC"} />
            </div>
          </div>
          <p>{reviewDisplayed}</p>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    advanceAnalytics: state.app.advanceAnalytics,
    auth: state.firebase,
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceAnalytics);
