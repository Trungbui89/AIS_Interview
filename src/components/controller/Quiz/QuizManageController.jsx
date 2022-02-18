import * as React from 'react';
import { apiQuiz } from '../../../api/apiConnect';
import QuizManageView from '../../views/QuizManage/QuizManageView';

export default function QuizManage() {
    const [addFailed, setAddFailed] = React.useState(false);
    const [addSuccess, setAddSuccess] = React.useState(false);
    // const token = sessionStorage.getItem('token')
    const [showCreateQuiz, setShowCreateQuiz] = React.useState(false);
    const toggleModalCreate = () => {
        setShowCreateQuiz(!showCreateQuiz);
    };
    // GET ALL CATEGORY
    const [categories, setCategories] = React.useState([]);
    const getAllCategories = () => {
        apiQuiz
            .get('/quiz/cate/list')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        getAllCategories();
    },[]);

    // POST CREATE QUIZ
    const postCreateQuiz = (value) => {
        console.log(value);
        apiQuiz.post('/quiz', value).then(res => {
            setAddSuccess(true);
        }).catch(err => {
            console.log(err);
            setAddFailed(true)
        });
    };
    return (
        <QuizManageView
            addSuccess={addSuccess}
            setAddSuccess={setAddSuccess}
            addFailed={addFailed}
            setAddFailed={setAddFailed}
            showCreateQuiz={showCreateQuiz}
            toggleModalCreate={toggleModalCreate}
            categories={categories}
            postCreateQuiz={postCreateQuiz}
        />
    );
}
