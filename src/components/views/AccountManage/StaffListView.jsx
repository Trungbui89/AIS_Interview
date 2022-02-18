import React, { useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import AddNewStaff from '../Modal/AddNewStaff';
import AddFailed from '../Modal/AddFailed';
import AddSuccess from '../Modal/AddSuccess';

const RenderStaff = ({ staffs }) =>
    staffs.map((staff) => {
        return (
            <tr key={staff.id}>
                <td>{staff.fullName}</td>
                <td>{staff.userType}</td>
                <td>{staff.email}</td>
                <td>{staff.company.name}</td>
                <td className=''>
                    <Link to={`/admin/staff-list/${staff.id}`}>
                        <button className='btn__info'>
                            <i className='fa fa-info-circle'></i>
                        </button>
                    </Link>
                    {/* <button className='btn__edit'>
                        <i className='fa fa-pencil-square-o'></i>
                    </button> */}
                    <button className='btn__delete-staff'>
                        <i className='fa fa-times-circle-o'></i>
                    </button>
                </td>
            </tr>
        );
    });

const StaffListView = ({
    staffs,
    searchStaff,
    addFailed,
    setAddFailed,
    addSuccess,
    setAddSuccess,
    getAllStaffs
}) => {
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('');
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


    return (
        <div className='page__out'>
            <div className='page__in'>
                <AddNewStaff
                    show={addModal}
                    setAddModal={setAddModal}
                    toggleAddStaffModal={toggleAddStaffModal}
                    setAddFailed= {setAddFailed}
                    setAddSuccess={setAddSuccess}
                    getAllStaffs={getAllStaffs}
                />
                <AddFailed addFailed={addFailed} setAddFailed={setAddFailed} />
                <AddSuccess
                    addSuccess={addSuccess}
                    setAddSuccess={setAddSuccess}
                />
                <div className='container card__list-test'>
                    <div className='card__header row'>
                        <h3 className=''>Staff List</h3>
                    </div>
                    <div className='row'>
                        <div className=' col-4 text-left'>
                            <button
                                className='snip1582'
                                onClick={toggleAddStaffModal}
                            >
                                <i className='fa fa-plus'></i> ADD New Staff
                            </button>
                        </div>
                        <div className='form__search-candidate col-8'>
                            <form onSubmit={submitSearch}>
                                {loader === true ? (
                                    <div className='loader_icon'>
                                        <Puff
                                            type='Puff'
                                            color='#00BFFF'
                                            height={20}
                                            width={20}
                                        />
                                    </div>
                                ) : (
                                    ''
                                )}
                                <input
                                    type='text'
                                    placeholder='Search'
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                />
                                <button type='submit'>
                                    <i className='fa fa-search'></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='row m-1'>
                        <table className='table mt-5 table-striped card__table'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>NAME</th>
                                    <th>POSITION</th>
                                    <th>EMAIL</th>
                                    <th>COMPANY</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                <RenderStaff staffs={staffs} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffListView;
