import React from 'react';
import { Modal } from 'react-bootstrap';

export default function AddSuccess({ addSuccess, setAddSuccess }) {
    return (
        <div>
            <Modal show={addSuccess}>
                <Modal.Body>
                    <div className='modal_success'>
                        <i className='text-success fa fa-check fa-4x'></i>
                    </div>
                    <p className='text-center mt-3'>Successfully!</p>
                    <div className='text-center'>
                        <button
                            className='btn btn-success'
                            onClick={() => {
                                setAddSuccess(false);
                            }}
                        >
                            Understand!
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
