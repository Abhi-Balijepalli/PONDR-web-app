import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import AdvanceAnalytics from "./AdvanceAnalytics/AdvanceAnalytics";
import CategoriesReviews from "./AdvanceAnalytics/CategoriesReviews";
import Tutorial from "./Tutorial";
import DashboardSideBar from "../partials/DashboardSidebar";
import DashboardTopHeader from "../partials/DashboardTopHeader";
import Wrapper from "../utils/Wrapper";
import AIQuestions from "./AdvanceAnalytics/AIQuestions";
import Compare from "./AdvanceAnalytics/Compare";
import CompanyDashboard from "./CompanyDashboard/CompanyDashboard";
import ReactLoading from "react-loading";
import {
  getProductsByCompany,
  getStripeCustomer,
  isCustomerSubscribed,
} from "../merlinv1/beta_api";
import { connect } from "react-redux";

const Product = (props) => {
  // State variables for the screen
  const [isLoading, setIsLoading] = useState(true);
  const [tabSelected, setTabSelected] = useState(0);
  const [tabHighlighted, setTabHighlighted] = useState(0);
  const [productSelected, setProductSelected] = useState("");
  const [companyProducts, setCompanyProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [canViewProduct, setCanViewProduct] = useState("");
  const [stripeCustomer, setStripeCustomer] = useState("");

  // The useLocation hook
  const history = useHistory();

  // Fetches and sets the initial state of the screen depending on what is passed in from the URL search params;
  useEffect(() => {
    // This is going to fetch a product's data manually if this screen does not have it's state
    const fetchProductData = async () => {
      // Checks to see if the person can access their data
      const stripeCustomer = await getStripeCustomer();
      console.log(stripeCustomer)
      setStripeCustomer(stripeCustomer);
      const stripeCustomerID = stripeCustomer.data.stripe_customer.id;
      // If user is within their 30 day free trial, lets them create product. Else, checks if they are subsscribed, else, makes them pay
      let dateCreated = parseFloat(props.user.createdAt);
      dateCreated = new Date(dateCreated);
      let daysSinceCreation = Math.ceil(
        (new Date() - dateCreated) / (1000 * 60 * 60 * 24)
      );
      const isSubscribed = (await isCustomerSubscribed(stripeCustomerID)).data
        .is_subscribed;

      setCanViewProduct(daysSinceCreation <= 30 || isSubscribed);

      const pathname = props.location.pathname;
      const indexOfString = pathname.indexOf("product/");
      if (indexOfString === -1) {
        history.push("/ErrorPage");
      }
      const stringToSearch = pathname.substring(indexOfString + 8);
      const searchParams = new URLSearchParams(stringToSearch);
      const objectSearchParams = Object.fromEntries(searchParams.entries());
      const companyProductsFetch = await getProductsByCompany();
      setCompanyProducts(companyProductsFetch.data.company_products);

      if (stringToSearch.length > 0) {
        const { productID } = objectSearchParams;

        if (!productID) {
          history.push("/ErrorPage");
        } else {
          const productInfo = companyProductsFetch.data.company_products.find(
            (eachProduct) => eachProduct.Product_id === productID
          );
          if (productInfo === -1) {
            history.push("/ErrorPage");
          } else {
            setProductSelected(productInfo);
            setTabHighlighted(1);
            setTabSelected(1);
          }
        }
      }
      setIsLoading(false);
    };

    fetchProductData();
  }, []);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ReactLoading type="spin" color="#7779FC" height="3%" width="3%" />
      </div>
    );
  } else {
    // Constructs the tabs
    let tabs = [];
    if (productSelected === "") {
      tabs = [
        <CompanyDashboard
          onProductClicked={(row) => {
            if (canViewProduct) {
              setProductSelected(row);
              setTabHighlighted(1);
              setTabSelected(1);
              history.replace({
                pathname:
                  "/enterprise/product/" +
                  new URLSearchParams({ productID: row.Product_id }),
              });
              setProductSelected(row);
              setRefresh(!refresh);
            } else {
              // Pushes the product information to the checkout
              history.push({
                pathname: "/checkout",
                state: {
                  productName: "NO_PRODUCT",
                  stripeCustomer: JSON.stringify({
                    stripe_customer: stripeCustomer.data.stripe_customer,
                    payment_method: stripeCustomer.data.payment_method,
                  }),
                },
              });
            }
          }}
          companyProducts={companyProducts}
        />,
        <Tutorial key={1} />,
        "Give Feedback",
      ];
    } else {
      tabs = [
        <CompanyDashboard
          onProductClicked={(row) => {
            if (canViewProduct) {
              setProductSelected(row);
              setTabHighlighted(1);
              setTabSelected(1);
              history.replace({
                pathname:
                  "/enterprise/product/" +
                  new URLSearchParams({ productID: row.Product_id }),
              });
              setProductSelected(row);
              setRefresh(!refresh);
            } else {
              // Pushes the product information to the checkout
              history.push({
                pathname: "/checkout",
                state: {
                  productName: "NO_PRODUCT",
                  stripeCustomer: JSON.stringify({
                    stripe_customer: stripeCustomer.data.stripe_customer,
                    payment_method: stripeCustomer.data.payment_method,
                  }),
                },
              });
            }
          }}
          companyProducts={companyProducts}
        />,
        <div>
          <div className="pb-10"></div>
          <div className="flex flex-row h3 mb-2 text-blue-pondr">
            Product Analytics
          </div>
          <AdvanceAnalytics
            key={1}
            companyProducts={companyProducts}
            productInfo={productSelected}
            category={productSelected.Category}
            productId={productSelected.Product_id}
          />
        </div>,
        <CategoriesReviews
          key={2}
          productId={productSelected.Product_id}
          companyProducts={companyProducts}
          productInfo={productSelected}
          demo={false}
        />,
        <AIQuestions
          key={3}
          productInfo={productSelected}
          productId={productSelected.Product_id}
          companyProducts={companyProducts}
        />,
        <Compare
          key={4}
          productId={productSelected.Product_id}
          productInfo={productSelected}
          companyProducts={companyProducts}
          demo={false}
        />,
        <Tutorial key={5} />,
        "Give Feedback",
      ];
    }

    return (
      <div className={"flex justify-between"}>
        <DashboardSideBar
          productSelected={productSelected}
          onTabChange={(newTabIndex) => {
            setTabSelected(newTabIndex);
            setTabHighlighted(newTabIndex);
          }}
          currentTabSelected={tabHighlighted}
        />
        <Wrapper dontShowHeader={true} isGrey={true} topHead={true}>
          <DashboardTopHeader />
          <div className="pb-10"></div>
          <div className="w-4/5 mx-auto">{tabs[tabSelected]}</div>
        </Wrapper>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(withRouter(Product));
