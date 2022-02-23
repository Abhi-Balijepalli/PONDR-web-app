import React, { useState, useEffect } from "react";
import { logEvent, logScreenName } from "../utils/CommonFunctions";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../store/actions/authActions";
import Wrapper from "../utils/Wrapper";
import Button from "./components/Button";
import ReactLoading from "react-loading";
import Input from "./components/Input";
import Card from "./components/Card";

const signInFormSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = (props) => {
  // Sets a loading state
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await props.signIn(data);
  };

  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("SignIn");
    logEvent("page_view", { page_name: "SignIn" });
  }, []);

  return (
    <Wrapper>
      <Card className="mx-auto md:-mt-10  max-w-3/4 md:w-3/5 h-3/5 shadow-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center mt-5 md:auto mx-auto"
        >
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <div className="flex flex-wrap -mx-3 mb-12 mt-5 pl-10 pr-10 -mt-5 -mb-5">
            <div className="w-auto px-3 mb-4">
              <div className="h3 text-blue-pondr w-auto">Welcome to Pondr </div>
              <p className="w-full text-xl text-gray-600">
                Log in to access your dashboard{" "}
              </p>
              <div className="pb-10"></div>
            </div>

            {props.user.authError ? (
              <div className="w-full p-6 mx-3 mb-4 bg-red-200 border-2 border-red-600 text-red-600 rounded ">
                {props.user.authError}
              </div>
            ) : null}

            <Input
              className="w-full mb-8"
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="text"
              required
              ref={register}
              errors={errors}
            />

            <Input
              className="w-full"
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              required
              ref={register}
              errors={errors}
            />
            <Link
              to="/reset-password"
              className="mt-2 mb-8 px-3 w-full text-sm text-bold text-blue-pondr"
            >
              Forgot password?
            </Link>
            {isLoading && !props.user.authError ? (
              <div className="flex w-full px-3 justify-center pb-5">
                <ReactLoading
                  type={"spin"}
                  color={"#7779FC"}
                  height={"5%"}
                  width={"5%"}
                />
              </div>
            ) : (
              <div className="w-full px-3">
                <Button
                  className="w-full bg-blue-pondr border-blue-pondr hover:bg-blue-pondrdark focus:outline-none"
                  type="submit"
                >
                  <strong>Sign in to your account</strong>
                </Button>
                <div className="pb-5"></div>
              </div>
            )}

            <Link
              to="/signup"
              className="mt-2 mb-8 px-3 w-full text-center text-sm underline text-blue-pondr"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </Card>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: async (creds) => {
      const returnSignIn = await signIn(creds);
      dispatch(returnSignIn);
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
