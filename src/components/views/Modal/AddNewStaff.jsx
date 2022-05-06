import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { apiAcc } from "../../../api/apiConnect";
import { toastFail, toastSuccess } from "../../../helper/Notification/utils";

function AddNewStaff(props) {
  const {
    show,
    toggleAddStaffModal,
    setAddSuccess,
    setAddFailed,
    getAllStaffs,
  } = props;
  const token = sessionStorage.getItem("token");
  const [newStaff, setNewStaff] = useState({
    fullName: "",
    email: "",
    address: "",
    userType: "",
    username: "",
    password: "",
    birthDay: "",
    company: {
      id: sessionStorage.getItem("company"),
    },
    active: true,
  });
  // POST ADD STAFF
  const postAddStaff = (staff) => {
    apiAcc
      .post("/accounts", staff, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toastSuccess("Thêm nhân viên thành công");
        getAllStaffs();
        toggleAddStaffModal();
        setNewStaff({
          fullName: "",
          email: "",
          address: "",
          userType: "",
          username: "",
          password: "",
          company: {
            id: sessionStorage.getItem("company"),
          },
          active: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toastFail("Thất bại, vui lòng kiểm tra lại");
      });
  };

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    postAddStaff(newStaff);
  };

  return (
    <Modal
      show={show}
      onHide={toggleAddStaffModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div
          className="text-black font-weight-bold p-1"
          style={{ fontFamily: "Quicksand" }}
        >
          Thêm nhân viên mới
        </div>
        <button className="btn" onClick={toggleAddStaffModal}>
          <i className="fa fa-times fa-2x"></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="form_add">
          <form onSubmit={handleStaffSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="my-3 mx-auto avatar-user"></div>
                <div className="text-center">
                  <button className="button-user">Chọn ảnh</button>
                </div>
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={newStaff.fullName}
                    onChange={(e) => {
                      setNewStaff({
                        ...newStaff,
                        fullName: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newStaff.birthDay}
                    onChange={(e) => {
                      setNewStaff({
                        ...newStaff,
                        birthDay: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
              <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={newStaff.email}
                    onChange={(e) => {
                      setNewStaff({
                        ...newStaff,
                        email: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={newStaff.address}
                    onChange={(e) => {
                      setNewStaff({
                        ...newStaff,
                        address: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Vai trò</label>
                  <select
                    className="form-control"
                    type="select"
                    onChange={(e) => {
                      setNewStaff({
                        ...newStaff,
                        userType: e.target.value,
                      });
                    }}
                  >
                    <option value="">select?</option>
                    <option value="Cand">Candidate</option>
                    <option value="HR">HR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    value={newStaff.username}
                    onChange={(e) => {
                      setNewStaff({
                        ...newStaff,
                        username: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="password"
                    value={newStaff.password}
                    onChange={(e) => {
                      setNewStaff({
                        ...newStaff,
                        password: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-9"></div>
              <div className="col-2">
                <button type="submit" className="button-user px-5">
                  <span>Add</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddNewStaff;
