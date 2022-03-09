import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddFailed from '../Modal/AddFailed';
import AddSuccess from '../Modal/AddSuccess';

//MODAL ADD ROLE
const AddNewRole = (props) => {
    const [nameRole, setNameRole] = useState('');
    const submitAddRole = (e) => {
        e.preventDefault();
        props.postSaveRole(nameRole);
        setNameRole('');
    };
    return (
        <Modal show={props.showModalAddRole}>
            <Modal.Header>
                Add new Role
                <button className='btn' onClick={props.toggleAddRoleModal}>
                    <i className='fa fa-times fa-2x text-danger'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitAddRole}>
                    <div className='form-group'>
                        <label>Name of new role</label>
                        <input
                            type='text'
                            className='form-control'
                            value={nameRole}
                            onChange={(e) => {
                                setNameRole(e.target.value);
                            }}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-success'>
                        <i class='fa fa-plus'></i> Add
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

const RoleManageView = (props) => {
    const [allow, setAllow] = useState({
        canCreate: false,
        canRead: false,
        canUpdate: false,
    });
    const submitAllow = (e) => {
        e.preventDefault();
        props.postAddPerToRole(allow);
        setAllow({
            canCreate: false,
            canRead: false,
            canUpdate: false,
        });
    };
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.checked;
        const name = target.name;
        setAllow({
            ...allow,
            [name]: value,
        });
    };
    //Render Role
    const [roleSelected, setRoleSelected] = useState('');
    const RenderRole = () =>
        props.roles.map((role) => (
            <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                    <button
                        onClick={() => {
                            props.getRoleDetail(role.id);
                            props.getPerNotInRole(role.id);
                            setRoleSelected(role.name);
                            props.setRoleId(role.id);
                        }}
                        className='btn btn-outline-primary'
                    >
                        <i className='fa fa-info-circle'></i>
                    </button>
                </td>
            </tr>
        ));
    //Render Permission
    const RenderPer = () =>
        props.permissions.map((per) => (
            <tr key={per.id}>
                <td>{per.name}</td>
            </tr>
        ));
    // Render Role detail (RoleHavePer)
    const RenderRoleDetail = () => {
        return props.roleDetail.map((per) => (
            <tr key={per.permissions_id}>
                <td>{per.name}</td>
                <td>
                    {per.canRead === true ? (
                        <i className='fa fa-2x fa-check text-success'></i>
                    ) : (
                        <i className='fa fa-2x fa-times text-danger'></i>
                    )}
                </td>
                <td>
                    {per.canUpdate === true ? (
                        <i className='fa fa-2x fa-check text-success'></i>
                    ) : (
                        <i className='fa fa-2x fa-times text-danger'></i>
                    )}
                </td>
                <td>
                    {per.canCreate === true ? (
                        <i className='fa fa-2x fa-check text-success'></i>
                    ) : (
                        <i className='fa fa-2x fa-times text-danger'></i>
                    )}
                </td>
                <td>
                    <button
                        onClick={() => {
                            props.deleteRolePer(per.permissions_id);
                        }}
                        className='btn btn-outline-danger'
                    >
                        <i className='fa fa-times'></i>
                    </button>
                </td>
            </tr>
        ));
    };
    //Render Permission Not in Role
    const RenderPerNotInRole = () =>
        props.perNotInRole.map((per) => (
            <tr key={per.id}>
                {props.perId === per.id ? (
                    <>
                        <td>{per.name}</td>
                        <td>
                            <input
                                name='canRead'
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name='canUpdate'
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name='canCreate'
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <button
                                type='submit'
                                className='btn btn-outline-success'
                            >
                                <i className='fa fa-check'></i>
                            </button>
                            <div
                                onClick={() => {
                                    props.setPerId('');
                                }}
                                className='btn btn-outline-danger'
                            >
                                <i className='fa fa-times'></i>
                            </div>
                        </td>
                    </>
                ) : (
                    <>
                        <td>{per.name}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button
                                onClick={() => {
                                    // props.toggleAddPer();
                                    props.setPerId(per.id);
                                }}
                                className='btn btn-success'
                            >
                                <i className='fa fa-plus '></i>
                            </button>
                        </td>
                    </>
                )}
            </tr>
        ));
    return (
        <div>
            <div style={{fontFamily: "Quicksand"}}>
                <div className='card__list-test'>
                    <div className='card__header row'>
                        <h3 className=''>Role Management</h3>
                    </div>
                    <div className='row mt-5'>
                        <div className='col-7'>
                            <table className='table card__table'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>LIST ALL ROLES</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <RenderRole />
                                    <tr>
                                        <td colSpan='2'>
                                            <button
                                                onClick={
                                                    props.toggleAddRoleModal
                                                }
                                                className='btn btn-outline-success'
                                            >
                                                <i className='fa fa-plus'></i>{' '}
                                                ADD ROLE
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-5'>
                            <table className='table card__table'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>LIST ALL PERMISSIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <RenderPer />
                                </tbody>
                            </table>
                        </div>
                        <div className='col-12 mt-3'>
                            <h4 className='text-info font-weight-bold'>
                                Role Detail
                            </h4>
                            <hr />
                            {roleSelected !== '' ? (
                                <h5>{roleSelected}</h5>
                            ) : (
                                <p>No Role selected!</p>
                            )}
                        </div>
                        <div className='col-12'>
                            <form onSubmit={submitAllow}>
                                <table className='table table-border'>
                                    <thead>
                                        <tr>
                                            <th>FUNCTION</th>
                                            <th>Can Read</th>
                                            <th>Can Update</th>
                                            <th>Can Create</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderRoleDetail />
                                        <RenderPerNotInRole />
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <AddNewRole
                showModalAddRole={props.showModalAddRole}
                toggleAddRoleModal={props.toggleAddRoleModal}
                postSaveRole={props.postSaveRole}
            />
            <AddSuccess
                addSuccess={props.addSuccess}
                setAddSuccess={props.setAddSuccess}
            />
            <AddFailed
                addFailed={props.addFailed}
                setAddFailed={props.setAddFailed}
            />
        </div>
    );
};

export default RoleManageView;
