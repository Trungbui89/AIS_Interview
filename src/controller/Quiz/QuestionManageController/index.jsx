/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { apiQuiz } from "../../../api/apiConnect";
import { toastFail, toastSuccess } from "../../../helper/Notification/utils";
import QuestionManageView from "../../../components/Quiz/QuestionManageComponent"

const QuestionManage = () => {
  const token = sessionStorage.getItem("token");
  const [filterListQuestion, setFilterListQuestion] = useState({
    page: 1,
    limit: 10,
    cateId: 0,
    search: '',
    typeId: 0,
});
const [categories, setCategories] = useState([]);
const [nominees, setNominees] = useState([]);
const [quesTypes, setQuesTypes] = useState([]);
const [createCateModal, setCreateCateModal] = useState(false);
const [createNomineeModal, setCreateNomineeModal] = useState(false);
const [showCreateQuestion, setShowCreateQuestion] = useState(false);






  // GET ALL CATEGORY
  const getAllCategories = () => {
    apiQuiz
      .get("/quiz/cate/list", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // GET ALL NOMINEE
  const getAllNominee = () => {
    apiQuiz
      .get("/quiz/nominee/list", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setNominees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // GET ALL QUESTION TYPE
  const getAllQuesType = () => {
    apiQuiz
      .get("/quiz/getAllQuestionType", {
        headers: {
          Authorization: token,
        },
      })
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
  const toggleCreateCateModal = () => {
    setCreateCateModal(!createCateModal);
  };
  const postCreateCategory = (value) => {
    apiQuiz
      .post("/quiz/createCategory", value)
      .then((res) => {
        toastSuccess("Tạo Category thành công");
        toggleCreateCateModal();
        getAllCategories();
      })
      .catch((err) => {
        console.log(err);
        toastFail("Thất bại, vui lòng kiểm tra lại");
      });
  };
  //POST CREATE NOMINEE
  const toggleCreateNomineeModal = () => {
    setCreateNomineeModal(!createNomineeModal);
  };
  const postCreateNominee = (value) => {
    apiQuiz
      .post("/quiz/createnominee", value)
      .then((res) => {
        toastSuccess("Tạo Nominee thành công");
        toggleCreateNomineeModal();
        getAllNominee();
      })
      .catch((err) => {
        console.log(err);
        toastFail("Lỗi! Vui lòng kiểm tra lại");
      });
  };
  // POST CREATE QUESTION
  const toggleCreateQuestion = () => {
    setShowCreateQuestion(!showCreateQuestion);
  };
  const postCreateQuestion = (value) => {
    apiQuiz
      .post("/quiz/createquestion", value)
      .then((res) => {
        toastSuccess("Tạo câu hỏi thành công");
        toggleCreateQuestion();
        getFilterQuesByCate(value.category.id);
      })
      .catch((err) => {
        console.log(err);
        toastFail("Lỗi! Vui lòng kiểm tra lại");
      });
  };
  // GET QUESTION BY CATEGORY
  const [questions, setQuestions] = useState([]);
  
  const [pagination, setPagination] = useState({})
  const getFilterQuesByCate = (cateId) => {
    const payload = {
      ...filterListQuestion,
      cateId: cateId ?? ''
    }
    apiQuiz
      .post(`/quiz/getquestionpaging`, payload, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setQuestions(res.data.questions);
        setPagination({
          page: res.data?.page,
          count: res.data?.limit,
          totalRecord: res.data?.total
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFilterQuesByCate()
  },[])
  // POST EDIT QUESTION
  const [showEditQues, setShowEditQues] = useState(false);
  const toggleEditQues = () => {
    setShowEditQues(!showEditQues);
  };
  const putUpdateQuestion = (values) => {
    // apiQuiz
    //   .put("/quiz/editquestion", values, { headers: { Authorization: token } })
    //   .then((res) => {
    //     toastSuccess("Cập nhật câu hỏi thành công!");
    //     toggleEditQues();
    //   })
    //   .catch((err) => {
    //     toastFail("Lỗi! Vui lòng kiểm tra lại");
    //     console.log(err);
    //   });
    console.log(values)
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
      getFilterQuesByCate={getFilterQuesByCate}
      showCreateQuestion={showCreateQuestion}
      toggleCreateQuestion={toggleCreateQuestion}
      showEditQues={showEditQues}
      toggleEditQues={toggleEditQues}
      putUpdateQuestion={putUpdateQuestion}
      pagination={pagination}
      filterListQuestion={filterListQuestion}
      setFilterListQuestion={setFilterListQuestion}
    />
  );
};
export default QuestionManage;
