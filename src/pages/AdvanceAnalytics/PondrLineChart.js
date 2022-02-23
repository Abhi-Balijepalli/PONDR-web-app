// This is the file that will contain the BarGraph from recharts. It will render sentiment/stars over time graphs based on our data structure
// on an unlimited number of graphs
import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { scaleSentiment } from "../../utils/CommonFunctions";

// Creates the functional component
const PondrLineChart = ({
  productsDisplayed,
  companyProducts,
  type,
  showLegend,
  onMouseEnter,
  timePeriodSelected,
  ref,
}) => {
  // This is going to structure the data to be taken in by the graph that is going to be shown to display the sentiment/star over time
  // graph. Note: The length variable is in months.
  const getProductDataOverTime = (length, type) => {
    let productData = [];
    for (const product of productsDisplayed) {
      let productDataPoints = "";
      if (type === "product_trend_all") {
        productDataPoints = product["5"].product_trend_all.points;
      } else if (type === "product_trend_all_star") {
        productDataPoints = product["5"].product_trend_all_star.points;
      } else if (type.includes("Categorized_")) {
        // Gets the specific category to fetch
        const category = type.substring(type.indexOf("_") + 1);
        productDataPoints = product.summary.category_data[category];
      }

      // Sorts depending on the type of review
      if (type.includes("Categorized_")) {
        productDataPoints = productDataPoints.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } else {
        productDataPoints = productDataPoints.sort(
          (a, b) => new Date(b.x) - new Date(a.x)
        );
      }

      // Constructs monthly data points based on length parameter. If it is null, gets all time data, else gets the length
      let arrayOfMonths = [{}]; // Don't want the array to be empty so the big for loop runs at least once
      if (length !== null) {
        for (let i = 0; i < length - 1; i++) {
          arrayOfMonths.push({});
        }
      }

      let currentMonthIndex = 0;

      let currentMonthNum = new Date(productDataPoints[0].date).getMonth();
      for (
        let i = 0;
        i < productDataPoints.length &&
        currentMonthIndex < arrayOfMonths.length;
        i++
      ) {
        const dataPoint = productDataPoints[i];

        // Gets the x and y of the data depending on the review
        let dataX = "";
        let dataY = "";

        if (type.includes("Categorized_")) {
          dataX = dataPoint.date;
          dataY = dataPoint.score;
        } else {
          dataX = dataPoint.x;
          dataY = dataPoint.y;
        }

        if (new Date(dataX).getMonth() !== currentMonthNum) {
          currentMonthIndex++;
          if (type.includes("Categorized_")) {
            currentMonthNum = new Date(productDataPoints[i].date).getMonth();
          } else {
            currentMonthNum = new Date(productDataPoints[i].x).getMonth();
          }
          // Keeps the array going in case of all time data
          if (length === null) {
            arrayOfMonths.push({});
          }
        }

        if (currentMonthIndex === arrayOfMonths.length) {
          break;
        }

        // scales the score if it is sentiment, otherwise, leaves it alone
        let scaledScore = parseFloat(dataY.toFixed(2));
        if (type === "product_trend_all" || type.includes("Categorized_")) {
          scaledScore = scaleSentiment(dataY);
        }

        // Adds it to the month array
        if (Object.keys(arrayOfMonths[currentMonthIndex]).length === 0) {
          const date = new Date(dataX);
          date.setDate(0);
          arrayOfMonths[currentMonthIndex] = {
            date: date,
            sum: scaledScore,
            total: 1,
          };
        } else {
          arrayOfMonths[currentMonthIndex] = {
            ...arrayOfMonths[currentMonthIndex],
            sum: arrayOfMonths[currentMonthIndex].sum + scaledScore,
            total: arrayOfMonths[currentMonthIndex].total + 1,
          };
        }
      }
      // Constructs the average for each month (for the months found)
      arrayOfMonths = arrayOfMonths.filter(
        (eachMonth) => Object.keys(eachMonth).length > 0
      );

      for (let i = 0; i < arrayOfMonths.length; i++) {
        arrayOfMonths[i] = {
          date: arrayOfMonths[i].date,
          average: parseFloat(
            (arrayOfMonths[i].sum / arrayOfMonths[i].total).toFixed(2)
          ),
        };
      }

      // Adds the data into the final data
      for (let i = 0; i < arrayOfMonths.length; i++) {
        const monthDateTime = arrayOfMonths[i].date.getTime();
        const doesDateExist = productData.findIndex(
          (eachDate) => eachDate.date.getTime() === monthDateTime
        );

        if (doesDateExist > -1) {
          productData[i] = {
            ...productData[i],
            [companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id === product.product_id
            ).Product_name]: arrayOfMonths[i].average,
          };
        } else {
          productData.push({
            date: arrayOfMonths[i].date,
            [companyProducts.find(
              (eachCompanyProduct) =>
                eachCompanyProduct.Product_id === product.product_id
            ).Product_name]: arrayOfMonths[i].average,
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
    productData = productData.filter(
      (eachDataPoint) =>
        Object.keys(eachDataPoint).length === uniqueProductsCompared.length + 1
    );

    productData = productData.sort((a, b) => a.date - b.date);
    return productData;
  };

  // Fetches the data
  const data = getProductDataOverTime(timePeriodSelected, type);

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
        <p className="text-gray-400 font-medium px-20 pt-5">
          There may be a problem with the server or network or there might not
          be enough data. Please try again later.
        </p>
      </div>
    );
  }

  // Renders the component
  return (
    <ResponsiveContainer height={500} width={"100%"} ref={ref}>
      <AreaChart
        data={data}
        margin={{ left: 50, bottom: 10, top: 20, right: 50 }}
        onMouseEnter={() => onMouseEnter()}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickMargin={5}
          height={95}
          interval={Math.round(data.length * 0.03) <= 1 ? 1 : Math.round(data.length * 0.03)}
          tick={({ x, y, stroke, payload }) => (
            <g transform={`translate(${x},${y})`}>
              <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-35)"
              >
                {/* Formats the date correctly on the axis*/}
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ][payload.value.getMonth()] +
                  " " +
                  payload.value.getFullYear()}
              </text>
            </g>
          )}
        />
        <YAxis
          type={"number"}
          ticks={[1, 2, 3, 4, 5]}
          tickFormatter={(value) => {
            if (type === "product_trend_all_star") {
              return value === 1 ? 1 + " Star" : value + " Stars";
            }
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
        />
        <Tooltip
          labelFormatter={(label) => {
            const date = new Date(label);
            const newLabel =
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ][date.getMonth()] +
              " " +
              date.getFullYear();
            return newLabel;
          }}
          formatter={(value, name, props) =>
            type === "product_trend_all_star"
              ? [value + " Star Rating", ""]
              : [value + " Sentiment Score", ""]
          }
          separator={""}
        />
        {showLegend === false ? null : <Legend />}
        <defs>
          {productsDisplayed.map((eachProductCompared, index) => {
            return (
              <linearGradient
                key={index}
                id={"color" + index}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={eachProductCompared.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={eachProductCompared.color}
                  stopOpacity={0}
                />
              </linearGradient>
            );
          })}
        </defs>
        {productsDisplayed.map((eachProductCompared, index) => {
          const productName = companyProducts.find(
            (eachCompanyProduct) =>
              eachCompanyProduct.Product_id === eachProductCompared.product_id
          ).Product_name;
          return (
            <Area
              type="monotone"
              key={index}
              dataKey={productName}
              stroke={eachProductCompared.color}
              fill={"url(#color" + index + ")"}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PondrLineChart;
