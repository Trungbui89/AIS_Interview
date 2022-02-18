import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './controller/Account/LoginController';
import Sidebar from 'react-sidebar';
import MenuView from './views/Container/MenuView';
import QuestionManage from './controller/Quiz/QuestionManageController';
import Loading from './views/Container/Loading';
import NavbarView from './views/Container/NavbarView';
import StaffList from './controller/Account/StaffListController';
import StaffInfo from './controller/Account/StaffInfoController';
import RoleManage from './controller/Account/RoleManageController';
import CompanyManage from './controller/Account/CompanyManageController';
import QuizManage from './controller/Quiz/QuizManageController';
import ListQuizById from './views/QuizManage/ListQuizById';
import TakeTest from './controller/Quiz/TakeTestController'
import StartQuiz from './views/QuizManage/StartQuiz';

const Main = () => {
    // localStorage.setItem('isLoggedIn', 'false')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [login, setLogin] = useState(sessionStorage.getItem('isLoggedIn'));

    const onSetSidebarOpen = (open) => {
        setSidebarOpen(open);
    };

    const loginSuccess = () => {
        setLogin(sessionStorage.getItem('isLoggedIn'));
        navigate('/admin/staff-list');
    };
    // useEffect(()=>{
    //     setLogin('')
    // },[login])

    if (loading === false) {
        return (
            <Sidebar
                sidebar={
                    <MenuView
                        onSetSidebarOpen={onSetSidebarOpen}
                        setLoading={setLoading}
                    />
                }
                open={sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                styles={{
                    sidebar: {
                        width: '20%',
                        background: 'rgb(22, 34, 17)',
                    },
                }}
            >
                <Routes>
                    <Route
                        index
                        // path='/'
                        element={
                            <Login
                                loginSuccess={loginSuccess}
                                setLoading={setLoading}
                            />
                        }
                    />
                </Routes>
                {login === 'true' ? (
                    <div>
                        <NavbarView onSetSidebarOpen={onSetSidebarOpen} />
                        <Routes>
                            {/* SUPPER_ADMIN */}
                            <Route
                                path='/supperadmin/role-manage'
                                element={<RoleManage />}
                            />
                            <Route
                                path='/supperadmin/company-manage'
                                element={<CompanyManage />}
                            />
                            {/* ADMIN ROLE*/}
                            <Route
                                path='/admin/staff-list'
                                element={<StaffList setLoading={setLoading} />}
                            />
                            <Route
                                path='/admin/staff-list/:id'
                                element={<StaffInfo />}
                            />
                            <Route path='/quiz/create/question' element={<QuestionManage />} />
                            <Route path='/quiz/create/quiz' element={<QuizManage />} />
                            <Route path='/quiz/quiz-user/:id' element={<ListQuizById />} />
                            {/* <Route path='/account' element={<AccountView />} /> */}
                            {/* HR ROLE */}
                            {/* <Route
                                path='/hr/candidate'
                                element={<CandidateList />}
                            /> */}
                            {/* CANDIDATE ROLE */}
                            <Route
                                path='/list-test/take-quiz'
                                element={<TakeTest />}
                            />
                            <Route
                                path='/list-test/take-quiz/start/:id'
                                element={<StartQuiz />}
                            />
                        </Routes>
                        <footer className='page__footer'>
                            <p>©2021 AISolutions. All rights reserved</p>
                        </footer>
                    </div>
                ) : (
                    // <div>
                    //     <h2>404 Page not found</h2>
                    // </div>
                    ''
                )}
            </Sidebar>
        );
    } else {
        return <Loading />;
    }
};

export default Main;
