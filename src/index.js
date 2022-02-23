import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { CookiesProvider } from "react-cookie";
import ReactLoading from "react-loading";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  isLoaded,
} from "react-redux-firebase";
import rootReducer from "./store/reducers/rootReducer";
import firebase from "./firebase.config";
import App from "./App";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(getFirebase))
);

const rrfProps = {
  firebase: firebase,
  config: { attachAuthIsReady: true },
  dispatch: store.dispatch,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) {
    return (
      <div className={"w-full h-screen flex justify-center items-center"}>
        <ReactLoading
          type={"spin"}
          color={"#7779FC"}
          height={"3%"}
          width={"3%"}
        />
      </div>
    );
  }
  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CookiesProvider>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
              <App />
            </AuthIsLoaded>
          </ReactReduxFirebaseProvider>
        </Provider>
      </CookiesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
