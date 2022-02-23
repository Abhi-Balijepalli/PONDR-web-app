import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Card from "../components/Card";
import StatusLabel from "../components/StatusLabel";
import CustomDataTable from "./CustomDataTable";
import { logEvent, logScreenName } from "../../utils/CommonFunctions";

const productsColumns = [
  {
    name: "Product Name",
    selector: "product_name",
    sortable: true,
    grow: 2,
    cell: (row) => (
      <div
        data-tag="allowRowEvents"
        className={`font-semibold ${
          row.processed ? "text-blue-pondr" : "text-gray-500"
        }`}
      >
        {row.Product_name}
      </div>
    ),
  },
  {
    name: "Category",
    selector: "Category",
    sortable: true,
    cell: (row) => <div data-tag="allowRowEvents">{row.Category}</div>,
  },
  {
    name: "Analytics Status",
    grow: 1,
    center: true,
    cell: (row) => (
      <div data-tag="allowRowEvents">
        <StatusLabel
          status={
            row.reanalyze
              ? "reanalyzing"
              : row.processed
              ? "ready"
              : "processing"
          }
        />
      </div>
    ),
  },
  {
    name: "Competitor Product",
    grow: 1,
    center: true,
    cell: (row) => (
      <div
        className={"flex item-center justify-between"}
        data-tag="allowRowEvents"
      >
        <div>
          <StatusLabel
            status={row.competitor_product ? "delay" : "none"}
            text={row.competitor_product ? "Yes" : "No"}
          />
        </div>
      </div>
    ),
  },
  {
    name: "",
    center: true,
    width: "10px",
    cell: (row) =>
      row.processed ? (
        <div className={"flex item-center"}>
          <svg
            viewBox="0 0 32 32"
            class="icon icon-chevron-right"
            viewBox="0 0 32 32"
            aria-hidden="true"
            data-tag="allowRowEvents"
          >
            <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z" />
          </svg>
        </div>
      ) : null,
  },
];

const CompanyDashboard = ({ onProductClicked, companyProducts }) => {
  // History hook
  const history = useHistory();

  // Calls a function to fetch the products
  useEffect(() => {
    logScreenName("MyProducts");
    logEvent("page_view", {
      page_name: "MyProducts",
      companyID:
        companyProducts.length > 0
          ? companyProducts[0].Company_id
          : "NoProducts",
    });
  }, []);

  return (
    <div
      className="block flex justify-center w-full mx-auto"
      style={{ minHeight: "75vh" }}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {companyProducts ? (
        <div className={"w-full flex items-center justify-center"}>
          <Card className="flex-1 pl-10 pr-10 overflow-hidder">
            <p className="h3 mt-10 ml-7 text-blue-pondr">My Products</p>
            <CustomDataTable
              columns={productsColumns}
              showSearchBar
              onRowClicked={(row) => {
                if (row.processed) {
                  onProductClicked(row);
                }
              }}
              showButton
              buttonText="Analyze Product"
              data={companyProducts}
              filterFields={["Product_name", "Category"]}
              handleAddNew={() => {
                history.push("/enterprise/create-product");
              }}
            />
          </Card>
        </div>
      ) : (
        <div
          className={"w-full h-screen flex justify-center items-center pb-24"}
        >
          <ReactLoading
            type={"spin"}
            color={"#7779FC"}
            height={"5%"}
            width={"5%"}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase,
  };
};

export default connect(mapStateToProps)(CompanyDashboard);
