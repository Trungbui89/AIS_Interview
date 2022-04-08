/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ListCandidate from './ListCandidate';

export default function CreateQuiz(props) {
    const [showUser, setShowUser] = React.useState(false);
    const toggleModalUser = () => {
        setShowUser(!showUser);
    };
    const [quizInput, setQuizInput] = React.useState({
        hasTag1: '',
        hasTag2: '',
        hasTag3: '',
        quantity1: '',
        quantity2: '',
        quantity3: '',
        quiz: {
            description: '',
            userId: '',
            status: 'not start',
            startTime:'',
            expiredTime:''
        },
    });
    const [nameCandidate, setNameCandidate] = React.useState('')
    const submitQuiz = (e) => {
        e.preventDefault();
        props.postCreateQuiz(quizInput);
    };
    const RenderOption = () => {
        if (props.categories.length > 0) {
            return props.categories.map((cate) => (
                <option key={cate.id} value={cate.id}>
                    {cate.name}
                </option>
            ));
        }
    };
    const selectCandidate = (value) => {
        setNameCandidate(value.fullName)
        setQuizInput({
            ...quizInput,
            quiz: {
                ...quizInput.quiz,
                userId: value.id,
            },
        });
    };
    return (
        <>
            <ListCandidate
                selectCandidate={selectCandidate}
                showUser={showUser}
                toggleModalUser={toggleModalUser}
            />
            <div className='card'>
                <div className='card-header text-justify'>
                    <b className='form_add'>Tạo bài Test</b>
                    <button className='btn' onClick={props.toggleModalCreate}>
                        <i className='fa fa-times fa-2x text-danger'></i>
                    </button>
                </div>
                <div>
                    <form onSubmit={submitQuiz}>
                        <div className='container'>
                                <div className='col-12'>
                                    <div className='form-group text-center'>
                                        <label>Tên bài Test</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter description for this Quiz'
                                            value={quizInput.quiz.description}
                                            required
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    quiz: {
                                                        ...quizInput.quiz,
                                                        description:
                                                            e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='form-group text-center'>
                                        <label>Chọn ứng viên thực hiện</label>
                                        <select
                                            onClick={() => {
                                                toggleModalUser();
                                            }}
                                            className='form-control'
                                            placeholder='Chọn'
                                            value={quizInput.quiz.userId}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    quiz: {
                                                        ...quizInput.quiz,
                                                        userId: e.target.value,
                                                    },
                                                });
                                            }}
                                        >
                                            <option value={quizInput.quiz.userId}>{nameCandidate !== '' ? nameCandidate : 'chọn'}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='form-group text-center'>
                                        <label>Thời gian mở</label>
                                        <input
                                            className='form-control'
                                            type='datetime-local'
                                            value={quizInput.quiz.startTime}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    quiz: {
                                                        ...quizInput.quiz,
                                                        startTime:
                                                            e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='form-group text-center'>
                                        <label>Thời gian đóng</label>
                                        <input
                                            className='form-control'
                                            type='datetime-local'
                                            value={quizInput.quiz.expiredTime}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    quiz: {
                                                        ...quizInput.quiz,
                                                        expiredTime: e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='form-group'>
                                        <label>Category 1</label>
                                        <select
                                            className='form-control text-info form-select'
                                            value={quizInput.hasTag1}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    hasTag1: e.target.value,
                                                });
                                            }}
                                        >
                                            <option value='' disabled>
                                                select
                                            </option>
                                            <RenderOption />
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Số lượng câu hỏi</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Quantity of category 1'
                                            value={quizInput.quantity1}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    quantity1: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='form-group'>
                                        <label>Category 2</label>
                                        <select
                                            className='form-control text-info form-select'
                                            value={quizInput.hasTag2}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    hasTag2: e.target.value,
                                                });
                                            }}
                                        >
                                            <option value='' disabled>
                                                select
                                            </option>
                                            <RenderOption />
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Số lượng câu hỏi</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Quantity of category 2'
                                            value={quizInput.quantity2}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    quantity2: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='form-group'>
                                        <label>Category 3</label>
                                        <select
                                            className='form-control text-info form-select'
                                            value={quizInput.hasTag3}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    hasTag3: e.target.value,
                                                });
                                            }}
                                        >
                                            <option value='' disabled>
                                                select
                                            </option>
                                            <RenderOption />
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Số lượng câu hỏi</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Quantity of category 3'
                                            value={quizInput.quantity3}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    quantity3: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='text-center my-3'>
                                <input
                                    type='submit'
                                    className='button-user'
                                    value='Tạo'
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

