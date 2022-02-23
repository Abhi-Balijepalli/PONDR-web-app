// This is the stacked bar graph that will show distributions on a 100% scale.
import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  LabelList,
} from "recharts";

// Creates the component
const PondrDistributionGraph = ({ product, type, margin, onMouseEnter }) => {
  // Structures the data based on the graph type
  const getProductData = (type) => {
    // The data array to return
    const finalDataArray = [];

    // Pulls the right data points based on the type
    let dataPoints = "";
    if (type === "distributions_of_star") {
      dataPoints = product["4"].distributions_of_star;
    } else if (type === "distributions_of_sentiment") {
      dataPoints = product["3"].distributions_of_sentiment;
    }

    // Calculates the sum of the data points (in order to calculate percentage later)
    let sum = 0;
    for (const dataPoint of dataPoints) {
      sum += dataPoint.sentence;
    }

    // Constructs the final data array
    for (let i = dataPoints.length - 1; i >= 0; i--) {
      const dataPoint = dataPoints[i];
      finalDataArray.push({
        name:
          type === "distributions_of_star"
            ? dataPoint.star_scale_sentiments === 1
              ? dataPoint.star_scale_sentiments + " Star"
              : dataPoint.star_scale_sentiments + " Stars"
            : "Sentiment Score: " + dataPoint.rating,
        Percentage: Math.round((dataPoint.sentence / sum) * 100),
        outOf: 100 - Math.round((dataPoint.sentence / sum) * 100),
      });
    }

    return finalDataArray;
  };

  // Gets the data
  const data = getProductData(type);

  // Returns a UI in case data is empty
  if (!data || data.length === 0) {
    return (
      <div
        style={{ height: 500 }}
        className={"flex flex-col text-center justify-center items-center w-full"}
      >
        <p className="text-gray-400 font-bold">Chart Unavailable</p>
        <p className="text-gray-400 font-medium px-5 pt-5">
          There may be a problem with the server or network or there might not
          be enough data. Please try again later.
        </p>
      </div>
    );
  }

  // Returns the UI
  return (
    <ResponsiveContainer height={350} width={"100%"}>
      <BarChart
        data={data}
        margin={margin}
        barCategoryGap={10}
        layout={"vertical"}
        onMouseEnter={() => {
          onMouseEnter();
        }}
      >
        <YAxis
          type={"category"}
          height={50}
          interval={0}
          dataKey="name"
          tickMargin={5}
          tickFormatter={(value) => {
            if (type === "distributions_of_star") {
              return value;
            } else if (type === "distributions_of_sentiment") {
              switch (parseInt(value.substring(value.indexOf(":") + 2))) {
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
                default:
                  return "";
              }
            }
          }}
        />
        <XAxis
          type={"number"}
          domain={[0, 100]}
          tickMargin={5}
          tickFormatter={(value) => value + "%"}
        />
        <Tooltip
          formatter={(value, name, props) => {
            if (name === "outOf") {
              return ["", ""];
            } else {
              return [value + "%", ""];
            }
          }}
          separator={""}
        />
        <Bar
          dataKey={"Percentage"}
          fill={product.color}
          stroke={product.color}
          strokeWidth={1}
          stackId={1}
        />
        <Bar
          dataKey={"outOf"}
          fill={"#F0F2F2"}
          stroke={"#E3E6E6"}
          strokeWidth={1}
          stackId={1}
          radius={[0, 5, 5, 0]}
        >
          <LabelList
            dataKey={"Percentage"}
            position={"right"}
            formatter={(value) => value + "%"}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// Exports the component
export default PondrDistributionGraph;
