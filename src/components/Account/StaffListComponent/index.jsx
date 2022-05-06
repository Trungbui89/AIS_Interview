import React, { useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import AddNewStaff from '../../views/Modal/AddNewStaff';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PaginationComponent from '../../../helper/PaginationComponent';
import TableData from './TableData';
import InputSearchComponent from '../../../helper/InputSearchComponent';
import { Button } from '@mui/material';

const StaffListView = (props) => {
    const { staffs, getFilterStaffs, pagination, filterStaff, setFilterStaff } =
        props;
    const [searchKeyword, setSearchKeyword] = useState('');
    const handleSearch = () => {
        setFilterStaff({ ...filterStaff, search: searchKeyword });
    };
    const [addModal, setAddModal] = useState(false);
    const toggleAddStaffModal = () => {
        setAddModal(!addModal);
    };
    const [selected, setSelected] = useState([]);
    const [selectedAll, setSelectedAll] = useState(false);
    const handleSelect = (staffId) => {
        if (selected.includes(staffId) === true) {
            const newSelected = selected.filter((id) => id !== staffId);
            setSelected(newSelected);
        } else {
            setSelected([...selected, staffId]);
        }
    };

    React.useEffect(() => {
        if (selected.length === staffs.length) {
            setSelectedAll(true);
        } else if (selected.length === 0) {
            setSelectedAll(false);
        }
    }, [selected, staffs]);

    const handleSelectAll = (e) => {
        if (e.target.checked === true) {
            const newStaffs = staffs?.map((staff) => staff.id);
            setSelected(newStaffs);
        } else {
            setSelected([]);
        }
    };
    return (
        <div>
            <div>
                <AddNewStaff
                    show={addModal}
                    setAddModal={setAddModal}
                    toggleAddStaffModal={toggleAddStaffModal}
                    getAllStaffs={getFilterStaffs}
                />
                <div className="card__list-test">
                    <div className="card__header row">
                        <h3 className="">Staff Management</h3>
                    </div>
                    <div className="row py-2">
                        <div className="col-4 text-left add-staff-button">
                            Thêm nhân viên
                            <IconButton
                                onClick={toggleAddStaffModal}
                                sx={{ color: 'rgba(255, 193, 69, 1)' }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </div>
                        <div className="col-5"></div>
                        <div className="col-2">
                            <InputSearchComponent
                                placeholder="Nhập nội dung tìm kiếm"
                                isShowIconSearch={false}
                                onChangeSearch={(event) =>
                                    setSearchKeyword(event)
                                }
                            />
                        </div>
                        <div className="col-1">
                            <Button size="small" variant="contained" color="warning" onClick={handleSearch}>Tìm kiếm</Button>
                        </div>
                    </div>
                    <div className="row m-1">
                        <TableData
                            selectedAll={selectedAll}
                            selected={selected}
                            staffs={staffs}
                            handleSelectAll={handleSelectAll}
                            handleSelect={handleSelect}
                        />
                        <PaginationComponent
                            isShowPaginate
                            hiddenDivider
                            pagination={pagination}
                            filterStaff={filterStaff}
                            handleChangePagination={setFilterStaff}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffListView;
