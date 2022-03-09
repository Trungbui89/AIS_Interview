import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function CreateCategory(props) {
    const [cateName, setCateName] = useState({ name: '' });
    const submitCateName = (e) => {
        e.preventDefault();
        props.postCreateCategory(cateName);
    };
    return (
        <Modal centered show={props.createCateModal}>
            <Modal.Header>
                Tạo mới category
                <button
                    onClick={() => {
                        props.toggleCreateCateModal();
                    }}
                    className='btn text-danger'
                >
                    <i className='fa fa-times fa-2x'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitCateName}>
                    <div className='form-group'>
                        <label>Enter Category Name</label>
                        <input
                            className='form-control'
                            type='text'
                            value={cateName.name}
                            onChange={(e) => {
                                setCateName({
                                    ...cateName,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-success'>
                        Create
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
