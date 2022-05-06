/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { apiQuiz } from '../../../api/apiConnect';
import OverViewQuizComponent from '../../../components/Quiz/OverViewQuizComponent';

const TakeTest = () => {
    const [listQuiz, setListQuiz] = React.useState([]);
    const [listQuizDone, setListQuizDone] = React.useState([]);
    const [showResult, setShowResult] = React.useState(false);
    const toggleShowResult = () => {
        setShowResult(!showResult);
    };
    const id = sessionStorage.getItem('id');
    // GET quiz notstart
    const getQuizNotStartWithUser = () => {
        apiQuiz
            .get(`/quiz/notstart/${id}`)
            .then((res) => {
                setListQuiz(res.data);
            })
            .catch((err) => console.log(err));
    };
    // GET quiz finished
    const getQuizFinishWithUser = () => {
        apiQuiz
            .get(`/quiz/listbyuser/${id}`)
            .then((res) => {
                setListQuizDone(res.data);
            })
            .catch((err) => console.log(err));
    };
    React.useEffect(() => {
        getQuizNotStartWithUser();
        getQuizFinishWithUser();
    }, []);

    return (
        <OverViewQuizComponent
            listQuiz={listQuiz}
            listQuizDone={listQuizDone}
            showResult={showResult}
            toggleShowResult={toggleShowResult}
        />
    );
    // if (listQuiz.length > 0) {
    //     return listQuiz.map((test) => (
    //         <div key={test.id}>
    //             <TakeTestView test={test} />
    //         </div>
    //     ));
    // } else
    //     return (
    //         <div className='page__out'>
    //             <div className='page__in'>
    //                 <div style={{ height: '80vh' }}>
    //                     <p className='text-info'>
    //                         <b>Hiện tại bạn chưa có bài Quiz nào cần làm!</b>
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     );
};

export default TakeTest;
