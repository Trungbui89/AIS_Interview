import * as React from "react";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, IconButton } from "@mui/material";

export default function ListQuestion(props) {
  const {
    questions,
    getQuesByCate,
    categories,
    toggleEditQues,
    setQuestion,
    toggleCreateQuestion,
  } = props;
  const [cateId, setCateId] = React.useState("");
  // const ButtonCategory = () => {
  //     if (props.categories.length > 0) {
  //         return props.categories.map((cate) => (
  //             <button
  //                 key={cate.id}
  //                 className={cateId === cate.id ? 'button-active' : 'btn'}
  //                 onClick={() => {
  //                     setCateId(cate.id);
  //                     props.getQuesByCate(cate.id);
  //                 }}
  //             >
  //                 {cate.name}
  //             </button>
  //         ));
  //     } else return null
  // };
  const handleEditClick = (quesId) => {
    // setQuestion(qt);
    // setQuesId(qt.questions_id)
    // toggleEditQues();
    const questionSelected = questions?.filter(ques => ques.questions_id === quesId)
    if(questionSelected.length > 0) {
      setQuestion(questionSelected[0]);
      toggleEditQues();
    } else return;
  }
  const RenderQuestions = () => {
    if (questions?.length > 0) {
      return questions?.map((qt, idx) => (
        <tr key={idx} className="row-column">
          <td className="column-1">{idx + 1}</td>
          <td className="column-2">{qt.content}</td>
          <td className="column-3">{qt.category.name}</td>
          <td className="column-4">
            {qt.questionChoiceDTOs.map((choice) => (
              <div key={choice.id} className="">
                <h6>
                  {choice.true === true ? (
                    <i className="fa fa-check text-success"></i>
                  ) : (
                    <i className="fa fa-times text-danger"></i>
                  )}{" "}
                  {choice.name}
                </h6>
              </div>
            ))}
          </td>
          <td className="text-center column-5">
            <button
              onClick={() => {
                handleEditClick(qt.questions_id)
                // console.log(qt.questions_id);
              }}
              className="btn d-flex my-1"
            >
              <i className="fa fa-pencil-square-o fa-2x text-success"></i>
            </button>
            <button className="btn d-flex">
              <i className="fa fa-trash fa-2x text-danger"></i>
            </button>
          </td>
          {/* <div className="row">
            <div className="col-6">
              <p className="font-weight-bold text-left">
                Q{idx + 1}: {qt.content}
              </p>
            </div>
            <div className="col-4">
              <span>Category: {qt.category.name}</span>
              <br />
              <span>Question Type: {qt.questionType.name}</span>
            </div>
            <div className="col-2 mt-2">
              <button
                onClick={() => {
                  props.setQuestion(qt);
                  props.toggleEditQues();
                }}
                className="btn btn-outline-primary"
              >
                <i className="fa fa-pencil-square-o"></i>
              </button>
              <button className="btn btn-outline-danger ml-1">
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="row py-2">
            {qt.questionChoiceDTOs.map((choice) => (
              <div key={choice.id} className="col-3">
                <h6>{choice.name}</h6>
                {choice.true === true ? (
                  <i className="fa fa-check text-success"></i>
                ) : (
                  <i className="fa fa-times text-danger"></i>
                )}
              </div>
            ))}
          </div> */}
        </tr>
      ));
    } else return <tr className="m-auto"><td>Chọn 1 Category!</td></tr>;
  };
  return (
    <div className="mt-2">
      {/* <div className="col-3 mt-2">
          <button
            onClick={props.toggleCreateQuestion}
            className="btn btn-outline-success"
          >
            <i className="fa fa-plus"></i> Tạo câu hỏi
          </button>
        </div>
        <div className="col-6"></div>
        <div className="col-3 mt-2">
          <Link to="/quiz/create/quiz">
            <button className="btn btn-outline-primary">
              Tạo bài Test <ArrowCircleRightIcon />
            </button>
          </Link>
        </div>
    <div className='mt-4 question-list'>
        <RenderQuestions />
    </div> */}
      <table className="table justify-content-center">
        <thead>
          <tr className="row-column">
            <th className="column-1">STT</th>
            <th className="column-2">Câu hỏi</th>
            <th className="column-3">Category</th>
            <th className="column-4">
              <div className="row">
                <div className="col-3">Đáp án</div>
                <div className="col-2"></div>
                <div className="col-7">
                  <div className="row">
                    <div className="col-6">
                      <IconButton
                        onClick={toggleCreateQuestion}
                        sx={{ color: "rgba(255, 193, 69, 1)" }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                      Thêm câu hỏi
                    </div>
                    <Link to="/quiz/create/quiz" className="col-6">
                      <div>
                        <IconButton sx={{ color: "rgba(255, 193, 69, 1)" }}>
                          <AddCircleIcon />
                        </IconButton>
                        Tạo bài Test
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </th>
            <th className="column-5">#</th>
          </tr>
        </thead>
        <tbody>
          <RenderQuestions />
        </tbody>
      </table>
    </div>
  );
}
