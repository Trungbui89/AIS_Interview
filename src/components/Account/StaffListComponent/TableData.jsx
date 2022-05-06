import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const StatusStaff = (props) => {
    const { active } = props;
    return (
        <div
            className={
                active === true
                    ? 'status-staff-active'
                    : 'status-staff-disabled'
            }
            style={{ margin: 'auto' }}
        >
            <div style={{ padding: '2px' }}>
                {active === true ? 'Active' : 'Disabled'}
            </div>
        </div>
    );
};

const RenderStaff = (props) => {
    const { staffs, selected, handleSelect } = props;
    // console.log(selected);
    return staffs?.map((staff, index) => {
        return (
            <tr key={index} style={{ height: '60px' }}>
                <td>
                    <div className="checkbox-select-staff">
                        <FormControlLabel
                            label=""
                            sx={{ height: '33px', margin: 0, padding: 0 }}
                            control={
                                <Checkbox
                                    checked={selected.includes(staff.id)}
                                    onChange={() => {
                                        handleSelect(staff.id);
                                    }}
                                />
                            }
                        />
                    </div>
                </td>
                <td>{index + 1}</td>
                <td>{staff.fullName}</td>
                <td>
                    {staff.userType === 'Cand' ? 'Ứng viên' : staff.userType}
                </td>
                <td>{staff.email}</td>
                <td>{staff.address}</td>
                <td className="text-center">{staff.company.shortCutName}</td>
                <td className="text-center">
                    <StatusStaff active={staff.active} />
                </td>
                <td className="text-center">
                    <IconButton
                        // size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Link to={`/admin/staff-list/${staff.id}`}>
                            <IconButton>
                                <img src="/icon/View-detail.svg" alt="" />
                                <Typography sx={{fontSize:'13px', paddingLeft:'5px'}}>Chi tiết</Typography>
                            </IconButton>
                        </Link>
                    </IconButton>
                </td>
            </tr>
        );
    });
};
function TableData(props) {
    const {
        selectedAll,
        selected,
        staffs,
        handleSelectAll,
        handleMenu,
        anchorEl,
        handleClose,
        handleSelect,
    } = props;
    return (
        <table className="mt-1 card__table">
            <thead>
                <tr>
                    <th>
                        <FormControlLabel
                            label="All"
                            control={
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length < staffs?.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            }
                            sx={{ padding: '5px' }}
                        />
                    </th>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Vị trí</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th className="text-center">Công ty</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody className="">
                <RenderStaff
                    staffs={staffs}
                    handleMenu={handleMenu}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    selected={selected}
                    handleSelect={handleSelect}
                />
            </tbody>
        </table>
    );
}

export default TableData;
