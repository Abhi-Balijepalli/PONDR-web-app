import { useCookies, Cookies } from "react-cookie";
import { logFirestoreEvent } from "../../merlinv1/beta_api";
import ReactPixel from "react-facebook-pixel";

export const signIn = async (creds) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      ReactPixel.init("570597537442511", { em: creds.email });
      logFirestoreEvent("UserSignIn", { email: creds.email });
      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", err: err });
    }
  };
};

// This is going to refresh the token for a signed in user every time
export const refreshToken = async () => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", err: err });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((err) => {
        // An error happened.
        dispatch({ type: "SIGNOUT_ERROR", err: err });
      });
  };
};
