import React, { useState } from "react";
import MediaQuery from "react-responsive";
import { Link, useHistory } from "react-router-dom";
import { FaRegChartBar } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { logFirestoreEvent } from "../merlinv1/beta_api";

const DashboardSidebar = ({
  onTabChange,
  currentTabSelected,
  isDemo,
  productSelected,
}) => {
  // This is the history hook
  const history = useHistory();

  const isProductSelected = productSelected !== "";

  // Renders each item in the list
  const renderListItem = (index, title, onPress, image) => {
    return (
      <li
        className={`w-11/12 py-4 ml-2 rounded-sm text-white mb-0.5 last:mb-0 mr-5  ${
          currentTabSelected === index && "bg-blue-pondr opacity-60"
        }`}
      >
        <div
          onClick={() => {
            if (onPress) {
              onPress();
            } else {
              onTabChange(index);
            }
          }}
          className={
            "text-gray-600 hover:text-black transition duration-150 cursor-pointer"
          }
        >
          <div className={"flex flex-grow items-center"}>
            <div className={"flex-shrink-0 mx-4 h-7 w-1/12 "}>{image}</div>
            <div />
            <hr className="my-2" />
            <span
              className={`text-sm lg:text-md font-medium  ${
                currentTabSelected === index && "text-white"
              }`}
            >
              {title}
            </span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="w-1/7 min-w-48">
      {/* Sidebar */}
      <div
        className={`fixed z-40 left-0 top-0 static left-auto top-auto translate-x-0  transform h-full w-1/6 mr-10 min-w-48 flex-shrink-0 py-5 transition-transform duration-200 ease-in-out ${"translate-x-0  bg-white  shadow-xl pr-5 "}`}
      >
        {/* Sidebar header */}
        {/* Close/Open button */}

        <div className="flex justify-between pr-3 sm:px-2 pb-10">
          {/* Logo */}
          <div
            className="block px-10 pt-10 items-center cursor-pointer"
            onClick={() => history.push("/Home")}
          >
            <img
              className="w-auto rounded bg-black"
              src={"https://firebasestorage.googleapis.com/v0/b/pondr-306720.appspot.com/o/general-site-images%2FAsset%2025%402x.webp?alt=media&token=e1414add-2f42-4933-bdd5-3e236928a6ac"}
              alt="pondr-blue-logo"
              class="responsive"
              className="center"
              width="130"
              height="100"
            />
          </div>
          <div className="pb-10"></div>
        </div>

        <ul className="mt-5 ml-3 mr-3">
          {isDemo
            ? renderListItem(
                0,
                "Home",
                () => {
                  history.push("/Home");
                },
                <FaHome color={currentTabSelected === 0 ? "#FFFFFF" : ""} />
              )
            : renderListItem(
                0,
                "My Products",
                null,
                <FaBoxOpen color={currentTabSelected === 0 ? "#FFFFFF" : ""} />
              )}
          {isProductSelected || isDemo ? (
            <div>
              {renderListItem(
                1,
                "Analytics",
                null,
                <FaRegChartBar
                  color={currentTabSelected === 1 ? "#FFFFFF" : ""}
                />
              )}
              {renderListItem(
                2,
                "Categorized Reviews",
                null,
                <FaSlidersH color={currentTabSelected === 2 ? "#FFFFFF" : ""} />
              )}
              {renderListItem(
                3,
                "AI Q&A",
                null,
                <FaBolt color={currentTabSelected === 3 ? "#FFFFFF" : ""} />
              )}
              {renderListItem(
                4,
                "Comparison Tool",
                null,
                <FaBalanceScale
                  color={currentTabSelected === 4 ? "#FFFFFF" : ""}
                />
              )}
            </div>
          ) : null}

          {renderListItem(
            isProductSelected || isDemo ? 5 : 1,
            "Tutorial",
            null,
            <FaQuestionCircle
              color={
                isProductSelected || isDemo
                  ? currentTabSelected === 5
                    ? "#FFFFFF"
                    : ""
                  : currentTabSelected === 1
                  ? "#FFFFFF"
                  : ""
              }
            />
          )}
          {renderListItem(
            isProductSelected || isDemo ? 6 : 2,
            "Give Feedback",
            () => {
              logFirestoreEvent("GiveFeedback", {});
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfue2BO9Wmp7Yfxu79f_7jaVW4LZHQcUx2tVuNFY1LWbtpj_Q/viewform?usp=sf_link",
                "_blank"
              );
            },
            <FaComments
              color={
                isProductSelected || isDemo
                  ? currentTabSelected === 6
                    ? "#FFFFFF"
                    : ""
                  : currentTabSelected === 2
                  ? "#FFFFFF"
                  : ""
              }
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
