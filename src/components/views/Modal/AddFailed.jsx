import React from 'react';
import { Modal } from 'react-bootstrap';

export default function AddFailed({ addFailed, setAddFailed }) {
    return (
        <div>
            <Modal show={addFailed}>
                <Modal.Body>
                    <div className='modal_failed'>
                        <i className='text-danger fa fa-times fa-4x'></i>
                    </div>
                    <p className='text-center mt-3'>Failed, Please try again!</p>
                    <div className='text-center'>
                        <button
                            className='btn btn-danger'
                            onClick={() => {
                                setAddFailed(false);
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
