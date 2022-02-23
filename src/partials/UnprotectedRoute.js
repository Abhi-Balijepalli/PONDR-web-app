import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
function UnprotectedRoute ({ children, ...rest }) {
  const auth = useSelector(state => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => auth.isLoaded && auth.isEmpty
        ? (
            children
          )
        : (
          <Redirect
            to={{
              pathname: "/enterprise/product/",
              state: { from: location }
            }}
          />
          )}
    />
  );
}

export default UnprotectedRoute;
