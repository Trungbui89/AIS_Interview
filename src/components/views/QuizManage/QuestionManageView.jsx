import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddFailed from '../Modal/AddFailed';
import AddSuccess from '../Modal/AddSuccess';
import CreateCategory from '../Modal/CreateCategory';
import CreateNominee from '../Modal/CreateNominee';
import CreateQuestion from '../Modal/QuizModal/CreateQuestion';
import EditQuestion from '../Modal/QuizModal/EditQuestion';
import ListQuestion from './ListQuestion';

const QuestionManageView = (props) => {
    const [question, setQuestion] = useState({});
    const [grid, setGrid] = useState({
        item: 'col-4',
        card: 'card__test',
    });
    const RenderCategory = () =>
        props.categories.map((cate) => (
            <tr key={cate.id}>
                <td>{cate.name}</td>
            </tr>
        ));
    const RenderNominee = () =>
        props.nominees.map((nominee) => (
            <tr key={nominee.name}>
                <td>{nominee.name}</td>
            </tr>
        ));
    const RenderQuestionType = () =>
        props.quesTypes.map((qt) => (
            <tr key={qt.name}>
                <td>{qt.name}</td>
            </tr>
        ));
    return (
        <div className='page__out'>
            <div className='page__in'>
                <div className='container card__list-test'>
                    <div className='card__header'>
                        <h3 className=''>Question Management</h3>
                    </div>
                    <div className='row'>
                        <div className='form__view'>
                            <button
                                onClick={() => {
                                    setGrid({
                                        item: 'col-12',
                                        card: 'card__test row',
                                    });
                                }}
                            >
                                <i className='fa fa-th-list fa-2x'></i>
                            </button>
                            <button
                                onClick={() => {
                                    setGrid({ ...grid, item: 'col-4' });
                                }}
                            >
                                <i className='fa fa-th fa-2x'></i>
                            </button>
                        </div>
                        <Link to='/quiz/create/quiz'>
                            <button className='btn btn-outline-primary mt-4'>
                                Create New Quiz
                            </button>
                        </Link>
                    </div>
                    <div className='list-test__content row'>
                        <div className='col-3'>
                            <div className='col-12'>
                                <table className='table'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>List Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderCategory />
                                        <tr>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        props.toggleCreateCateModal();
                                                    }}
                                                    className='btn btn-outline-success'
                                                >
                                                    Create Category
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-12'>
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
                                                    Create Nominee
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-12'>
                                <table className='table'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>List Question Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderQuestionType />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-9 border'>
                            <div className='bg-info row'>
                                <h4 className='p-1 text-light mx-auto'>
                                    List Question
                                </h4>
                            </div>
                            <div className='text-left mt-2'>
                                <button
                                    onClick={props.toggleCreateQuestion}
                                    className='btn btn-outline-success'
                                >
                                    <i className='fa fa-plus'></i> New Question
                                </button>
                            </div>
                            <ListQuestion
                                questions={props.questions}
                                getQuesByCate={props.getQuesByCate}
                                categories={props.categories}
                                toggleEditQues={props.toggleEditQues}
                                setQuestion={setQuestion}
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
            />
            <AddSuccess
                addSuccess={props.addSuccess}
                setAddSuccess={props.setAddSuccess}
            />
            <AddFailed
                addFailed={props.addFailed}
                setAddFailed={props.setAddFailed}
            />
        </div>
    );
};

export default QuestionManageView;
