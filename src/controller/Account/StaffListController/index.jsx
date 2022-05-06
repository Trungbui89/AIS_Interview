/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { apiAcc } from '../../../api/apiConnect';
import StaffListView from '../../../components/Account/StaffListComponent';

const StaffList = ({ setLoading }) => {
    const token = sessionStorage.getItem('token');
    const [staffs, setStaffs] = useState([]);
    const [filterStaff, setFilterStaff] = useState({
        page:1,
        limit: 10, 
        search: ''
    });
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 0,
        total: 0
    })
    // Lấy staff STAFFS
    const getFilterStaffs = () => {
        apiAcc
            .post('accounts/searchWithPaging', filterStaff, {
                headers: { 
                    authorization: `Bearer ${token}` 
                },
            })
            .then((res) => {
                setStaffs(res.data.accounts_list);
                setPagination({
                    page: res.data?.page,
                    limit: res.data?.limit,
                    total: res.data?.total
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getFilterStaffs();
    }, [filterStaff]);
    // SEARCH
    

    return (
        <StaffListView
            staffs={staffs}
            getFilterStaffs={getFilterStaffs}
            setLoading={setLoading}
            pagination={pagination}
            filterStaff={filterStaff}
            setFilterStaff={setFilterStaff}
        />
    );
};

export default StaffList;
