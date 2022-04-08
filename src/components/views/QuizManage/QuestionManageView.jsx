import React, { useState } from "react";
import CreateCategory from "../Modal/CreateCategory";
import CreateNominee from "../Modal/CreateNominee";
import CreateQuestion from "../Modal/QuizModal/CreateQuestion";
import EditQuestion from "../Modal/QuizModal/EditQuestion";
import ListQuestion from "./ListQuestion";
import { ToastContainer } from "react-toastify";

const QuestionManageView = (props) => {
  const [question, setQuestion] = useState({});
  const [cateId, setCateId] = React.useState("");
  const RenderCategory = () =>
    props.categories?.map((cate) => (
      <li
        key={cate.id}
        className={cateId === cate.id ? "button-cate-active" : "button-cate"}
        onClick={() => {
          setCateId(cate.id);
          props.getQuesByCate(cate.id);
        }}
      >
        {cate.name}
      </li>
    ));
  const RenderNominee = () =>
    props.nominees.map((nominee) => (
      <tr key={nominee.name}>
        <td>{nominee.name}</td>
      </tr>
    ));
  const returnQuesTypeName = (name) =>{
    if(name === 'ONE_CHOICE') return 'One choice';
    if(name === 'MANY_CHOICE') return 'Many choices';
    if(name === 'FREE_TEXT') return 'Free text';
  }
  const RenderQuestionType = () =>
    props.quesTypes.map((qt, idx) => (
      <li key={idx} className="list-question-type">
        {returnQuesTypeName(qt?.name)}
      </li>
    ));
  return (
    <div>
      <div>
        <div className="card__list-test">
          <div className="card__header">
            <h3 className="">Question Management</h3>
          </div>
          <div className="list-test__content row mt-5">
            <div className="col-2">
              <div className="title-cate">
                <img src="/icon/Topics.svg" alt="" /> Topics
              </div>
              <div>
                <ul style={{ listStyleType: "none" }}>
                  <RenderCategory />
                  <div className="text-left">
                    <button
                      onClick={() => {
                        props.toggleCreateCateModal();
                      }}
                      className="btn text-primary"
                    >
                      <img src='/icon/New.svg' alt='' /> {' '}
                      Tạo Category
                    </button>
                  </div>
                </ul>
              </div>
              {/* <div className='col-12'>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>List Nominee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderNominee />
                        <tr>
                            <td>
                                <button
                                    onClick={() => {
                                        props.toggleCreateNomineeModal();
                                    }}
                                    className='btn btn-outline-success'
                                >
                                    Tạo Nominee
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
              <div className="title-cate">
                <img src="/icon/QuestionType.svg" alt="" /> Type of question
              </div>
              <div className="">
                <ul style={{ listStyleType: "none" }}>
                  <RenderQuestionType />
                </ul>
              </div>
            </div>
            <div className="col-10 border">
              <ListQuestion
                questions={props.questions}
                getQuesByCate={props.getQuesByCate}
                categories={props.categories}
                toggleEditQues={props.toggleEditQues}
                setQuestion={setQuestion}
                toggleCreateQuestion={props.toggleCreateQuestion}
              />
            </div>
          </div>
        </div>
      </div>
      <CreateCategory
        createCateModal={props.createCateModal}
        toggleCreateCateModal={props.toggleCreateCateModal}
        postCreateCategory={props.postCreateCategory}
      />
      <CreateNominee
        createNomineeModal={props.createNomineeModal}
        toggleCreateNomineeModal={props.toggleCreateNomineeModal}
        postCreateNominee={props.postCreateNominee}
      />
      <CreateQuestion
        showCreateQuestion={props.showCreateQuestion}
        toggleCreateQuestion={props.toggleCreateQuestion}
        categories={props.categories}
        quesTypes={props.quesTypes}
        postCreateQuestion={props.postCreateQuestion}
      />
      <EditQuestion
        showEditQues={props.showEditQues}
        toggleEditQues={props.toggleEditQues}
        question={question}
        categories={props.categories}
        quesTypes={props.quesTypes}
        putUpdateQuestion={props.putUpdateQuestion}
      />
      <ToastContainer />
    </div>
  );
};

export default QuestionManageView;
