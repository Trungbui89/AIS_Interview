import * as React from 'react';

export default function ListQuestion(props) {
    const [cateId, setCateId] = React.useState('');
    const ButtonCategory = () => {
        if (props.categories.length > 0) {
            return props.categories.map((cate) => (
                <button
                    key={cate.id}
                    className={cateId === cate.id ? 'button-active' : 'btn'}
                    onClick={() => {
                        setCateId(cate.id);
                        props.getQuesByCate(cate.id);
                    }}
                >
                    {cate.name}
                </button>
            ));
        } else return null
    };

    const RenderQuestions = () => {
        console.log(props.questions);
        if (props.questions.length > 0) {
            return props.questions.map((qt, idx) => (
                <div key={idx} className='col-12 mt-4'>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='font-weight-bold text-left'>
                                Q{idx + 1}: {qt.content}
                            </p>
                        </div>
                        <div className='col-4'>
                            <span>Category: {qt.category.name}</span>
                            <br />
                            <span>Question Type: {qt.questionType.name}</span>
                        </div>
                        <div className='col-2 mt-2'>
                            <button
                                onClick={() => {
                                    props.setQuestion(qt);
                                    props.toggleEditQues();
                                }}
                                className='btn btn-outline-primary'
                            >
                                <i className='fa fa-pencil-square-o'></i>
                            </button>
                            <button className='btn btn-outline-danger ml-1'>
                                <i className='fa fa-trash'></i>
                            </button>
                        </div>
                    </div>
                    <div className='row py-2'>
                        {qt.questionChoiceDTOs.map((choice) => (
                            <div key={choice.id} className='col-3'>
                                <h6>{choice.name}</h6>
                                {choice.true === true ? (
                                    <i className='fa fa-check text-success'></i>
                                ) : (
                                    <i className='fa fa-times text-danger'></i>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ));
        } else return <p className='m-auto'>Chọn 1 Category!</p>;
    };
    return (
        <div className='mt-2'>
            <ButtonCategory />
            <div className='mt-4 question-list'>
                <RenderQuestions />
            </div>
        </div>
    );
}
