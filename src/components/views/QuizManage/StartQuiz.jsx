/* eslint-disable react-hooks/exhaustive-deps */
import { RadioGroup, Button, FormControlLabel, Radio } from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { apiQuiz } from "../../../api/apiConnect";
import { toastFail, toastSuccess } from "../../../helper/Notification/utils";

export default function StartQuiz(props) {
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate();
  const [quizDetail, setQuizDetail] = React.useState({});
  const [timeCount, setTimeCount] = React.useState(0);
  const [answer, setAnswer] = React.useState([]);

  //GET QUIZ DETAIL
  const getQuizDetail = () => {
    apiQuiz
      .get(`/quiz/${id}`, {headers: { Authorization: token }})
      .then((res) => {
        setQuizDetail(res.data);
        setTimeCount(res.data.quizTime * 60);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //START QUIZ
  const { id } = useParams();
  const [quiz, setQuiz] = React.useState([]);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const getStartQuiz = () => {
    apiQuiz
      .get(`/quiz/startquiz/${id}`, {headers: { Authorization: token }})
      .then((res) => {
        setQuiz(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getStartQuiz();
    getQuizDetail();
  }, []);

  // const [choiceSelect, setChoiceSelect] = React.useState([]);
  const [quesId, setQuesId] = React.useState([]);
  const onChoiceSelect = (e, ques) => {
    if (quesId.includes(ques.questions_id) === true) {
      const newAnswer = answer.map((q) =>
        q.questions_id === ques.questions_id
          ? {
              quiz_id: ques?.quiz_id,
              questions_id: ques?.questions_id,
              questionType: {
                id: ques?.questionType.id,
              },
              questionChoiceDTOs: [
                {
                  id: e,
                  text: "",
                },
              ],
            }
          : q
      );
      setAnswer(newAnswer);
    } else {
      setQuesId([...quesId, ques.questions_id]);
      setAnswer([
        ...answer,
        {
          quiz_id: ques?.quiz_id,
          questions_id: ques?.questions_id,
          questionType: {
            id: ques?.questionType.id,
          },
          questionChoiceDTOs: [
            {
              id: e,
              text: "",
            },
          ],
        },
      ]);
    }
  };

  const choiceCheck = answer.map((a) => a.questionChoiceDTOs[0].id);
  console.log(answer);

  const postSubmitAnswer = () => {
    apiQuiz
      .post("/quiz/calculate", answer, {headers:{ Authorization: token }})
      .then((res) => {
        toastSuccess("Gửi câu trả lời thành công");
        setTimeout(() => {
          navigate("/list-test/take-quiz", { replace: true });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toastFail("Lỗi! Vui lòng kiểm tra lại");
      });
  };
  const RenderChoiceOfQuestion = (props) => {
    const { ques } = props;
    return ques?.questionChoiceDTOs.map((choice, idx) => (
      <div key={idx}>
        <FormControlLabel
          value={choice.id}
          control={
            <Radio
              checked={choiceCheck.includes(choice.id.toString())}
              onChange={(e) => {
                onChoiceSelect(e.target.value, ques);
              }}
            />
          }
          label={choice.name}
        />
      </div>
    ));
  };

  const RenderQuestion = () => {
    if (quiz.length > 0) {
      return quiz.map((ques, idx) => (
        <div key={idx} className="my-3 p-2 text-left">
          <div className="row">
            <div className="col-10">
              <p className="font-weight-bold">
                <i className="fa fa-hand-o-right bg-warning p-1 rounded">
                  {" "}
                  Ques {idx + 1}:
                </i>{" "}
                {ques.content}
              </p>
            </div>
          </div>
          <div className="row container">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              row
            >
              <RenderChoiceOfQuestion ques={ques} />
            </RadioGroup>
          </div>
        </div>
      ));
    } else return null;
  };
  return (
    <div className="py-3">
      <div style={{ fontFamily: "Quicksand" }}>
        <h3>{quizDetail.description}</h3>
        {timeCount > 0 ? (
          <TimeOut timeCount={timeCount} setShowQuiz={setShowQuiz} />
        ) : null}
        <div className="p-4 card" style={{ width: "90%", margin: "auto" }}>
          {showQuiz === true ? (
            <>
              <RenderQuestion />
              <button
                onClick={postSubmitAnswer}
                className="button-user"
                style={{ width: "100px", margin: "20px auto" }}
              >
                Submit
              </button>
            </>
          ) : (
            <div style={{ height: "70vh" }}></div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const TimeOut = (props) => {
  //Countdown Time
  const STATUS = {
    STARTED: "Started",
    STOPPED: "Not start yet",
  };
  const useInterval = (callback, delay) => {
    const savedCallback = React.useRef();
    // Remember the latest callback.
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    React.useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  const twoDigits = (num) => String(num).padStart(2, "0");
  const [secondsRemaining, setSecondsRemaining] = React.useState(
    props.timeCount
  );
  const [status, setStatus] = React.useState(STATUS.STOPPED);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;
  const handleStart = () => {
    props.setShowQuiz(true);
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    props.setShowQuiz(false);
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(props.timeCount);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
        props.setShowQuiz(false);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  return (
    <div>
      <button
        className="btn btn-outline-success"
        onClick={handleStart}
        type="button"
      >
        Start
      </button>
      <button
        className="btn btn-outline-danger"
        onClick={handleStop}
        type="button"
      >
        Stop
      </button>
      <button
        className="btn btn-outline-dark"
        onClick={handleReset}
        type="button"
      >
        Reset
      </button>
      <div>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      <div>Status: {status}</div>
    </div>
  );
};
