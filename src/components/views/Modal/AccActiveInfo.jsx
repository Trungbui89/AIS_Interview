/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiAcc } from '../../../api/apiConnect';
import AddFailed from './AddFailed';
import AddSuccess from './AddSuccess';

export default function AccActiveInfo(props) {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    const [info, setInfo] = useState({});
    //Modal Notifications
    const [addFailed, setAddFailed] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);

    const [show, setShow] = useState(false);
    const toggleModalChangePass = () => {
        setShow(!show);
    };

    const getAccount = () => {
        apiAcc
            .get(`/accounts/${id}`, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAccount();
    }, []);
    // POST CHANGE PASS
    const [password, setPassword] = useState({
        username: sessionStorage.getItem('username'),
        oldPass: '',
        newPass: '',
        reNewPass: '',
    });

    const [err, setErr] = useState({
        match: false,
        minLength: false,
    });
    const validateForm = (e) => {
        e.preventDefault();
        if (password.newPass.length < 6) {
            setErr({ ...err, minLength: true });
            setTimeout(() => {
                setErr({ ...err, minLength: false });
            }, 4000);
            return;
        } else if (password.newPass !== password.reNewPass){
            setErr({ ...err, match: true });
            setTimeout(() => {
                setErr({ ...err, match: false });
            }, 4000);
            return;
        } else {
            postChangePass();
            return;
        }
    };

    const postChangePass = (e) => {
        apiAcc
            .put('/accounts/changepass', password, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setAddSuccess(true);
                signOut();
            })
            .catch((err) => {
                console.log(err);
                setAddFailed(true);
            });
    };
    //Sign out
    const navigate = useNavigate();
    const signOut = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('company');
        sessionStorage.removeItem('id');
        navigate('/');
        window.location.reload();
    };
    return (
        <Modal show={props.show}>
            <Modal.Header>
                Your Information
                <button
                    onClick={() => {
                        props.toggleShowInfo();
                    }}
                    className='btn text-danger'
                >
                    <i className='fa fa-times fa-2x'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>
                    <div className='row font-weight-bold'>
                        <div className='col-3'>
                            <p>Full Name</p>
                            <p>Email</p>
                            <p>Address</p>
                            <p>Position</p>
                            <p>User Name</p>
                            <p>Password</p>
                        </div>
                        <div className='col-9'>
                            <p>{info.fullName}</p>
                            <p>{info.email}</p>
                            <p>{info.address}</p>
                            <p>{info.userType}</p>
                            <p>{info.username}</p>
                            <p>***************</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className=''>
                    <button
                        onClick={toggleModalChangePass}
                        className='btn btn-success'
                    >
                        <i className='fa fa-pencil-square-o '></i> Change
                        Password
                    </button>
                </div>
                {/* MODAL CHANGE PASS */}
            </Modal.Footer>
            <Modal show={show}>
                <Modal.Header>
                    <button onClick={toggleModalChangePass} className='btn'>
                        <i className='fa fa-times fa-2x text-danger'></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={validateForm}>
                        <div className='form-group'>
                            <label>Old Password</label>
                            <input
                                type='password'
                                className='form-control'
                                value={password.oldPass}
                                onChange={(e) => {
                                    setPassword({
                                        ...password,
                                        oldPass: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>New Password</label>
                            <input
                                type='password'
                                className='form-control'
                                value={password.newPass}
                                onChange={(e) => {
                                    setPassword({
                                        ...password,
                                        newPass: e.target.value,
                                    });
                                }}
                            />
                            {err.minLength === true ? (
                                <span className='text-danger'>
                                    Password must be 6 or more characters!
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password</label>
                            <input
                                type='password'
                                className='form-control'
                                value={password.reNewPass}
                                onChange={(e) => {
                                    setPassword({
                                        ...password,
                                        reNewPass: e.target.value,
                                    });
                                }}
                            />
                            {err.match === true ? (
                                <span className='text-danger'>
                                    New password does not match!
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            SAVE
                            <i className='fa fa-floppy-o'></i>
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
            <AddSuccess addSuccess={addSuccess} setAddSuccess={setAddSuccess} />
            <AddFailed addFailed={addFailed} setAddFailed={setAddFailed} />
        </Modal>
    );
}
