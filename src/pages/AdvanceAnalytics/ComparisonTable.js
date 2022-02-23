// This is going to render the comparison table for the Compare page given a list of products
import React from "react";
import ReactStars from "react-stars";

// Creates the component
const ComparisonTable = ({ productsDisplayed, companyProducts }) => {
  // Variables to help render the product comparison tables
  const cellClassNoBorder =
    "w-full py-3 flex justify-start px-3 items-center border-b-solid border-b-2 border-b-gray-300";
  const cellClassBorder =
    cellClassNoBorder + " border-r-solid border-r-2 border-r-gray-300";

  // Function fetches the number of unique categories between the products that are being compared
  const getUniqueCategories = () => {
    // Combines all the categories into one array then filters the duplicates
    let allCategories = [];
    for (const product of productsDisplayed) {
      let categories = Object.keys(product.summary.category_data);
      categories = categories.filter(
        (eachCategory) => product.summary.category_data[eachCategory].length > 0
      );
      allCategories = allCategories.concat(categories);
    }

    const uniqueProductsCompared = allCategories.filter(
      (eachCategory, index) => allCategories.indexOf(eachCategory) === index // Filers out duplicates
    );

    return uniqueProductsCompared;
  };

  // More Variables to help render the product comparison tables
  const uniqueCategories = getUniqueCategories();

  // Renders each row of the chart
  const renderRow = (categoryTitle, renderPoint) => {
    return [
      <p className={"font-bold text-blue-pondr text-start"}>{categoryTitle}</p>,
    ]
      .concat(
        productsDisplayed.map((eachProduct, index) => (
          <p key={index} className={"font-medium align-center"}>
            {renderPoint(eachProduct)}
          </p>
        ))
      )
      .map((eachDiv, index) => (
        <div
          key={index}
          className={
            index === productsDisplayed.length
              ? cellClassNoBorder
              : cellClassBorder
          }
        >
          {eachDiv}
        </div>
      ));
  };

  // Returns the UI
  return (
    <div className={"w-full border-solid border-2 border-gray-300 border-b-0"}>
      <div className={"flex w-full justify-evenly"}>
        {[<p className={"font-bold"}>Category</p>]
          .concat(
            productsDisplayed.map((eachProduct, innerIndex) => {
              const companyProduct = companyProducts.find(
                (eachCompanyProduct) =>
                  eachCompanyProduct.Product_id === eachProduct.product_id
              );
              return (
                <p
                  key={innerIndex}
                  className={
                    companyProduct.competitor_product
                      ? "font-bold text-blue-pondrgray"
                      : "font-bold text-blue-pondr"
                  }
                >
                  {companyProduct.Product_name}
                </p>
              );
            })
          )
          .map((eachDiv, index) => (
            <div
              key={index}
              className={
                index === productsDisplayed.length
                  ? cellClassNoBorder
                  : cellClassBorder
              }
            >
              {eachDiv}
            </div>
          ))}
      </div>
      <div className={"flex w-full justify-start"}>
        {renderRow(
          "Number of Ratings",
          (eachProduct) => eachProduct.summary.num_of_reviews
        )}
      </div>
      <div className={"flex w-full justify-start"}>
        {renderRow(
          "Number of Positive Reviews",
          (eachProduct) =>
            eachProduct["5"].product_trend_all.points.filter(
              (eachPoint) => eachPoint.y >= 0
            ).length
        )}
      </div>
      <div className={"flex w-full justify-start"}>
        {renderRow(
          "Number of Negative Reviews",
          (eachProduct) =>
            eachProduct["5"].product_trend_all.points.filter(
              (eachPoint) => eachPoint.y < 0
            ).length
        )}
      </div>
      <div className={"flex w-full justify-start"}>
        {renderRow("Average Star Rating", (eachProduct) => (
          <ReactStars
            count={5}
            value={eachProduct.summary.mean_star_rating}
            edit={false}
            size={24}
            color2={"#7779FC"}
          />
        ))}
      </div>
      <div className={"flex w-full justify-start"}>
        {[
          <div>
            <p className={"font-bold text-blue-pondr text-start pb-5 mb-4"}>
              Number of Reviews per Category
            </p>
            {uniqueCategories.map((eachCategory, index) => (
              <p
                className={"font-light text-blue-pondr text-start pb-10 -mt-5"}
                key={index}
              >
                {eachCategory.substring(0, 1).toUpperCase() +
                  eachCategory.substring(1)}
              </p>
            ))}
          </div>,
        ]
          .concat(
            productsDisplayed.map((eachProduct, index) => (
              <div key={index}>
                {uniqueCategories.map((eachCategory) => (
                  <p className={"font-medium pt-1 pb-5"}>
                    {eachProduct.summary.category_data[eachCategory] &&
                    eachProduct.summary.category_data[eachCategory].length > 0
                      ? eachProduct.summary.category_data[eachCategory].length
                      : "-"}
                  </p>
                ))}
              </div>
            ))
          )
          .map((eachDiv, index) => (
            <div
              key={index}
              className={
                index === productsDisplayed.length
                  ? cellClassNoBorder
                  : cellClassBorder
              }
            >
              {eachDiv}
            </div>
          ))}
      </div>
      <div className={"flex w-full justify-start"}>
        {renderRow("Price", (eachProduct) =>
          typeof eachProduct.summary.price === "number"
            ? "$" + eachProduct.summary.price.toFixed(2)
            : eachProduct.summary.price
        )}
      </div>
    </div>
  );
};

// Exports the component
export default ComparisonTable;
