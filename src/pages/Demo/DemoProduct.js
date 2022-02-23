import React, { useEffect, useState } from "react";
import Wrapper from "../../utils/Wrapper";
import Tutorial from "../Tutorial";
import AdvanceAnalytics from "../AdvanceAnalytics/AdvanceAnalytics";
import DashboardHeader from "../../partials/DashboardHeader";
import DashboardSideBar from "../../partials/DashboardSidebar";
import Compare from "../AdvanceAnalytics/Compare";
import AIQuestions from "../AdvanceAnalytics/AIQuestions";
import { MacbookProduct } from "./DemoData";
import { logFirestoreEvent } from "../../merlinv1/beta_api";

const DemoProduct = () => {
  // State variables for the current tab selected
  const [tabSelected, setTabSelected] = useState(1);

  useEffect(() => {
    logFirestoreEvent("DemoView", {});
  }, []);

  // Replace 3rd index with "<CategoriesReviews key={2} demo={true} />," if you want to show Categorized in demo
  const tabs = [
    "My Products/Home",
    <div>
      <div className="pb-10"></div>
      <div className="flex flex-row h3 mb-2 text-blue-pondr">
        Product Analytics
      </div>
      <AdvanceAnalytics isDemo={true} key={1} />
    </div>,
    <div key={2} className="text-center ">
      <div className="pb-10"></div>
      <div className="pb-20">
        <p className="h4">Feature Available For Users Only</p>
        <p>Sign up now to gain access to this feature!</p>
      </div>
    </div>,
    <AIQuestions key={3} demo={true} productInfo={MacbookProduct} />,
    <Compare key={4} demo={true} />,
    <Tutorial key={5} />,
    "Give Feedback",
  ];

  return (
    <div className={"flex justify-between h-full"}>
      <DashboardSideBar
        onTabChange={(newTabIndex) => setTabSelected(newTabIndex)}
        currentTabSelected={tabSelected}
        isDemo={true}
      />
      <Wrapper isGrey={true} dontShowHeader={true}>
        <DashboardHeader />
        <div className="pb-10"></div>
        <div className="w-4/5 mx-auto">{tabs[tabSelected]}</div>
      </Wrapper>
    </div>
  );
};

export default DemoProduct;
