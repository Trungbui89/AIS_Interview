import React, { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";
import AddNewStaff from "../Modal/AddNewStaff";
import AddFailed from "../Modal/AddFailed";
import AddSuccess from "../Modal/AddSuccess";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const StatusStaff = (props) => {
  const { active } = props;
  return (
    <div
      className={
        active === true ? "status-staff-active" : "status-staff-disabled"
      }
      style={{ margin: "auto" }}
    >
      <div style={{ padding: "2px" }}>
        {active === true ? "Active" : "Disabled"}
      </div>
    </div>
  );
};

const RenderStaff = (props) => {
  const { staffs, handleMenu, anchorEl, handleClose, selected, handleSelect } =
    props;
  // console.log(selected);
  return staffs.map((staff, index) => {
    return (
      <tr key={index}>
        <td>
          <div className="checkbox-select-staff">
            <FormControlLabel
              label=""
              sx={{ height: "33px", margin: 0, padding: 0 }}
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
        <td>{staff.userType === "Cand" ? "Ứng viên" : staff.userType}</td>
        <td>{staff.email}</td>
        <td>{staff.address}</td>
        <td className="text-center">{staff.company.shortCutName}</td>
        <td className="text-center">
          <StatusStaff active={staff.active} />
        </td>
        <td className="text-center">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
                mt: 0,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <b style={{ color: "#FF0000" }}>Xóa</b>
            </MenuItem>
            <Link to={`/admin/staff-list/${staff.id}`}>
              <MenuItem>
                <b style={{ color: "rgb(7, 67, 179)" }}>Chỉnh sửa</b>
              </MenuItem>
            </Link>
          </Menu>
        </td>
      </tr>
    );
  });
};

const StaffListView = (props) => {
  const {
    staffs,
    searchStaff,
    getAllStaffs,
  } = props;
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const submitSearch = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      searchStaff(search);
      setLoader(false);
    }, 1000);
  };
  const [addModal, setAddModal] = useState(false);
  const toggleAddStaffModal = () => {
    setAddModal(!addModal);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    if(e.target.checked === true) {
      const newStaffs = staffs?.map(staff => staff.id)
      setSelected(newStaffs)
    } else {
      setSelected([])
    }
  }
  return (
    <div>
      <div>
        <AddNewStaff
          show={addModal}
          setAddModal={setAddModal}
          toggleAddStaffModal={toggleAddStaffModal}
          getAllStaffs={getAllStaffs}
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
                sx={{ color: "rgba(255, 193, 69, 1)" }}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
            <div className="form__search-candidate col-7">
              <form onSubmit={submitSearch}>
                {loader === true ? (
                  <div className="loader_icon">
                    <Puff type="Puff" color="#00BFFF" height={35} width={35} />
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="row m-1">
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
                      sx={{ padding: "5px" }}
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StaffListView;
