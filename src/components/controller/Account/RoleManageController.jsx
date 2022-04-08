/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import RoleManageView from '../../views/AccountManage/RoleManageView';
import { apiAcc } from '../../../api/apiConnect';
import {toastSuccess,  toastFail } from '../../../helper/Notification/utils'

export default function RoleManage() {
    const token = sessionStorage.getItem('token');
    const [addFailed, setAddFailed] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);

    //GET ALL ROLE
    const [roles, setRoles] = useState([]);
    const getAllRole = () => {
        apiAcc
            .get('/accounts/role/list', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setRoles(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllRole();
    }, []);

    //POST SAVE ROLE
    const [showModalAddRole, setShowModalAddRole] = useState(false);
    const toggleAddRoleModal = () => {
        setShowModalAddRole(!showModalAddRole);
    };
    const postSaveRole = (name) => {
        const request = {
            name: name,
        };
        apiAcc
            .post('/accounts/role/save', request, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                toastSuccess('Thêm role mới thành công!');
                getAllRole();
                toggleAddRoleModal();
            })
            .catch((err) => {
                toastFail('Lỗi! Vui lòng thử lại');
                console.log(err);
            });
    };

    // GET ALL PERMISSIONS
    const [permissions, setPermissions] = useState([]);
    const getAllPermissions = () => {
        apiAcc
            .get('/accounts/per/list', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setPermissions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllPermissions();
    }, []);

    // GET ROLE DETAIL (RoleHavePer)
    const [roleDetail, setRoleDetail] = useState([]);
    const getRoleDetail = (roleId) => {
        apiAcc
            .get(`/accounts/role/havePer/${roleId}`, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setRoleDetail(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // GET PER NOT IN ROLE
    const [perNotInRole, setPerNotInRole] = useState([]);
    const getPerNotInRole = (roleId) => {
        apiAcc
            .get(`/accounts/role/notPer/${roleId}`, {
                headers:{
                    authorization: 'Bearer ' + token,
                }
            })
            .then(res => {
                setPerNotInRole(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //ADD PERMISSION TO ROLE
    const [perId, setPerId] = useState('');
    const [roleId, setRoleId] = useState('');
    const postAddPerToRole = (value) => {
        const request = {
            permissions_id: perId,
            canRead: value.canRead,
            canUpdate: value.canUpdate,
            canCreate: value.canCreate,
            roles_id: roleId,
        };
        apiAcc
            .post('/accounts/permission/addtorole', request, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setAddSuccess(true);
                getPerNotInRole(roleId);
                getRoleDetail(roleId);
                setPerId('')
            })
            .catch((err) => {
                console.log(err);
                setAddFailed(true);
            });
    };
    // DELETE ROLE PERMISSION
    const deleteRolePer = (value) => {
        apiAcc
            .delete('/accounts/permission/deletepermissiontorole', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
                data: { roles_id: roleId, permissions_id: value },
            })
            .then((res) => {
                setAddSuccess(true);
                getRoleDetail(roleId);
                getPerNotInRole(roleId);
            })
            .catch((err) => {
                console.log(err);
                setAddFailed(true);
            });
    };
    return (
        <RoleManageView
            addSuccess={addSuccess}
            setAddSuccess={setAddSuccess}
            addFailed={addFailed}
            setAddFailed={setAddFailed}
            roles={roles}
            showModalAddRole={showModalAddRole}
            toggleAddRoleModal={toggleAddRoleModal}
            postSaveRole={postSaveRole}
            permissions={permissions}
            roleDetail={roleDetail}
            getRoleDetail={getRoleDetail}
            perNotInRole={perNotInRole}
            getPerNotInRole={getPerNotInRole}
            setPerId={setPerId}
            setRoleId={setRoleId}
            postAddPerToRole={postAddPerToRole}
            deleteRolePer={deleteRolePer}
            perId={perId}
        />
    );
}
