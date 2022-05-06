import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {styles} from './styles';
import { BoxPermission, BoxRole, TableData } from './TableData'

//MODAL ADD ROLE
const AddNewRole = (props) => {
    const [nameRole, setNameRole] = useState('');
    const submitAddRole = (e) => {
        e.preventDefault();
        props.postSaveRole(nameRole);
        setNameRole('');
    };
    return (
        <Modal
            centered
            show={props.showModalAddRole}
            style={{ fontFamily: 'Quicksand' }}
        >
            <Modal.Header>
                <b className="p-2">Thêm Role mới</b>
                <button className="btn" onClick={props.toggleAddRoleModal}>
                    <i className="fa fa-times fa-2x"></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitAddRole}>
                    <div className="form-group">
                        <label>Name of new role</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nameRole}
                            onChange={(e) => {
                                setNameRole(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="col-8"></div>
                        <div className="col-3">
                            <button type="submit" className="button-user">
                                <i class="fa fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

const RoleManageView = (props) => {
    const {
        roleDetail,
        postAddPerToRole,
        deleteRolePer,
        postSaveRole,
        showModalAddRole,
        perId,
        toggleAddRoleModal,
        setPerId,
        permissions,
        roles,
        setRoleId,
        setRoleDetailId,
        roleDetailId,
    } = props;
    const [nameRole, setNameRole] = useState('');
    return (
        <div style={{ fontFamily: 'Quicksand' }}>
            <div style={styles.cardListTest}>
                <div style={styles.cardHeader}>
                    <h3 style={styles.title}>Role Management</h3>
                </div>
            </div>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-4">
                        <Typography sx={{fontWeight: 'bold', textAlign: 'left'}}>Select Role</Typography>
                        <BoxRole roles={roles} setRoleDetailId={setRoleDetailId} roleDetailId={roleDetailId} toggleAddRoleModal={toggleAddRoleModal} />
                        {/* <Typography sx={{fontWeight: 'bold', textAlign: 'left', paddingTop:'40px'}}>List Function Permission</Typography>
                        <BoxPermission permissions={permissions} /> */}
                    </div>
                    <div className="col-8">
                        <Typography sx={{fontWeight: 'bold', textAlign: 'left'}}>Custom function permissions for the role</Typography>
                        <TableData roleDetail={roleDetail} postAddPerToRole={postAddPerToRole} />
                    </div>
                </div>
            </div>
            <AddNewRole
                showModalAddRole={showModalAddRole}
                toggleAddRoleModal={toggleAddRoleModal}
                postSaveRole={postSaveRole}
            />
        </div>
    );
};

export default RoleManageView;
