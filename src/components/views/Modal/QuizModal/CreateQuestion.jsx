import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const CreateQuestion = (props) => {
    const [choiceA, setChoiceA] = useState({
        name: '',
        true: false,
    });
    const [choiceB, setChoiceB] = useState({
        name: '',
        true: false,
    });
    const [choiceC, setChoiceC] = useState({
        name: '',
        true: false,
    });
    const [choiceD, setChoiceD] = useState({
        name: '',
        true: false,
    });

    const [question, setQuestion] = useState({
        category: {
            id: '',
        },
        content: '',
        questionTime: '',
        questionType: {
            id: '',
        },
        questionChoice: [],
    });
    const checkChoiceNull = () => {
        if (
            choiceA.name === '' ||
            choiceB.name === '' ||
            choiceC.name === '' ||
            choiceD.name === ''
        ) {
            alert('Nội dung đáp án không được để trống');
            return;
        } else if (
            choiceA.true === false ||
            choiceB.true === false ||
            choiceC.true === false ||
            choiceD.true === false
        ) {
            alert('Phải có ít nhất 1 đáp án đúng');
            return;
        } else {
            setQuestion({
                ...question,
                questionChoice: [choiceA, choiceB, choiceC, choiceD],
            });
        }
    };
    const submitQuestion = (e) => {
        e.preventDefault();
        if (question.questionChoice.length < 4) {
            checkChoiceNull();
        } else {
            // props.postCreateQuestion(question);
            alert('Success')
            setQuestion({
                category: {
                    id: '',
                },
                content: '',
                questionTime: '',
                questionType: {
                    id: '',
                },
                questionChoice: [],
            });
            return;
        }
    };
    const OptionCategory = () =>
        props.categories.map((cate) => (
            <option key={cate.id} value={cate.id}>
                {cate.name}
            </option>
        ));
    const OptionQuestionType = () =>
        props.quesTypes.map((qt) => (
            <option key={qt.id} value={qt.id}>
                {qt.name}
            </option>
        ));
    return (
        <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={props.showCreateQuestion}
        >
            <div className='card'>
                <div className='card-header'>
                    <div className='row'>
                        <h5 className='font-weight-bold text-info col-10'>
                            Create New Question
                        </h5>
                        <span className='col-2'>
                            <button
                                className='btn'
                                onClick={props.toggleCreateQuestion}
                            >
                                <i className='fa fa-times fa-2x text-danger'></i>
                            </button>
                        </span>
                    </div>
                </div>
                <div className='card-body text-left'>
                    <form onSubmit={submitQuestion}>
                        <div className='row'>
                            <div className='col-4'>
                                <label className='font-weight-bold'>
                                    Category
                                </label>{' '}
                                <select
                                    className='form-control'
                                    value={question.category.id}
                                    onChange={(e) => {
                                        setQuestion({
                                            ...question,
                                            category: { id: e.target.value },
                                        });
                                    }}
                                >
                                    <option value='' disabled>
                                        select
                                    </option>
                                    <OptionCategory />
                                </select>
                            </div>
                            <div className='col-4'>
                                <label className='font-weight-bold'>
                                    Question Type
                                </label>{' '}
                                <select
                                    className='form-control'
                                    value={question.questionType.id}
                                    onChange={(e) => {
                                        setQuestion({
                                            ...question,
                                            questionType: {
                                                id: e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <option value='' disabled>
                                        select
                                    </option>
                                    <OptionQuestionType />
                                </select>
                            </div>
                            <div className='col-4'>
                                <label className='font-weight-bold'>
                                    Time out
                                </label>{' '}
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='minutes'
                                    value={question.questionTime}
                                    onChange={(e) => {
                                        setQuestion({
                                            ...question,
                                            questionTime: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className='col-12 mt-3'>
                                <label className='font-weight-bold'>
                                    Content Question
                                </label>
                                <textarea
                                    className='form-control'
                                    rows='3'
                                    placeholder='Enter your question'
                                    value={question.content}
                                    onChange={(e) => {
                                        setQuestion({
                                            ...question,
                                            content: e.target.value,
                                        });
                                    }}
                                ></textarea>
                            </div>
                        </div>
                        <div className='row mt-3 mb-4'>
                            <div className='col-3'>
                                <label className='font-weight-bold mx-2'>
                                    A:
                                </label>
                                <input
                                    type='checkbox'
                                    checked={choiceA.true}
                                    onChange={() => {
                                        setChoiceA({
                                            ...choiceA,
                                            true: !choiceA.true,
                                        });
                                    }}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='answer'
                                    value={choiceA.name}
                                    onChange={(e) => {
                                        setChoiceA({
                                            ...choiceA,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                
                            </div>
                            <div className='col-3'>
                                <label className='font-weight-bold mx-2'>B:</label>
                                <input
                                    type='checkbox'
                                    checked={choiceB.true}
                                    onChange={() => {
                                        setChoiceB({
                                            ...choiceB,
                                            true: !choiceB.true,
                                        });
                                    }}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='answer'
                                    value={choiceB.name}
                                    onChange={(e) => {
                                        setChoiceB({
                                            ...choiceB,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                
                            </div>
                            <div className='col-3'>
                                <label className='font-weight-bold mx-2'>C:</label>
                                <input
                                    type='checkbox'
                                    checked={choiceC.true}
                                    onChange={() => {
                                        setChoiceC({
                                            ...choiceC,
                                            true: !choiceC.true,
                                        });
                                    }}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='answer'
                                    value={choiceC.name}
                                    onChange={(e) => {
                                        setChoiceC({
                                            ...choiceC,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className='col-3'>
                                <label className='font-weight-bold mx-2'>D:</label>
                                <input
                                    type='checkbox'
                                    checked={choiceD.true}
                                    onChange={() => {
                                        setChoiceD({
                                            ...choiceD,
                                            true: !choiceD.true,
                                        });
                                    }}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='answer'
                                    value={choiceD.name}
                                    onChange={(e) => {
                                        setChoiceD({
                                            ...choiceD,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-success'>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default CreateQuestion;
