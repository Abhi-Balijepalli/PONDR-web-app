import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./css/style.scss";
import AOS from "aos";
import { focusHandling } from "cruip-js-toolkit";
// Landing pages:
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import BlogPost4 from "./pages/BlogPost4";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Tutorial from "./pages/Tutorial";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";

// User signed in components:
import ProtectedRoute from "./partials/protectedRoute";
import UnprotectedRoute from "./partials/UnprotectedRoute";
import CompanySignUp from "./pages/CompanySignUp";
import AddProduct from "./pages/AddProduct";
import Wrapper from "./utils/Wrapper";
import DemoProduct from "./pages/Demo/DemoProduct";
import Updates from "./pages/Updates";
import Checkout from "./pages/Checkout/CheckoutSession";
import Pricing from "./pages/Pricing";

// Required StyleSheets
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import firebase from 'firebase';
import 'firebase/auth'

const App = (props) => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, []);

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={"/Home"} />} />
      <Route exact path="/Home">
        <Home />
      </Route>
      <Route exact path="/community">
        <Blog />
      </Route>
      <Route exact path="/contact-us">
        <ContactUs />
      </Route>
      <Route exact path="/blog-post">
        <BlogPost />
      </Route>
      <Route exact path="/blog-post2">
        <BlogPost2 />
      </Route>
      <Route exact path="/blog-post3">
        <BlogPost3 />
      </Route>
      <Route exact path="/launch-announcement">
        <BlogPost4 />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Route exact path="/pricing">
        <Pricing />
      </Route>
      <Route exact path="/terms">
        <TermsAndConditions />
      </Route>
      <Route exact path="/tutorial">
        <Wrapper>
          <Tutorial />
        </Wrapper>
      </Route>
      <Route exact path="/reset-password">
        <ResetPassword />
      </Route>
      <Route exact path="/enterprise/create">
        <CompanySignUp />
      </Route>
      <UnprotectedRoute exact path="/signin">
        <SignIn />
      </UnprotectedRoute>
      <Route exact path="/signup">
        <CompanySignUp />
      </Route>
      <Route exact path="/updates">
        <Updates />
      </Route>
      <Route exact path="/demo">
        <DemoProduct />
      </Route>

      {/* Protected routes are enables only when user signs in */}

      <ProtectedRoute path="/enterprise/product/">
        <Product />
      </ProtectedRoute>

      <ProtectedRoute exact path="/enterprise/create-product">
        <AddProduct />
      </ProtectedRoute>

      <ProtectedRoute path="/checkout">
        <Checkout />
      </ProtectedRoute>

      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default App;
