import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function EditQuestion(props) {
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
        content: props.question.content,
        questionTime: props.question.questionTime,
        questionType: {
            id: '',
        },
    });
    const submitQuestion = (e) => {
        e.preventDefault();
        setQuestion({
            ...question,
            questionChoice: [choiceA, choiceB, choiceC, choiceD],
        });
        // setTimeout(() => {
        //     console.log(question);
            // props.postCreateQuestion(question);
        // }, 500);
        setQuestion({
            category: {
                id: '',
            },
            content: '',
            questionTime: '',
            questionType: {
                id: '',
            },
        });
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
            show={props.showEditQues}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header>
                Update Question
                <button
                    className='btn'
                    onClick={() => {
                        props.toggleEditQues();
                    }}
                >
                    <i className='fa fa-times fa-2x text-danger'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitQuestion}>
                    <div className='row'>
                        <div className='col-4'>
                            <label className='font-weight-bold'>Category</label>{' '}
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
                            <label className='font-weight-bold'>Time out</label>{' '}
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
                            <label className='font-weight-bold'>A:</label>
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
                            <select
                                className='form-control'
                                value={choiceA.true}
                                onChange={(e) => {
                                    setChoiceA({
                                        ...choiceA,
                                        true: e.target.value,
                                    });
                                }}
                            >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                        <div className='col-3'>
                            <label className='font-weight-bold'>B:</label>
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
                            <select
                                className='form-control'
                                value={choiceB.true}
                                onChange={(e) => {
                                    setChoiceB({
                                        ...choiceB,
                                        true: e.target.value,
                                    });
                                }}
                            >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                        <div className='col-3'>
                            <label className='font-weight-bold'>C:</label>
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
                            <select
                                className='form-control'
                                value={choiceC.true}
                                onChange={(e) => {
                                    setChoiceC({
                                        ...choiceC,
                                        true: e.target.value,
                                    });
                                }}
                            >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                        <div className='col-3'>
                            <label className='font-weight-bold'>D:</label>
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
                            <select
                                className='form-control'
                                value={choiceD.true}
                                onChange={(e) => {
                                    setChoiceD({
                                        ...choiceD,
                                        true: e.target.value,
                                    });
                                }}
                            >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success'>
                        Send
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
