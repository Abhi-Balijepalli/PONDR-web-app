// This is the third step of the CheckoutSession
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import ReactLoading from "react-loading";
import {
  getStripeCouponCode,
  logFirestoreEvent,
} from "../../merlinv1/beta_api";

// Creates the component
const CheckoutStep3 = ({
  productName,
  price,
  features,
  goToPaymentInfo,
  paymentInformation,
  onCheckout,
  isCheckingOut,
}) => {
  // The state of the screen
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const [priceToCharge, setPriceToCharge] = useState(price);
  const [codeApplied, setCodeApplied] = useState("");

  // This is going to check if the coupon code is valid and applies the coupon to the price
  const applyCouponCode = async () => {
    setIsLoading(true);
    setInvalidCoupon(false);

    let coupon = (await getStripeCouponCode(promoCode)).data;

    if (typeof coupon === "string" && coupon.includes("No such coupon")) {
      setInvalidCoupon(true);
    } else {
      coupon = coupon.coupon;

      let newPrice = price;
      if (coupon.amount_off) {
        newPrice = newPrice - coupon.amount_off / 100;
      } else if (coupon.percent_off) {
        const percent = 1 - coupon.percent_off / 100;
        newPrice = newPrice * percent;
      }

      newPrice = Math.round(newPrice * 100) / 100;

      if (newPrice < 0) {
        newPrice = 0;
      }

      logFirestoreEvent("CouponCodeUsed", { code: promoCode });
      setPriceToCharge(newPrice);
      setCodeApplied(promoCode);
    }

    setPromoCode("");
    setIsLoading(false);
  };

  // Gets today's day's suffix
  const nth = () => {
    const d = new Date().getDate();
    if (d > 3 && d < 21) return d + "th";
    switch (d % 10) {
      case 1:
        return d + "st";
      case 2:
        return d + "nd";
      case 3:
        return d + "rd";
      default:
        return d + "th";
    }
  };

  // Returns the UI
  return (
    <div className={"flex w-10/12"}>
      <div className="w-3/5">
        <div
          className={"w-full p-6 bg-white rounded-xl shadow-xl flex flex-col"}
        >
          <p className={"text-2xl ml-5 font-semibold"}>
            {"Single Product Analysis"}
          </p>
          <div
            className={
              "w-11/12 self-center bg-gray-light rounded-xl px-8 pb-5 mt-10 mb-10"
            }
          >
            <div className={"flex w-full justify-between items-center mt-5"}>
              <p className={"text-2xl font-bold text-blue-pondr ml-5"}>
                {productName === "NO_PRODUCT" ? "Unlimited Products" : productName}
              </p>

              <div className={"text-blue-pondr flex items-start"}>
                <span className={"font-medium text-1xl self-start pt-3"}>
                  $
                </span>
                <span className={"font-bold text-4xl self-center"}>
                  {price}
                </span>
                <span className={"font-medium text-xl self-end pb-2"}>
                  &nbsp;/&nbsp;Month
                </span>
              </div>
            </div>
            <div className={"w-full flex flex-wrap items-center mt-16 pl-8"}>
              {features.map((eachFeature, index) => (
                <div key={index} className={"flex items-center w-1/2 mb-6"}>
                  {eachFeature.included ? (
                    <FaIcons.FaCheck color={"#3DD598"} size={35} />
                  ) : (
                    <AiFillLock size={35} color={"#DFDFDF"} />
                  )}
                  <p
                    className={
                      eachFeature.included
                        ? "font-medium text-lg ml-5"
                        : "text-gray-300 font-medium text-lg ml-5"
                    }
                  >
                    {eachFeature.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            "w-full p-6 bg-white rounded-xl shadow-xl flex flex-col mt-5"
          }
        >
          <div className={"flex w-full items-center justify-between"}>
            <p className={"text-2xl ml-5 font-semibold"}>Payment Information</p>
            <p
              className={
                "text-md text-blue-pondr font-semibold cursor-pointer focus:outline-none"
              }
              onClick={() => goToPaymentInfo()}
            >
              Edit Payment Information
            </p>
          </div>
          <div
            className={
              "w-11/12 self-center bg-gray-light rounded-xl px-8 py-5 pt-5 mt-10 mb-10 flex items-center"
            }
          >
            <div className={"p-5 bg-white rounded-full"}>
              <FaIcons.FaCreditCard color={"#7779FC"} size={35} />
            </div>
            <div className={"ml-10 flex flex-col items-start"}>
              <p className={"text-gray-400 font-semibold text-xl mb-2"}>
                {(
                  paymentInformation.paymentMethod.card.brand +
                  " " +
                  paymentInformation.paymentMethod.card.funding
                )
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </p>
              <p className={"text-blue-pondrgray font-semibold text-xl mb-2"}>
                •••• •••• •••• {paymentInformation.paymentMethod.card.last4}
              </p>
              <p className={"text-blue-pondrgray font-semibold text-xl"}>
                {paymentInformation.paymentMethod.billing_details.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "w-2/5 ml-5 p-6 bg-white rounded-xl shadow-xl flex flex-col justify-between"
        }
      >
        <div className={"ml-5 w-full"}>
          <p className={"text-2xl font-semibold"}>Order Summary</p>
          <p className={"text-xl text-gray-400 font-normal mt-16"}>
            Have a promo code?
          </p>
          <div className={"flex items-center mt-3 w-full"}>
            <input
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder={"Enter code..."}
              className={
                "pl-5 py-3 border-solid border border-gray-300 w-1/2 outline-none focus:outline-none"
              }
            />
            {isLoading ? (
              <ReactLoading
                type={"spin"}
                color={"#7779FC"}
                height={"8%"}
                width={"8%"}
                className={"ml-5"}
              />
            ) : (
              <div
                onClick={() => applyCouponCode()}
                className={
                  "btn px-5 py-4 -ml-5 bg-blue-pondrgray text-white text-xl font-semibold hover:bg-purple-light hover:text-blue-pondr rounded-full focus:outline-none"
                }
              >
                Apply
              </div>
            )}
          </div>
          {invalidCoupon ? (
            <p className={"text-md text-red-600 font-normal"}>
              Whoops. Invalid Code.
            </p>
          ) : (
            <div />
          )}
          <div
            className={
              "w-4/5 flex items-center justify-between pb-3 border-b border-b-solid border-b-gray-200 mt-10 px-1"
            }
          >
            <p className={"text-xl text-gray-400 font-normal"}>Description</p>
            <p className={"text-xl text-gray-400 font-normal"}>Price</p>
          </div>
          <div className={"w-4/5 flex items-center justify-between mt-2 px-1"}>
            <p className={"text-xl text-blue-pondr font-semibold"}>
              {productName === "NO_PRODUCT" ? "Unlimited Products" : productName}
            </p>
            <p className={"text-xl text-blue-pondr font-semibold"}>
              ${price.toFixed(2)}
            </p>
          </div>
          {price !== priceToCharge ? (
            <div
              className={"w-4/5 flex items-center justify-between mt-2 px-1"}
            >
              <p className={"text-xl text-blue-pondr font-semibold"}>
                Promo Code
              </p>
              <p className={"text-xl text-blue-pondr font-semibold"}>
                -${(price - priceToCharge).toFixed(2)}
              </p>
            </div>
          ) : (
            <div />
          )}
          <div
            className={
              "w-4/5 flex items-center justify-between pb-3 border-b border-b-solid mt-10 px-1"
            }
          >
            <p className={"text-xl text-gray-400 font-normal"}>
              Payment Method
            </p>
            <p
              className={
                "text-xl text-blue-pondr border-b border-b-solid border-blue-pondr font-normal"
              }
            >
              {paymentInformation.paymentMethod.card.brand
                .toLowerCase()
                .split(" ")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}
            </p>
          </div>
          <div className={"w-4/5 flex items-center justify-between mt-5 px-1"}>
            <p className={"text-lg text-black font-semibold"}>
              Total Due Today:
            </p>
            <p className={"text-xl text-blue-pondr font-bold text-right"}>
              ${priceToCharge.toFixed(2)} USD
            </p>
          </div>
          <div
            className={
              "w-4/5 text-medium text-center mt-5 text-gray-400 font-normal"
            }
          >
            Your card will be charged on the {nth()} of every month starting
            today.
          </div>
        </div>
        <div className={"w-full flex justify-center items-center"}>
          {isCheckingOut ? (
            <ReactLoading
              type={"spin"}
              color={"#7779FC"}
              height={"13%"}
              width={"13%"}
              className={"mb-10"}
            />
          ) : (
            <div
              onClick={() => onCheckout(priceToCharge, codeApplied)}
              className={
                "btn px-5 py-4 mb-10 bg-blue-pondr text-white text-xl font-semibold hover:bg-blue-pondrgray rounded-full focus:outline-none"
              }
            >
              Confirm Payment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Exports the component
export default CheckoutStep3;
