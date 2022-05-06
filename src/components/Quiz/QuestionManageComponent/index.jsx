import React, { useState } from 'react';
import CreateCategory from '../../views/Modal/CreateCategory';
import CreateNominee from '../../views/Modal/CreateNominee';
import CreateQuestion from '../../views/Modal/QuizModal/CreateQuestion';
import EditQuestion from '../../views/Modal/QuizModal/EditQuestion';
import HeaderSearch from './HeaderSearch';
import ListQuestion from './ListQuestion';

const QuestionManageView = (props) => {
    const {
        categories,
        getFilterQuesByCate,
        nominees,
        quesTypes,
        toggleCreateCateModal,
        questions,
        toggleEditQues,
        toggleCreateQuestion,
        createCateModal,
        postCreateCategory,
        createNomineeModal,
        toggleCreateNomineeModal,
        postCreateNominee,
        showCreateQuestion,
        postCreateQuestion,
        showEditQues,
        putUpdateQuestion,
        pagination,
        filterListQuestion,
        setFilterListQuestion
    } = props;
    const [question, setQuestion] = useState({});
    const [cateId, setCateId] = React.useState('');
    
    return (
        <div>
            <div>
                <div className="card__list-test">
                    <div className="card__header">
                        <h3 className="">Question Management</h3>
                    </div>
                    <div className="list-test__content">
                        <HeaderSearch
                            categories={categories}
                            filterListQuesion={filterListQuestion}
                            setFilterListQuesion={setFilterListQuestion}
                            quesTypes={quesTypes}
                        />
                        <ListQuestion
                            questions={questions}
                            getFilterQuesByCate={getFilterQuesByCate}
                            toggleEditQues={toggleEditQues}
                            setQuestion={setQuestion}
                            toggleCreateQuestion={toggleCreateQuestion}
                            pagination={pagination}
                        />
                    </div>
                </div>
            </div>
            <CreateCategory
                createCateModal={createCateModal}
                toggleCreateCateModal={toggleCreateCateModal}
                postCreateCategory={postCreateCategory}
            />
            <CreateNominee
                createNomineeModal={createNomineeModal}
                toggleCreateNomineeModal={toggleCreateNomineeModal}
                postCreateNominee={postCreateNominee}
            />
            <CreateQuestion
                showCreateQuestion={showCreateQuestion}
                toggleCreateQuestion={toggleCreateQuestion}
                categories={categories}
                quesTypes={quesTypes}
                postCreateQuestion={postCreateQuestion}
            />
            <EditQuestion
                showEditQues={showEditQues}
                toggleEditQues={toggleEditQues}
                question={question}
                categories={categories}
                quesTypes={quesTypes}
                putUpdateQuestion={putUpdateQuestion}
            />
        </div>
    );
};

export default QuestionManageView;
