/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { apiAcc } from '../../../api/apiConnect';
import StaffListView from '../../views/AccountManage/StaffListView';

const StaffList = ({ setLoading }) => {
    const token = sessionStorage.getItem('token');
    const [staffs, setStaffs] = useState([]);
    const [staffResult, setStaffResult] = useState(staffs);
    const [addFailed, setAddFailed] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    // GET STAFFS
    const getAllStaffs = () => {
        apiAcc
            .get('/accounts/list', {
                headers: { 
                    authorization: `Bearer ${token}` 
                },
            })
            .then((res) => {
                setStaffs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllStaffs();
    }, []);
    // POST add staff
    // const [addModal, setAddModal] = useState(false)
    // const toggleAddStaffModal = () => {
    //     setAddModal(!addModal);
    // }
    // const postAddStaff = (staff) => {
    //     apiAcc
    //         .post('/accounts', staff, {
    //             headers: { 
    //                 authorization: `Bearer ${token}` 
    //             },
    //         })
    //         .then((res) => {
    //             setAddSuccess(true);
    //             setStaffs([...staffs, staff]);
    //             toggleAddStaffModal()
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setAddFailed(true);
    //         });
    // };
    // SEARCH
    const searchStaff = (values) => {
        const sName = values;
        if (sName !== '') {
            const result = staffs.filter((s) =>
                s.fullName.toLowerCase().match(sName.toLowerCase())
            );
            if (result.length > 0) {
                setStaffResult(result);
            } else {
                alert('No result!');
            }
        } else {
            setStaffResult([...staffs]);
        }
    };
    const searchResultRender = () => {
        if (staffResult.length > 0) {
            return staffResult;
        } else {
            return staffs;
        }
    };

    return (
        <StaffListView
            staffs={searchResultRender()}
            getAllStaffs={getAllStaffs}
            searchStaff={searchStaff}
            setLoading={setLoading}
            addFailed={addFailed}
            setAddFailed={setAddFailed}
            addSuccess={addSuccess}
            setAddSuccess={setAddSuccess}
        />
    );
};

export default StaffList;
