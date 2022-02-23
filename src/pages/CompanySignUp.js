import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { logEvent, logFBEvent, logScreenName } from "../utils/CommonFunctions";
import Wrapper from "../utils/Wrapper";
import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";
import { signIn } from "../store/actions/authActions";
import { enterpriseCreate, logFirestoreEvent } from "../merlinv1/beta_api";
import { useHistory, withRouter } from "react-router";
import { GiCancel } from "react-icons/gi";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

const CompanySignUpFormSchema = Yup.object({
  firstname: Yup.string().required(
    "Person of contact's first name is required"
  ),
  lastname: Yup.string().required("Person of contact's last name is required"),
  phoneNum: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  companyName: Yup.string()
    .required("Company name is required")
    .max(100, "Company name cannot be more than 100 letters"),
  category: Yup.string().required("Category is required"),
  outreachType: Yup.string().required("This field is required"),
});

const CompanySignUp = (props) => {
  const history = useHistory();

  // State for the screen
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    logFirestoreEvent("CompanySignUpView", {});
  }, []);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(CompanySignUpFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phoneNum: "",
      email: "",
      password: "",
      passwordConfirm: "",
      companyName: "",
      category: "",
      outreachType: "",
    },
  });

  const onSubmit = async (data) => {
    // Creates the company, signs in, then navigates to the correct screen
    try {
      setIsLoading(true);
      const res = await enterpriseCreate(
        data.companyName,
        data.category,
        "+1" + data.phoneNum,
        data.email,
        data.password,
        data.firstname,
        data.lastname,
        data.outreachType
      );

      const responseData = res.data;

      if (responseData.success) {
        await props.signIn(data);
        logFirestoreEvent("CompanySignUpSuccess", {
          companyName: data.companyName,
        });
        logFBEvent("CompanySignUp", {});
        setTimeout(() => {
          history.push("/enterprise/create-product");
          setIsLoading(false);
        }, 1000);
      } else if (responseData.includes("PHONE_NUMBER_EXISTS")) {
        setErrorMessage("This phone number is already linked to an account.");
        setErrorModal(true);
        setIsLoading(false);
      } else if (responseData.includes("EMAIL_EXISTS")) {
        setErrorMessage("This email address is already linked to an account.");
        setErrorModal(true);
        setIsLoading(false);
      } else if (responseData.includes("An Error Occured")) {
        logFirestoreEvent("404Error", { err: responseData });
        setIsLoading(false);
        history.push("/ErrorPage");
      }
    } catch (err) {
      logFirestoreEvent("404Error", { err: err });
      history.push("/ErrorPage");
    }
  };

  // Sets screen analytics
  useEffect(() => {
    window.scroll(0, 0);
    logScreenName("CompanySignUp");
    logEvent("page_view", { page_name: "CompanySignUp" });
  }, []);

  return (
    <Wrapper>
      <Card className="mx-auto -mt-5 -pb-10 md:w-3/5 md:-pb-20 h-2/5 shadow-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center md:w-5/6 mx-auto"
        >
          <div className="flex flex-wrap -mx-3 mb-12">
            <div className={"flex items-center w-full justify-between"}>
              <div className="w-full px-3 mb-4">
                <p className="w-full h3 text-blue-pondr">
                  Create Your Account{" "}
                </p>
                <p className="w-full h5 mt-4 text-gray-600">
                  Get started on analyzing your products for&nbsp;
                  <span className={"text-blue-pondr font-semibold"}>free</span>
                </p>
                <div className="pb-10"></div>
              </div>
            </div>

            {error ? (
              <div className="text-sm w-full p-6 mx-3 mb-4 bg-red-200 border-2 border-red-600 text-red-600 rounded">
                {error}
              </div>
            ) : null}

            <div className="flex flex-row mb-8 justify-between items-center w-full">
              <Input
                className={"w-1/2"}
                name="firstname"
                label="First Name"
                placeholder="Enter your first name"
                type="text"
                required
                ref={register}
                errors={errors}
              />

              <Input
                className={"w-1/2"}
                name="lastname"
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
                required
                ref={register}
                errors={errors}
              />
            </div>

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
              className="w-full mb-8"
              name="phoneNum"
              label="Phone Number"
              placeholder="Enter your phone number"
              type="text"
              required
              ref={register}
              errors={errors}
              maxLength={10}
            />

            <Input
              className="w-full mb-8"
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              required
              ref={register}
              errors={errors}
            />

            {/* <div className='w-full px-3 mb-8'>
            <label className='form-label block text-gray-800 text-sm font-medium mb-1' htmlFor='passwordConfirm'>
              Password Confirmation<span className='text-red-600'>*</span>
            </label>
            <input className='form-input w-full text-gray-800' name='passwordConfirm' type='password' placeholder='Enter your password' ref={register} />
            <p className='block text-sm font-medium text-red-600'>
              <ErrorMessage errors={errors} name='passwordConfirm' />
            </p>
          </div> */}

            <Input
              className="w-full mb-8"
              name="passwordConfirm"
              label="Confirm Password"
              placeholder="Enter your password again"
              type="password"
              required
              ref={register}
              errors={errors}
            />

            <div className="w-full px-3 mb-4">
              <hr />
            </div>

            <div className="w-full px-3 mb-8">
              <p className="w-full h4">Company Information</p>
            </div>

            <Input
              className="w-full mb-8"
              name="companyName"
              label="Company name"
              placeholder="Enter the company name"
              type="text"
              required
              ref={register}
              errors={errors}
            />

            <div className="w-full px-3 mb-8">
              <label
                className="form-label block text-gray-800 text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category<span className="text-red-600">*</span>
              </label>
              <select
                ref={register}
                name="category"
                className="form-select w-full focus:outline-none"
              >
                <option value="" disabled defaultValue>
                  Select your Category
                </option>
                <option>Art</option>
                <option>Baby</option>
                <option>Beauty</option>
                <option>Books</option>
                <option>Camera & Photo</option>
                <option>Clothing & Accessories</option>
                <option>Computer Accessories</option>
                <option>Consumer Electronics</option>
                <option>Education</option>
                <option>Health & personal Care</option>
                <option>Home & Garden</option>
                <option>Luggage & Travel Accessories</option>
                <option>Musical Instruments</option>
                <option>Office Products</option>
                <option>Outdoors</option>
                <option>Party & Event</option>
                <option>Pet Supplies</option>
                <option>Shoes, Handbags, & Sunglasses</option>
                <option>Sports</option>
                <option>Tools & Home Improvement</option>
                <option>Toys</option>
                <option>Video Games</option>
              </select>
              <p className="block text-sm font-medium text-red-600">
                <ErrorMessage errors={errors} name="category" />
              </p>
            </div>
            <div className="w-full px-3 mb-12">
              <label
                className="form-label block text-gray-800 text-sm font-medium mb-1"
                htmlFor="outreachType"
              >
                How did you hear about Pondr?
                <span className="text-red-600">*</span>
              </label>
              <select
                name="outreachType"
                ref={register}
                className="form-select w-full focus:outline-none"
              >
                <option hidden>Please Select An Option</option>
                <option>LinkedIn</option>
                <option>Facebook</option>
                <option>From a friend</option>
                <option>Online Ad</option>
                <option>Looking For a review</option>
                <option>Other</option>
              </select>

              <p className="block text-sm font-medium text-red-600">
                <ErrorMessage errors={errors} name="outreachType" />
              </p>
            </div>

            {error ? (
              <div className="text-sm w-full p-6 mx-3 mb-4 bg-red-200 border-2 border-red-600 text-red-600 rounded ">
                {error}
              </div>
            ) : null}

            {isLoading ? (
              <div className="flex w-full px-3 justify-center pb-5">
                <ReactLoading
                  type={"spin"}
                  color={"#7779FC"}
                  height={"5%"}
                  width={"5%"}
                />
              </div>
            ) : (
              <div className="w-2/3 px-3 mx-auto">
                <Button
                  className="bg-blue-pondr border-blue-pondr hover:bg-blue-pondrdark w-full"
                  type="submit"
                >
                  <strong>Sign Up</strong>
                </Button>
              </div>
            )}
            <div className="w-full text-center align-middle justify-center">
              <p
                onClick={() => history.push("/signin")}
                className={
                  "w-full p2 text-base italic cursor-pointer text-gray-500 mt-5"
                }
              >
                Already have an account?{" "}
                <p className="italic underline text-blue-pondr">Log in now</p>
              </p>
            </div>
          </div>
        </form>
      </Card>
      <Modal
        visible={errorModal}
        effect="fadeInUp"
        onClickAway={() => setErrorModal(false)}
      >
        <div className={"p-5 flex items-center flex-col px-10 py-10"}>
          <div
            onClick={() => setErrorModal(false)}
            className={"focus:outline-none cursor-pointer self-end -mr-8 -mt-5"}
          >
            <GiCancel size={30} color={"#7779FC"} />
          </div>
          <p
            className={
              "text-2xl mb-2 text-blue-pondr text-center font-bold mt-5"
            }
          >
            Whoops, an error occurred.
          </p>
          <p className={"text-center text-md mt-10 font-normal text-lg"}>
            {errorMessage}
          </p>
        </div>
      </Modal>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanySignUp)
);
