import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonFill from "../components/ButtonFill";
import { useHistory } from "react-router";
import ReactLoading from "react-loading";
import {
  askAiQuestion,
  followupAiQuestion,
  getAiQuestions,
  logFirestoreEvent,
} from "../../merlinv1/beta_api";
import { connect } from "react-redux";
import { logEvent, logScreenName } from "../../utils/CommonFunctions";
import ShowMoreText from "react-show-more-text";
import Dropdown from "../../utils/Dropdown";
import { askDemoAiQuestions } from "../../merlinv1/beta_api";

const QuestionFormSchema = Yup.object({
  question: Yup.string().required("Questions cannot be empty"),
});

const AIQuestions = (props) => {
  const isDemo = props.demo;

  // State data for the screen
  const [answer, setAnswer] = useState();
  const [disabled, setDisabled] = useState(false);
  const [textTyped, setTextTyped] = useState("");
  const [followup, setFollowup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { productInfo } = props;
  const trigger = useRef(null);

  const history = useHistory();

  // Fetches previous responses from redux/database
  useEffect(() => {
    // Helper for useEffect
    const fetchData = async () => {
      try {
        if (!props.aiHistory[props.productId]) {
          const res = await getAiQuestions(props.productId);
          props.setHistory(res.data, props.productId);
        }
      } catch (err) {
        logFirestoreEvent("404Error", { err: err });
        history.push("/ErrorPage");
      }
    };

    if (!isDemo) {
      logScreenName("Q&A");
      logEvent("page_view", { page_name: "Q&A", productId: props.productId });
      fetchData();
    } else {
      logScreenName("DemoQ&A");
      logEvent("page_view", { page_name: "DemoQ&A" });
    }
  }, []);

  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(QuestionFormSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = async (data) => {
    // Enables loading state
    setDisabled(true);
    setIsLoading(true);

    // ES6 Format of Async/Await/Catch
    try {
      let res = "";
      let responseData = "";
      let gpt3_response_id = "";
      let gpt3_file_id = "";
      if (isDemo) {
        res = await askDemoAiQuestions(data.question);
        logFirestoreEvent("DemoAIQuestionAsked", { question: data.question });
        responseData = res.data["AI Answer"];
      } else {
        res = await askAiQuestion(props.productId, data.question);
        logFirestoreEvent("AIQuestionAsked", {
          question: data.question,
          productId: props.productId,
        });
        responseData = res.data["AI Answers"];
        gpt3_response_id = res.data["gpt3_response_id"];
        gpt3_file_id = res.data["gpt3_file_id"];
      }
      if (!responseData) {
        setIsLoading(false);
        alert(
          "Unexpected problem with AI, try relogging or contacting the Pondr team at hello@letspondr.com"
        );
      } else {
        setAnswer({
          answers: responseData,
          reviews: res.data.Reviews,
          gpt3_response_id: gpt3_response_id,
          gpt3_file_id
        });
        if (!isDemo) {
          props.addQuestion(
            {
              questionAnswers: {
                question: data.question,
                answers: responseData,
                gpt3_response_id,
                gpt3_file_id
              },
              reviews: res.data.Reviews,
            },
            props.productId
          );
        }
      }
    } catch (err) {
      logFirestoreEvent("404Error", { err: err });
      history.push("/ErrorPage");
    }

    // Turns off loading state
    setIsLoading(false);
    setDisabled(false);
  };

  const trimAnswer = (answer) => {
    if (answer.indexOf(".") === -1) return answer;
    return answer.substring(0, answer.lastIndexOf(".") + 1);
  };

  return (
    <div className="px-4 my-1 pt-5 min-h-screen">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <h1 className="flex flex-row h3 mb-2 text-blue-pondr ml-5 mt-3">
        AI Q & A System{" "}
      </h1>
      <p className="mr-4 font-bold text-gray-400 text-md ml-5">
        {" "}
        Ask any question about your reviews and get detailed insights
      </p>
      <p className={"mt-3 ml-5 pt-5 mb-4 font-medium text-gray-800"}>
        Current Product &nbsp; | &nbsp; {productInfo.Product_name}
      </p>
      <div className="pb-5"></div>
      <form
        className="mt-7 md:flex flex w-full"
        data-aos="fade-up"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-grow w-full">
          <Input
            className="normal-case flex-1 w-full rounded-xl bg-white shadow-lg p-2 -ml-4 border-none"
            name="question"
            placeholder="&#128640;  Ask any question..."
            type="search"
            required
            ref={register}
            onChangeText={(newText) => setTextTyped(newText)}
          />
        </div>
        {isLoading ? (
          <div className="ml-5 mt-5">
            <ReactLoading type="spin" color="#7779FC" height={30} width={30} />
          </div>
        ) : (
          <Button
            className="rounded-3xl w-min md:w-min md:mt-0 ml-5"
            disabled={disabled || textTyped.split(" ").length < 3}
            type="submit"
          >
            Submit
          </Button>
        )}

        <div className="" />
      </form>
      <p
        className={
          "mr-4 font-medium text-gray-400 text-md ml-5 mb-3 -mt-5 pt-5 pb-5"
        }
      >
        {" "}
        Maybe try...
      </p>
      <div className=" grid grid-cols-3 w-full grid-flow-row -ml-10 gap-4">
        {[
          "What is the best part about this product and why?",
          "What is the worst part about this product and why?",
          "What are your biggest problems with this product and why?",
          "How do you feel about the price of this product and why?",
          "How could this product be improved and why?",
          "Would you recommend this to a friend and why?",
        ].map((eachAutoQuestion, index) => (
          <ButtonFill
            className=" mx-3 w-max mb-4 ml-10 text-blue-pondr leading-5 text-sm border-none rounded-full"
            type="button"
            key={index}
            onClick={() => {
              setValue("question", eachAutoQuestion);
              setTextTyped(eachAutoQuestion);
              onSubmit({ question: eachAutoQuestion });
            }}
          >
            {eachAutoQuestion}
          </ButtonFill>
        ))}
      </div>

      {answer ? (
        <>
          <div className="normal-case mx-3 h-full w-full my-4 px-3 py-6 text-white bg-blue-pondr rounded">
            <p className="font-semibold">Answers:</p>
            <div className="pb-5"></div>
            {answer.answers.map((eachAnswer, index) => (
              <div className={"flex flex-col"}>
                <p key={index} className="mb-2">
                  {trimAnswer(eachAnswer)}
                </p>
                {followup.find(
                  (eachFollowup) => eachFollowup.index === index
                ) !== undefined ? (
                  <p key={index} className="mb-2">
                    Explanation:&nbsp;
                    {trimAnswer(
                      followup.find(
                        (eachFollowup) => eachFollowup.index === index
                      ).follow_up[0]
                    )}
                  </p>
                ) : (
                  <div />
                )}
                {isLoading ||
                !(
                  followup.length === 0 ||
                  followup.find(
                    (eachFollowup) => eachFollowup.index === index
                  ) === undefined
                ) ? (
                  <div />
                ) : (
                  <button
                    onClick={async () => {
                      setIsLoading(true);
                      const res = await followupAiQuestion(
                        props.productId,
                        textTyped,
                        eachAnswer,
                        answer.gpt3_response_id,
                        answer.gpt3_file_id
                      );
                      console.log(res);
                      const newFollowUps = followup;
                      newFollowUps.push({
                        index,
                        ...res.data,
                      });
                      setFollowup(newFollowUps);
                      setIsLoading(false);
                    }}
                    className={
                      "button-small btn align-center self-end text-center justify-center px-4 py-2 mr-8 font-bold rounded-3xl text-white text-md bg-black hover:bg-blue-pondr hover:border-white hover:text-white focus:outline-none"
                    }
                  >
                    Explain
                  </button>
                )}
                <hr className="my-4" />
              </div>
            ))}
          </div>
          <div className="mx-3 h-full w-full my-4 px-3 py-6 text-white bg-gray-500 rounded">
            <p className="font-semibold">Reviews Referenced:</p>
            <div className="pb-5"></div>
            {answer.reviews.map((review, index) => {
              return (
                <div className="mb-2" key={index}>
                  <p>{review}</p>
                  <hr className="my-4" />
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      <div className="pb-5"></div>
      {isDemo ? (
        <div />
      ) : (
        <div>
          <p className="text-xl mt-2 mb-2 text-gray-400 pb-5 font-bold text-center">
            Previously Asked Questions
          </p>

          {props.aiHistory[props.productId] &&
          props.aiHistory[props.productId].responses.length > 0 ? (
            <div
              style={{ height: "1000", width: "1000" }}
              className="h-full w-full overflow-auto"
            >
              {props.aiHistory[props.productId].responses.map(
                (entry, index) => (
                  <ul className="flex text-md flex-grow flex-wrap items-center w-full">
                    <div
                      key={index}
                      className={"overflow-x-hidden overflow-y-hidden w-full"}
                    >
                      <span>
                        <div className="flex flex-col flex-wrap pt-5 pb-5 w-max mx-3 my-4 px-3 text-blue-pondr border-2 rounded-xl">
                          <Dropdown
                            title={entry.questionAnswers.question}
                            className={"shadow-none bg-transparent"}
                            ref={trigger}
                          >
                            <div className="flex flex-col flex-wrap mx-3 my-4 mr-10 px-3 py-6 text-white bg-blue-pondr pr-3 rounded">
                              <p className="font-semibold">Answers:</p>
                              <div className="pb-5"></div>
                              {entry.questionAnswers.answers.map(
                                (answer, index) => (
                                  <p
                                    key={index}
                                    className="mb-2 text-white w-full normal-case"
                                  >
                                    {answer}
                                    <hr className="my-auto mb-2 mt-5" />
                                  </p>
                                )
                              )}
                            </div>
                            <div className="flex flex-col flex-wrap mx-3 my-4 px-3 mr-10 py-6 text-white bg-gray-500 pr-3 rounded">
                              <p className="font-semibold">
                                Reviews Referenced:
                              </p>
                              <div className="pb-5"></div>
                              {entry.reviews.map((review, index) => {
                                return (
                                  <div className="mb-2 w-full" key={index}>
                                    <ShowMoreText
                                      /* Default options */
                                      lines={5}
                                      more="Show more"
                                      less="Show less"
                                      anchorClass="text-white font-bold outline-none focus:outline-none"
                                    >
                                      <p className="mb-2 w-full normal-case">
                                        {review}
                                      </p>
                                    </ShowMoreText>
                                    <hr className="my-auto mt-5 mb-2" />
                                  </div>
                                );
                              })}
                            </div>
                          </Dropdown>
                        </div>
                      </span>
                    </div>
                  </ul>
                )
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aiHistory: state.app.aiHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (newHistory, productId) =>
      dispatch({
        type: "SET_AI_HISTORY",
        newHistory: newHistory,
        productId: productId,
      }),
    addQuestion: (newQuestion, productId) =>
      dispatch({
        type: "ADD_AI_QUESTION",
        newQuestion: newQuestion,
        productId: productId,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AIQuestions);
