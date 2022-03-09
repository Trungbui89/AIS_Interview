import React, { useEffect, useState } from 'react';
import { apiQuiz } from '../../../api/apiConnect';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import QuestionManageView from '../../views/QuizManage/QuestionManageView';

const QuestionManage = () => {
    // const token = sessionStorage.getItem('token');

    // GET ALL CATEGORY
    const [categories, setCategories] = useState([]);
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
    // GET ALL NOMINEE
    const [nominees, setNominees] = useState([]);
    const getAllNominee = () => {
        apiQuiz
            .get('/quiz/nominee/list')
            .then((res) => {
                setNominees(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // GET ALL QUESTION TYPE
    const [quesTypes, setQuesTypes] = useState([]);
    const getAllQuesType = () => {
        apiQuiz
            .get('/quiz/getAllQuestionType')
            .then((res) => {
                setQuesTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllCategories();
        getAllNominee();
        getAllQuesType();
    }, []);

    //POST CREATE CATEGORY
    const [createCateModal, setCreateCateModal] = useState(false);
    const toggleCreateCateModal = () => {
        setCreateCateModal(!createCateModal);
    };
    const postCreateCategory = (value) => {
        apiQuiz
            .post('/quiz/createCategory', value)
            .then((res) => {
                toastSuccess('Tạo Category thành công');
                toggleCreateCateModal();
                getAllCategories();
            })
            .catch((err) => {
                console.log(err);
                toastFail('Thất bại, vui lòng kiểm tra lại');
            });
    };
    //POST CREATE NOMINEE
    const [createNomineeModal, setCreateNomineeModal] = useState(false);
    const toggleCreateNomineeModal = () => {
        setCreateNomineeModal(!createNomineeModal);
    };
    const postCreateNominee = (value) => {
        apiQuiz
            .post('/quiz/createnominee', value)
            .then((res) => {
                toastSuccess('Tạo Nominee thành công');
                toggleCreateNomineeModal();
                getAllNominee();
            })
            .catch((err) => {
                console.log(err);
                toastFail('Lỗi! Vui lòng kiểm tra lại');
            });
    };
    // POST CREATE QUESTION
    const [showCreateQuestion, setShowCreateQuestion] = useState(false);
    const toggleCreateQuestion = () => {
        setShowCreateQuestion(!showCreateQuestion);
    };
    const postCreateQuestion = (value) => {
        apiQuiz
            .post('/quiz/createquestion', value)
            .then((res) => {
                toastSuccess('Tạo câu hỏi thành công');
                toggleCreateQuestion();
                getQuesByCate(value.category.id);
            })
            .catch((err) => {
                console.log(err);
                toastFail('Lỗi! Vui lòng kiểm tra lại');
            });
    };
    // GET QUESTION BY CATEGORY
    const [questions, setQuestions] = useState([]);
    const getQuesByCate = (cateId) => {
        apiQuiz
            .get(`/quiz/getquestionbycategory/${cateId}`)
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // POST EDIT QUESTION
    const [showEditQues, setShowEditQues] = useState(false);
    const toggleEditQues = () => {
        setShowEditQues(!showEditQues);
    };
    return (
        <QuestionManageView
            createCateModal={createCateModal}
            toggleCreateCateModal={toggleCreateCateModal}
            postCreateCategory={postCreateCategory}
            categories={categories}
            nominees={nominees}
            createNomineeModal={createNomineeModal}
            toggleCreateNomineeModal={toggleCreateNomineeModal}
            postCreateNominee={postCreateNominee}
            quesTypes={quesTypes}
            postCreateQuestion={postCreateQuestion}
            questions={questions}
            getQuesByCate={getQuesByCate}
            showCreateQuestion={showCreateQuestion}
            toggleCreateQuestion={toggleCreateQuestion}
            showEditQues={showEditQues}
            toggleEditQues={toggleEditQues}
        />
    );
};
export default QuestionManage;
