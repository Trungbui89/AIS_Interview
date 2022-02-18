import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddFailed from '../Modal/AddFailed';
import AddPermissions from '../Modal/AddPermissions';
import AddSuccess from '../Modal/AddSuccess';
import EditStaffInfo from '../Modal/EditStaffInfo';

function StaffInfoView(props) {
    //ROLE
    const RolesWithUser = () =>
        props.roleInUser.map((role) => (
            <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                    <div
                        onClick={() => {
                            props.deleteUserRole(role.id);
                        }}
                        className='btn btn-outline-danger'
                    >
                        <i className='fa fa-times'></i>
                    </div>
                </td>
            </tr>
        ));
    const RoleNotinUser = () =>
        props.roles.map((role) => {
            return (
                <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>
                        <button
                            onClick={() => {
                                props.postAddRoleToUser(role.id);
                            }}
                            className='btn btn-success'
                        >
                            <i className='fa fa-plus'></i> Assign
                        </button>
                    </td>
                </tr>
            );
        });
    //PERMISSION
    const PerWithUser = () =>
        props.perInUser.map((per) => (
            <tr key={per.id}>
                <td>{per.name}</td>
                <td>
                    <div
                        onClick={() => {
                            props.deleteUserPer(per.id);
                        }}
                        className='btn btn-outline-danger'
                    >
                        <i className='fa fa-times'></i>
                    </div>
                </td>
            </tr>
        ));
    const PermissionNotInUser = () =>
        props.permissions.map((per) => {
            return (
                <tr key={per.id}>
                    <td>{per.name}</td>
                    <td>
                        <button
                            onClick={() => {
                                props.setPerId(per.id);
                                props.toggleAddPer();
                            }}
                            className='btn btn-success'
                        >
                            <i className='fa fa-plus'></i> Assign
                        </button>
                    </td>
                </tr>
            );
        });

    //SUBMIT NEW PASSWORD
    const [errLength, setErrLength] = useState(false);
    const [newPass, setNewPass] = useState('');
    const submitNewPass = (e) => {
        e.preventDefault();
        if (newPass.length < 6) {
            setErrLength(true);
            setTimeout(() => {
                setErrLength(false);
            }, 5000);
            return;
        } else {
            props.postNewPass(newPass);
            setNewPass('');
            return;
        }
    };
    return (
        <div className='page__out'>
            <div className='page__in'>
                <div className='container card__list-test'>
                    <div className='card__header'>
                        <h3 className=''>Staff Info</h3>
                    </div>
                    <div className='card__info-staff'>
                        <div className='info__header'>
                            <h5 className='font-weight-bold'>
                                User detail and Assigned User Roles
                            </h5>
                        </div>
                        <div className='row m-4'>
                            <div className='info__content1 col-sm-6'>
                                <div className='content1'>
                                    {props.canEdit === true ? (
                                        <EditStaffInfo
                                            setCanEdit={props.setCanEdit}
                                            staff={props.staff}
                                            postUpdateStaff={
                                                props.postUpdateStaff
                                            }
                                        />
                                    ) : (
                                        <table className='table'>
                                            <thead className='header'>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>
                                                        Information
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope='row'>
                                                        FULL NAME
                                                    </th>
                                                    <td>
                                                        {props.staff.fullName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope='row'>EMAIL</th>
                                                    <td>{props.staff.email}</td>
                                                </tr>
                                                <tr>
                                                    <th scope='row'>ADDRESS</th>
                                                    <td>
                                                        {props.staff.address}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope='row'>
                                                        POSITION
                                                    </th>
                                                    <td>
                                                        {props.staff.userType}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        props.setCanEdit(true);
                                    }}
                                    className='snip1582'
                                >
                                    <i className='fa fa-pencil-square-o'></i>{' '}
                                    EDIT INFOR
                                </button>
                            </div>
                            <div className='info__content2 col-sm-3'>
                                <div className='content2'>
                                    <table className='table'>
                                        <thead className='header'>
                                            <tr>
                                                <th>Active Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <RolesWithUser />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='info__content2 col-sm-3'>
                                <div className='content2'>
                                    <table className='table'>
                                        <thead className='header'>
                                            <tr>
                                                <th>Active Per</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <PerWithUser />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-sm-6 mt-3 mb-2'>
                                <table className='table tbl__role'>
                                    <thead className=''>
                                        <tr>
                                            <th>TYPE ROLE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RoleNotinUser />
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-sm-6 mt-3 mb-2'>
                                <table className='table tbl__role'>
                                    <thead className=''>
                                        <tr>
                                            <th>PERMISSION</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <PermissionNotInUser />
                                    </tbody>
                                </table>
                            </div>
                            <button
                                onClick={props.toggleModalPassChange}
                                className='btn btn-outline-danger ml-3 mb-4'
                            >
                                Change password for this user
                            </button>
                            {/* Modal */}
                            <AddFailed
                                addFailed={props.addFailed}
                                setAddFailed={props.setAddFailed}
                            />
                            <AddSuccess
                                addSuccess={props.addSuccess}
                                setAddSuccess={props.setAddSuccess}
                            />
                            <AddPermissions
                                showAddPer={props.showAddPer}
                                toggleAddPer={props.toggleAddPer}
                                staffId={props.staff.id}
                                postAddPerToUser={props.postAddPerToUser}
                            />
                            <Modal show={props.showModalPass}>
                                <Modal.Header>
                                    <button
                                        className='btn'
                                        onClick={props.toggleModalPassChange}
                                    >
                                        <i className='fa fa-times fa-2x text-danger'></i>
                                    </button>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={submitNewPass}>
                                        <div className='form-group'>
                                            <label>New Password</label>
                                            <input
                                                className='form-control'
                                                type='text'
                                                value={newPass}
                                                onChange={(e) => {
                                                    setNewPass(e.target.value);
                                                }}
                                            />
                                            {errLength === true ? (
                                                <span className='text-danger'>
                                                    Password must be 6 or more
                                                    characters long
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <button className='btn btn-primary'>
                                            SAVE
                                        </button>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffInfoView;
