// Commons functions used throughout the web app
import firebase from "firebase/app";
import "firebase/analytics";
import ReactPixel from "react-facebook-pixel";

// Initializes the FB Pixel
ReactPixel.init("570597537442511");

// PRE: Accepts an example date of 2021-06-05
// POST: Returns a string example date of Jun 5, 2021
const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const month = [
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
  ][dateObj.getMonth()];

  return month + " " + (dateObj.getDate() + 1) + ", " + dateObj.getFullYear();
};

// This is going to return a random color on the color wheel as a hexdcode
const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// This is going to take in a sentiment scale on a [-1, 1] interval and scale it to become a [1, 5] interval
const scaleSentiment = (sentimentScore) => {
  return parseFloat(
    (((sentimentScore - -1) / (1 - -1)) * (5 - 1) + 1).toFixed(2)
  );
};

// This is going to log a screen name to Firebase
const logScreenName = async (screenName) => {
  try {
    await firebase.analytics().setCurrentScreen(screenName);
    await ReactPixel.pageView();
    return 0;
  } catch (error) {
    return -1;
  }
};

// This is going to log an event to Firebase Analytics
const logEvent = async (eventName, params) => {
  try {
    await firebase.analytics().logEvent(eventName, params);
    return 0;
  } catch (error) {
    return -1;
  }
};

// This is going to log an event to the Facebook Pixel
const logFBEvent = async (eventName, params) => {
  ReactPixel.trackCustom(eventName, params);
};

export {
  formatDate,
  getRandomColor,
  scaleSentiment,
  logScreenName,
  logEvent,
  logFBEvent,
};
