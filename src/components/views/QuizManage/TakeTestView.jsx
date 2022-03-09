import React from 'react';
import { Link } from 'react-router-dom';
import ResultQuiz from '../Modal/QuizModal/ResultQuiz';

const TakeTestView = ({
    listQuiz,
    listQuizDone,
    showResult,
    toggleShowResult,
}) => {
    const RenderQuizDone = () => {
        if (listQuizDone.length > 0) {
            return listQuizDone.map((done, idx) => (
                <div key={idx} className='card__take-test-header row my-5'>
                    <img src='/images/quiz.png' alt={done.description} />
                    <div className='p-2'>
                        <h5 className=''>{done.description}</h5>
                        <p className='text-left'>
                            Time out:{' '}
                            <i className='text-info'>{done.quizTime} minutes</i>
                            <br />
                            Quantity question:{' '}
                            <i className='text-info'>{done.numberQuestions}</i>
                            <br />
                            <button
                                onClick={toggleShowResult}
                                className='btn btn-info mt-2'
                            >
                                View Result
                            </button>
                        </p>
                    </div>
                    <ResultQuiz
                        showResult={showResult}
                        toggleShowResult={toggleShowResult}
                        quizDone={done}
                    />
                </div>
            ));
        } else
            return (
                <div style={{ height: '80vh' }}>
                    <p className='my-3'>
                        <i>Hiện tại bạn chưa hoàn thành bài Test nào!!</i>
                    </p>
                </div>
            );
    };

    const RenderQuizNotStart = () => {
        if (listQuiz.length > 0) {
            return listQuiz.map((test, idx) => (
                <div key={idx} className='card__take-test-header row my-5'>
                    <img src='/images/quiz.png' alt={test.name} />
                    <div className='p-2'>
                        <h5 className=''>{test.description}</h5>
                        <p className='text-left'>
                            Time out:{' '}
                            <i className='text-info'>{test.quizTime} minutes</i>
                            <br />
                            Quantity question:{' '}
                            <i className='text-info'>{test.numberQuestions}</i>
                            <br />
                            <Link to={`/list-test/take-quiz/start/${test.id}`}>
                                <button className='btn btn-info mt-2'>
                                    Start
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            ));
        } else
            return (
                <div style={{ height: '80vh' }}>
                    <p className='my-3'>
                        <i>Hiện tại bạn chưa có bài Test nào cần làm!</i>
                    </p>
                </div>
            );
    };

    return (
        <div className='page__out'>
            <div className='page__in'>
                <div className='card__list-test'>
                    <div className='card__header'>
                        <h3 className=''>Overview Test</h3>
                    </div>
                    <div className='row'>
                        <div className='col-6 my-2 quiz-not-start'>
                            <b className='text-primary '>Chưa bắt đầu</b>
                            <RenderQuizNotStart />
                        </div>
                        <div className='col-6 my-2'>
                            <b className='text-success'>Đã hoàn thành</b>
                            <RenderQuizDone />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakeTestView;
