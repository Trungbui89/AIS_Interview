import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddPermissions from '../../views/Modal/AddPermissions';
import EditStaffInfo from '../../views/Modal/EditStaffInfo';
import UserInformation from './UserInformation';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import UserRole from './UserRole';
import TestWithUser from './TestWithUser';

function StaffInfoView(props) {
    const {
        staff,
        roles,
        postUpdateStaff,
        canEdit,
        setCanEdit,
        roleInUser,
        postAddRoleToUser,
        deleteUserRole,
        perInUser,
        postAddPerToUser,
        setPerId,
        deleteUserPer,
        showModalPass,
        toggleModalPassChange,
        postNewPass,
    } = props;
    return (
        <div className='container-fluid'>
            <div style={styles.previous}>
                <Link to="/admin/staff-list">
                    <IconButton sx={{ fontSize: 30 }}>
                        <img src="/icon/Back.svg" alt="back" />
                        <Typography sx={styles.titlePrevious}>
                            Chi tiết thông tin
                        </Typography>
                    </IconButton>
                </Link>
            </div>
            <UserInformation staffInfo={staff} />
            <UserRole
                roles={roles}
                roleInUser={roleInUser}
                postAddRoleToUser={postAddRoleToUser}
                deleteUserRole={deleteUserRole}
                perInUser={perInUser}
                postAddPerToUser={postAddPerToUser}
            />
            <TestWithUser />
        </div>
    );
    // <Modal
    //   centered
    //   show={props.showModalPass}
    //   onHide={props.toggleModalPassChange}
    // >
    //   <Modal.Header>
    //     <b
    //       className="p-2"
    //       style={{ fontFamily: "Quicksand" + "," + "sans-serif" }}
    //     >
    //       Đổi mật khẩu
    //     </b>
    //     <button className="btn" onClick={props.toggleModalPassChange}>
    //       <i className="fa fa-times fa-2x"></i>
    //     </button>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <form onSubmit={submitNewPass}>
    //       <div className="form-group">
    //         <label>Mật khẩu mới</label>
    //         <input
    //           className="form-control"
    //           type="text"
    //           value={newPass}
    //           onChange={(e) => {
    //             setNewPass(e.target.value);
    //           }}
    //           required
    //         />
    //         {errLength === true ? (
    //           <span className="text-danger">
    //             Mật khẩu phải gồm tối thiểu 6 kí tự
    //           </span>
    //         ) : (
    //           ""
    //         )}
    //       </div>
    //       <div className="row">
    //         <div className="col-9"></div>
    //         <div className="col-2">
    //           <button className="button-user">Lưu</button>
    //         </div>
    //       </div>
    //     </form>
    //   </Modal.Body>
    // </Modal>
}

const styles = {
    previous: {
        textAlign: 'left',
    },
    titlePrevious: {
        color: '#0B176D',
        fontFamily: 'Quicksand',
    },
};

export default StaffInfoView;
