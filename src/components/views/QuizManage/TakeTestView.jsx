import React from 'react';
import { Link } from 'react-router-dom';

const TakeTestView = ({ listQuiz, listQuizDone }) => {
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
                            <Link to={`/list-test/take-quiz/start/${done.id}`}>
                                <button className='btn btn-info mt-2'>
                                    View Result
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            ));
        } else
            return (
                <div style={{ height: '80vh' }}>
                    <p className='text-info my-3'>
                        <b>Hiện tại bạn chưa hoàn thành bài Test nào!!</b>
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
                    <p className='text-info my-3'>
                        <b>Hiện tại bạn chưa có bài Quiz nào cần làm!</b>
                    </p>
                </div>
            );
    };

    return (
        <div className='page__out'>
            <div className='page__in'>
                <div className='container card__list-test'>
                    <div className='card__header'>
                        <h3 className=''>Over View quiz</h3>
                    </div>
                    <div className='row'>
                        <div className='col-6 my-2'>
                            <b className='text-primary '>Quiz Not Start yet</b>
                            <RenderQuizNotStart />
                        </div>
                        <div className='col-6 my-2'>
                            <b className='text-success'>Quiz Finished</b>
                            <RenderQuizDone />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakeTestView;
