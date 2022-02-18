import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { apiAcc } from '../../../api/apiConnect';

function AddNewStaff({
    show,
    toggleAddStaffModal,
    setAddSuccess,
    setAddFailed,
    getAllStaffs
}) {
    const token = sessionStorage.getItem('token');
    const [newStaff, setNewStaff] = useState({
        fullName: '',
        email: '',
        address: '',
        userType: '',
        username: '',
        password: '',
        company: {
            id: sessionStorage.getItem('company'),
        },
        active: true,
    });
    // POST ADD STAFF
    const postAddStaff = (staff) => {
        apiAcc
            .post('/accounts', staff, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAddSuccess(true);
                getAllStaffs();
                toggleAddStaffModal();
                setNewStaff({
                    fullName: '',
                    email: '',
                    address: '',
                    userType: '',
                    username: '',
                    password: '',
                    company: {
                        id: sessionStorage.getItem('company'),
                    },
                    active: true,
                });
            })
            .catch((err) => {
                console.log(err);
                setAddFailed(true);
            });
    };  

    const handleStaffSubmit = (e) => {
        e.preventDefault();
        postAddStaff(newStaff);
    };

    return (
        <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header>
                <div className='text-black font-weight-bold'>
                    Please fill out the form completely and accurately
                </div>
                <button className='btn text-danger' onClick={toggleAddStaffModal}>
                    <i className='fa fa-times-circle-o fa-2x'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className='form_add'>
                    <form onSubmit={handleStaffSubmit}>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Họ và tên</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Full Name'
                                        value={newStaff.fullName}
                                        onChange={(e) => {
                                            setNewStaff({
                                                ...newStaff,
                                                fullName: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        placeholder='Email'
                                        value={newStaff.email}
                                        onChange={(e) => {
                                            setNewStaff({
                                                ...newStaff,
                                                email: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Địa chỉ</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Address'
                                        value={newStaff.address}
                                        onChange={(e) => {
                                            setNewStaff({
                                                ...newStaff,
                                                address: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Vai trò</label>
                                    <select
                                        className='form-control'
                                        type='select'
                                        onChange={(e) => {
                                            setNewStaff({
                                                ...newStaff,
                                                userType: e.target.value,
                                            });
                                        }}
                                    >
                                        <option value=''>select?</option>
                                        <option value='Cand'>Candidate</option>
                                        <option value='HR'>HR</option>
                                        <option value='ADMIN'>ADMIN</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Tên đăng nhập</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='username'
                                        value={newStaff.username}
                                        onChange={(e) => {
                                            setNewStaff({
                                                ...newStaff,
                                                username: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Mật khẩu</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='password'
                                        value={newStaff.password}
                                        onChange={(e) => {
                                            setNewStaff({
                                                ...newStaff,
                                                password: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Mã Công ty</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={sessionStorage.getItem('company')}
                                        disabled
                                    />
                                    
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <button type='submit' className='custom-btn btn-5'>
                                <span>Create</span>
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddNewStaff;
