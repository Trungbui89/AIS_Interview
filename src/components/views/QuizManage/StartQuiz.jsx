/* eslint-disable react-hooks/exhaustive-deps */
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiQuiz } from '../../../api/apiConnect';

export default function StartQuiz(props) {
    const [quizDetail, setQuizDetail] = React.useState({});
    const [timeCount, setTimeCount] = React.useState(0);
    const [quizSubmit, setQuizSubmit] = React.useState([]);

    //GET QUIZ DETAIL
    const getQuizDetail = () => {
        apiQuiz
            .get(`/quiz/${id}`)
            .then((res) => {
                setQuizDetail(res.data);
                setTimeCount(res.data.quizTime * 60);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // const [question, setQuestion] = React.useState({
    //     quiz_id: '',
    //     questions_id: '',
    //     content: '',
    //     questionType: {
    //         id: '',
    //         name: '',
    //     },
    //     questionChoiceDTOs: [],
    // });
    // const [choiceArr, setChoiceArr] = React.useState([]);
    // const [choiceChange, setChoiceChange] = React.useState({
    //     id: '',
    //     text: '',
    // });

    //START QUIZ
    const { id } = useParams();
    const [quiz, setQuiz] = React.useState([]);
    const [showQuiz, setShowQuiz] = React.useState(false);
    const getStartQuiz = () => {
        apiQuiz
            .get(`/quiz/startquiz/${id}`)
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

    const checkId = quizSubmit.map((q) =>
        q.questionChoiceDTOs.map((c) => c.id).toString()
    );
    console.log(checkId);
    const checkArr = (element, arr) => {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === element.toString()) {
                count++;
                break;
            }
        }
        return count > 0 ? true : false;
    };
    //SUBMIT Quiz
    const submitQuiz = (e) => {
        e.preventDefault();
        console.log(quizSubmit);
        apiQuiz
            .post('/quiz/calculate', quizSubmit)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };
    const RenderChoiceOfQuestion = ({ ques }) =>
        ques.questionChoiceDTOs.map((choice) => (
            <FormControlLabel
                key={choice.id}
                value={choice.id}
                control={
                    <Radio
                        checked={checkArr(choice.id, checkId)}
                        onChange={(e) => {
                            const quesId = quizSubmit.filter(
                                (q) => q.questions_id == ques.questions_id
                            );
                            if (quesId.length > 0) {
                                const questionIndex = quizSubmit.findIndex(
                                    (q) => q.questions_id == ques.questions_id
                                );
                                quizSubmit[questionIndex] = {
                                    quiz_id: ques.quiz_id,
                                    questions_id: ques.questions_id,
                                    content: ques.content,
                                    questionType: {
                                        id: ques.questionType.id,
                                        name: ques.questionType.name,
                                    },
                                    questionChoiceDTOs: [
                                        {
                                            id: e.target.value,
                                            text: '',
                                        },
                                    ],
                                };
                            } else {
                                setQuizSubmit([
                                    ...quizSubmit,
                                    {
                                        quiz_id: ques.quiz_id,
                                        questions_id: ques.questions_id,
                                        content: ques.content,
                                        questionType: {
                                            id: ques.questionType.id,
                                            name: ques.questionType.name,
                                        },
                                        questionChoiceDTOs: [
                                            {
                                                id: e.target.value,
                                                text: '',
                                            },
                                        ],
                                    },
                                ]);
                            }
                        }}
                    />
                }
                label={choice.name}
            />
        ));
    const RenderQuestion = () => {
        if (quiz.length > 0) {
            return quiz.map((ques, idx) => (
                <div key={idx} className='my-3 p-2 text-left'>
                    <div className='row'>
                        <div className='col-10'>
                            <p className='font-weight-bold'>
                                <i className='fa fa-hand-o-right bg-warning p-1 rounded'>
                                    {' '}
                                    Ques {idx + 1}:
                                </i>{' '}
                                {ques.content}
                            </p>
                        </div>
                    </div>
                    <div className='row container'>
                        <RadioGroup
                            aria-labelledby='demo-radio-buttons-group-label'
                            name='radio-buttons-group'
                        >
                            <RenderChoiceOfQuestion ques={ques} />
                        </RadioGroup>
                    </div>
                </div>
            ));
        } else return null;
    };
    return (
        <div className='page__out'>
            <div className='page__in'>
                <h3>{quizDetail.description}</h3>
                {timeCount > 0 ? (
                    <TimeOut timeCount={timeCount} setShowQuiz={setShowQuiz} />
                ) : null}
                <div className='container my-4 card'>
                    {showQuiz === true ? (
                        <form onSubmit={submitQuiz} className=' question-list'>
                            <RenderQuestion />
                            <button
                                type='submit'
                                className='btn btn-success my-2'
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

const TimeOut = (props) => {
    //Countdown Time
    const STATUS = {
        STARTED: 'Started',
        STOPPED: 'Stopped',
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
    const twoDigits = (num) => String(num).padStart(2, '0');
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
                className='btn btn-outline-success'
                onClick={handleStart}
                type='button'
            >
                Start
            </button>
            <button
                className='btn btn-outline-danger'
                onClick={handleStop}
                type='button'
            >
                Stop
            </button>
            <button
                className='btn btn-outline-dark'
                onClick={handleReset}
                type='button'
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
