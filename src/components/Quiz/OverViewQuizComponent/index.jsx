import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ResultQuiz from '../../views/Modal/QuizModal/ResultQuiz';

const OverViewQuizComponent = (props) => {
    const { listQuiz, listQuizDone, showResult, toggleShowResult } = props;
    const RenderQuizDone = () => {
        if (listQuizDone.length > 0) {
            return listQuizDone?.map((done, idx) => (
                <div key={idx} className="card__take-test-header row my-5">
                    <img src="/images/quiz.png" alt={done.description} />
                    <div className="p-2">
                        <h5 className="">{done.description}</h5>
                        <p className="text-left">
                            Time out:{' '}
                            <i className="text-info">{done.quizTime} minutes</i>
                            <br />
                            Quantity question:{' '}
                            <i className="text-info">{done.numberQuestions}</i>
                            <br />
                            <button
                                onClick={toggleShowResult}
                                className="btn btn-info mt-2"
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
                    <p className="my-3">
                        <i>Hiện tại bạn chưa hoàn thành bài Test nào!!</i>
                    </p>
                </div>
            );
    };

    const RenderQuizNotStart = () => {
        if (listQuiz.length > 0) {
            return listQuiz.map((test, idx) => (
                // <div key={idx} className='card__take-test-header row my-5'>
                //     <img src='/images/quiz.png' alt={test.name} />
                //     <div className='p-2'>
                //         <h5 className=''>{test.description}</h5>
                //         <p className='text-left'>
                //             Time out:{' '}
                //             <i className='text-info'>{test.quizTime} minutes</i>
                //             <br />
                //             Quantity question:{' '}
                //             <i className='text-info'>{test.numberQuestions}</i>
                //             <br />
                //             <Link to={`/list-test/take-quiz/start/${test.id}`}>
                //                 <button className='btn btn-info mt-2'>
                //                     Start
                //                 </button>
                //             </Link>
                //         </p>
                //     </div>
                // </div>
                <Box
                    key={idx}
                    sx={{
                        width: '95%',
                        height: 300,
                        '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                        },
                        border: '1px solid #DCDCDC',
                        margin:'25px auto'
                    }}
                >
                    <div className="p-2">
                        <Typography sx={{fontWeight: 'bold', fontSize:30, fontFamily: "Quicksand", textAlign: 'left'}}>{test.description}</Typography>
                        <p className="text-left">
                            Time out:{' '}
                            <i className="text-info">{test.quizTime} minutes</i>
                            <br />
                            Quantity question:{' '}
                            <i className="text-info">{test.numberQuestions}</i>
                            <br />
                            <Link to={`/list-test/take-quiz/start/${test.id}`}>
                                <button className="btn btn-info mt-2">
                                    Start
                                </button>
                            </Link>
                        </p>
                    </div>
                </Box>
            ));
        } else
            return (
                <div style={{ height: '80vh' }}>
                    <p className="my-3">
                        <i>Hiện tại bạn chưa có bài Test nào cần làm!</i>
                    </p>
                </div>
            );
    };

    return (
        <div className="page__out">
            <div className="page__in">
                <div className="card__list-test">
                    <div style={styles.card_header}>
                        <h3 className="">Overview Test</h3>
                    </div>
                    <div className="row">
                        <div className="col-6 my-2">
                            <Box
                                sx={{
                                    width: '95%',
                                    backgroundColor: '#121843',
                                    color: '#fff',
                                    margin: 'auto',
                                    padding: '10px 0',
                                    fontWeight: 'bold',
                                }}
                            >
                                CHƯA LÀM
                            </Box>
                            <RenderQuizNotStart />
                        </div>
                        <div className="col-6 my-2">
                            <Box
                                sx={{
                                    width: '95%',
                                    backgroundColor: '#121843',
                                    color: '#fff',
                                    margin: 'auto',
                                    padding: '10px 0',
                                    fontWeight: 'bold',
                                }}
                            >
                                ĐÃ LÀM
                            </Box>
                            <RenderQuizDone />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverViewQuizComponent;

const styles = {
    card_header: {
        height: '8%',
        width: '100%',
        textAlign: 'left',
        color: 'rgba(22, 30, 84, 1)',
        fontFamily: 'Quicksand, sans-serif',
        paddingTop: '1.5%',
        fontWeight: 800,
        fontSize: '35px',
    }
}