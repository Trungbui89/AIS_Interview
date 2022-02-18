import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddCompany from '../Modal/AddCompany';
import AddFailed from '../Modal/AddFailed';
import AddSuccess from '../Modal/AddSuccess';

const RenderCompanyDetail = ({
    company,
    setCanEdit,
    canEdit,
    putEditCompany,
    show,
    toggleDetailShow,
}) => {
    const [info, setInfo] = useState({
        active: true,
        name: company.name,
        email: company.email,
        phone: company.phone,
        address: company.address,
        id: company.id,
    });
    const editInfoSubmit = (e) => {
        e.preventDefault();
        putEditCompany(info);
        setInfo({
            active: true,
            name: company.name,
            email: company.email,
            phone: company.phone,
            address: company.address,
            id: company.id,
        });
    };
    return (
        <Modal show={show}>
            <Modal.Header>
                <h5 className='font-weight-bold text-info'>
                    COMPANY DETAIL INFORMATION
                </h5>
                <button
                    className='btn'
                    onClick={() => {
                        toggleDetailShow();
                    }}
                >
                    <i className='fa fa-times fa-2x text-danger'></i>
                </button>
            </Modal.Header>
            <div className='container'>
                <hr />
                <div className='row mb-5'>
                    <div className='col-6 text-right border-right font-weight-bold'>
                        <p>C - Name</p>
                        <p>C - shortCut Name</p>
                        <p>C - Email</p>
                        <p>C - Phone Number</p>
                        <p>C - Address</p>
                    </div>
                    {canEdit === false ? (
                        <div className='col-6 text-left font-weight-bold text-success'>
                            <p>{company.name}</p>
                            <p>{company.shortCutName}</p>
                            <p>{company.email}</p>
                            <p>{company.phone}</p>
                            <p>{company.address}</p>
                        </div>
                    ) : (
                        <div className='col-6 text-left font-weight-bold text-success'>
                            <form onSubmit={editInfoSubmit}>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={info.name || ''}
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    value={info.email || ''}
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    value={info.phone || ''}
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            phone: e.target.value,
                                        });
                                    }}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    value={info.address || ''}
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            address: e.target.value,
                                        });
                                    }}
                                />
                                <button
                                    type='submit'
                                    className='btn btn-success mt-2'
                                >
                                    <i className='fa fa-check'></i>
                                </button>
                                <div
                                    onClick={() => {
                                        setCanEdit(false);
                                    }}
                                    className='btn btn-outline-danger ml-2 mt-2'
                                >
                                    <i className='fa fa-times'></i>
                                </div>
                            </form>
                        </div>
                    )}
                    {canEdit === false ? (
                        <button
                            onClick={() => {
                                setCanEdit(true);
                            }}
                            className='btn btn-outline-primary m-auto'
                        >
                            EDIT
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default function CompanyManageView(props) {
    const [showDetail, setShowDetail] = useState(false);
    const [company, setCompany] = useState({});
    const [show, setShow] = useState(false);
    const toggleDetailShow = () => {
        setShow(!show);
    };
    const RenderCompany = () =>
        props.companies.map((company) => (
            <div key={company.id} className='col-6'>
                <div className='card__company'>
                    <img
                        src={`data:image/jpg;base64,${company.logo}`}
                        alt='...'
                    />
                    <div className='card__text'>
                        <h4>{company.name}</h4>
                        <p>{company.email}</p>

                        <button
                            onClick={() => {
                                toggleDetailShow();
                                setCompany(company);
                                setShowDetail(true);
                            }}
                            className='btn btn-outline-warning'
                        >
                            View Detail
                        </button>
                    </div>
                    <h4>{company.name}</h4>
                </div>
            </div>
        ));
    return (
        <div className='page__out'>
            <div className='page__in'>
                <div className='container card__list-test'>
                    <div className='card__header'>
                        <h3 className=''>Company Management</h3>
                    </div>
                    <div className='text-left mt-3'>
                        <button
                            className='snip1582'
                            onClick={props.toggleModalAdd}
                        >
                            <i className='fa fa-plus'></i> ADD COMPANY
                        </button>
                    </div>
                    <div className='container mt-5'>
                        <div className='row'>
                            <RenderCompany />
                        </div>
                    </div>
                </div>
                {showDetail === true ? (
                    <RenderCompanyDetail
                        show={show}
                        toggleDetailShow={toggleDetailShow}
                        company={company}
                        canEdit={props.canEdit}
                        setCanEdit={props.setCanEdit}
                        putEditCompany={props.putEditCompany}
                    />
                ) : (
                    <div></div>
                )}
            </div>
            <AddCompany
                show={props.show}
                toggleModalAdd={props.toggleModalAdd}
                postAddCompany={props.postAddCompany}
            />
            <AddSuccess
                addSuccess={props.addSuccess}
                setAddSuccess={props.setAddSuccess}
            />
            <AddFailed
                addFailed={props.addFailed}
                setAddFailed={props.setAddFailed}
            />
        </div>
    );
}
