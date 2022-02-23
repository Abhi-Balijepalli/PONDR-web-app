// This is the file that will contain the BarGraph from recharts. It will render sentiment graphs based on our data structure
// on an unlimited number of graphs
import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
} from "recharts";
import { scaleSentiment } from "../../utils/CommonFunctions";

// Creates the functional component
const PondrBarChart = ({
  productsDisplayed,
  companyProducts,
  height,
  showLegend,
  type,
  layout,
  onMouseEnter,
}) => {
  // This is going to structure the data to be taken in by the graph in correct format for the bar graph
  const getProductData = (type) => {
    // Retrieves all of the separate product categories
    let data = [];
    for (const product of productsDisplayed) {
      let dataPoints = [];
      // Fetches the data points based on the graph type
      if (type.includes("sentiment_per_category")) {
        dataPoints = product["1"].sentiment_per_category;
      } else if (type.includes("sentiment_per_variant")) {
        dataPoints = product["2"].sentiment_per_variant;
      }
      for (const eachDataPoint of dataPoints) {
        let dataName = "";
        if (type.includes("sentiment_per_category")) {
          dataName = eachDataPoint.category;
        } else if (type.includes("sentiment_per_variant")) {
          dataName = eachDataPoint.variant;
          if (dataName === "") {
            dataName = "Base Variant";
          }
        }
        const doesCategoryExist = data.findIndex(
          (eachExistingCategory) =>
            eachExistingCategory.name.toLowerCase() === dataName.toLowerCase()
        );

        // Scales the scores from [-1, 1] to [0, 5]
        const scaledScore = scaleSentiment(eachDataPoint.score);

        // If dataName exists in array, this product's data is appended to the dataName objects
        if (doesCategoryExist > -1) {
          data[doesCategoryExist] = {
            ...data[doesCategoryExist],
            [companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id === product.product_id
            ).Product_name]: scaledScore,
          };
        } else {
          data.push({
            name:
              dataName.substring(0, 1).toUpperCase() + dataName.substring(1),
            ...data[doesCategoryExist],
            [companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id === product.product_id
            ).Product_name]: scaledScore,
          });
        }
      }
    }

    // Creates a copy of products compared that takes out duplicates in order not to crash graphs once the data is spliced correctly
    const uniqueProductsCompared = productsDisplayed.filter(
      (eachProduct, index) =>
        productsDisplayed.findIndex(
          (eachInnerProduct) =>
            eachProduct.product_id === eachInnerProduct.product_id
        ) === index // Filers out duplicates
    );

    // Splices all the data points that only contain data for a specific product
    data = data.filter(
      (eachDataPoint) =>
        Object.keys(eachDataPoint).length === uniqueProductsCompared.length + 1
    );

    // Returns best/worst three depending on the type
    if (type.includes("best")) {
      data = data.sort(
        (a, b) =>
          b[
            companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id ===
                productsDisplayed[0].product_id
            ).Product_name
          ] -
          a[
            companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id ===
                productsDisplayed[0].product_id
            ).Product_name
          ]
      );
    } else if (type.includes("worst")) {
      data = data.sort(
        (a, b) =>
          a[
            companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id ===
                productsDisplayed[0].product_id
            ).Product_name
          ] -
          b[
            companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id ===
                productsDisplayed[0].product_id
            ).Product_name
          ]
      );
    }
    if (data.length > 3) {
      data = data.slice(0, 3);
    }

    return data;
  };

  const data = getProductData(type);

  // Returns a UI in case data is empty
  if (!data || data.length === 0) {
    return (
      <div
        style={{ height: 500 }}
        className={
          "flex flex-col text-center justify-center items-center w-full"
        }
      >
        <p className="text-gray-400 font-bold">Chart Unavailable</p>
        <p className="text-gray-400 font-medium px-5 pt-5">
          There is not enough data to display this chart. Please check again later.
        </p>
      </div>
    );
  }

  // Renders the component
  return (
    <ResponsiveContainer
      height={height ? height : data.length * 200}
      width={"100%"}
    >
      <BarChart
        onMouseEnter={() => {
          onMouseEnter();
        }}
        data={data}
        margin={{ left: 50, bottom: 20, top: 20, right: 50 }}
        layout={layout ? layout : "horizontal"}
        barCategoryGap={data.length === 1 ? 15 : 30}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === "vertical" ? (
          <YAxis
            type={"category"}
            height={50}
            interval={0}
            dataKey="name"
            tickMargin={5}
            tickFormatter={(value) =>
              value.substring(0, 1).toUpperCase() + value.substring(1)
            }
          />
        ) : (
          <XAxis
            type={"category"}
            height={50}
            interval={0}
            dataKey="name"
            tickMargin={5}
            tickFormatter={(value) =>
              value.substring(0, 1).toUpperCase() + value.substring(1)
            }
          />
        )}
        {layout === "vertical" ? (
          <XAxis
            type={"number"}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => {
              switch (value) {
                case 1:
                  return "Very Unsatisfied";
                case 2:
                  return "Unsatisfied";
                case 3:
                  return "Neutral";
                case 4:
                  return "Satisfied";
                case 5:
                  return "Very Satisfied";
              }
            }}
            domain={[1, 5]}
            tickMargin={5}
            height={50}
          />
        ) : (
          <YAxis
            type={"number"}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => {
              switch (value) {
                case 1:
                  return "Very Unsatisfied";
                case 2:
                  return "Unsatisfied";
                case 3:
                  return "Neutral";
                case 4:
                  return "Satisfied";
                case 5:
                  return "Very Satisfied";
              }
            }}
            domain={[1, 5]}
            tickMargin={5}
            height={50}
          />
        )}
        <Tooltip
          formatter={(value, name, props) => [value + " Sentiment Score", ""]}
          separator={""}
        />
        {showLegend === false ? null : <Legend />}
        {productsDisplayed.map((eachProductCompared, index) => (
          <Bar
            key={index}
            dataKey={
              companyProducts.find(
                (eachCompanyProduct) =>
                  eachCompanyProduct.Product_id ===
                  eachProductCompared.product_id
              ).Product_name
            }
            fill={eachProductCompared.color}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PondrBarChart;
