import * as React from "react";
import { apiQuiz } from "../../../api/apiConnect";
import { toastFail, toastSuccess } from "../../../helper/Notification/utils";
import QuizManageView from "../../views/QuizManage/QuizManageView";

export default function QuizManage() {
  const token = sessionStorage.getItem("token");
  const [showCreateQuiz, setShowCreateQuiz] = React.useState(false);
  const toggleModalCreate = () => {
    setShowCreateQuiz(!showCreateQuiz);
  };
  // GET ALL CATEGORY
  const [categories, setCategories] = React.useState([]);
  const getAllCategories = () => {
    apiQuiz
      .get("/quiz/cate/list")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getAllCategories();
  }, []);

  // POST CREATE QUIZ
  const postCreateQuiz = (value) => {
    apiQuiz
      .post("/quiz", value, { headers: { Authorization: token } })
      .then((res) => {
        toastSuccess("Tạo bài Test thành công");
        toggleModalCreate();
      })
      .catch((err) => {
        console.log(err);
        toastFail("Thất bại, vui lòng kiểm tra lại");
      });
  };

  return (
    <QuizManageView
      showCreateQuiz={showCreateQuiz}
      toggleModalCreate={toggleModalCreate}
      categories={categories}
      postCreateQuiz={postCreateQuiz}
    />
  );
}
