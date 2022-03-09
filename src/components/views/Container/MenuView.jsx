// import React from 'react';
// import { NavLink, useMatch, useNavigate } from 'react-router-dom';

// const MenuView = ({ onSetSidebarOpen, setLoading }) => {
//     const navigate = useNavigate();
//     const signOut = () => {
//         sessionStorage.removeItem('isLoggedIn');
//         sessionStorage.removeItem('token');
//         sessionStorage.removeItem('username');
//         sessionStorage.removeItem('company');
//         sessionStorage.removeItem('id');
//         onSetSidebarOpen(false);
//         setLoading(true);
//         setTimeout(() => {
//             navigate('/');
//             window.location.reload();
//             setLoading(false);
//         }, 2000);
//     };

//     //=======ACTIVE LINK =======//
//     //COMPANY MANAGE
//     const CompanyManage =()=>{
//         const isActive = useMatch({
//             path: '/supperadmin/company-manage',
//         });
//         return (
//             <div className={isActive ? 'item__active' : ''}>
//                 <NavLink to='/supperadmin/company-manage' className='menu__link'>
//                     <h6>Company</h6>
//                 </NavLink>
//             </div>
//         );
//     }
//     // ROLE MANAGE
//     const RoleManage = () => {
//         const isActive = useMatch({
//             path: '/supperadmin/role-manage',
//         });
//         return (
//             <div className={isActive ? 'item__active' : ''}>
//                 <NavLink to='/supperadmin/role-manage' className='menu__link'>
//                     <h6>Role Manage</h6>
//                 </NavLink>
//             </div>
//         );
//     };
//     //staff
//     const StaffList = () => {
//         const isActive = useMatch({
//             path: '/admin/staff-list/*',
//         });
//         return (
//             <div className={isActive ? 'item__active' : ''}>
//                 <NavLink to='/admin/staff-list' className='menu__link'>
//                     <h6>Staff Manage</h6>
//                 </NavLink>
//             </div>
//         );
//     };
//     //Question
//     const Question = () => {
//         const isActive = useMatch({
//             path: '/quiz/create/question',
//         });
//         return (
//             <div className={isActive ? 'item__active' : ''}>
//                 <NavLink to='/quiz/create/question' className='menu__link'>
//                     <h6>Question Manage</h6>
//                 </NavLink>
//             </div>
//         );
//     };
//     //Quiz
//     const Quiz = () => {
//         const isActive = useMatch({
//             path: '/quiz/create/quiz',
//         });
//         return (
//             <div className={isActive ? 'item__active' : ''}>
//                 <NavLink to='/quiz/create/quiz' className='menu__link'>
//                     <h6>Quiz Manage</h6>
//                 </NavLink>
//             </div>
//         );
//     };
//     //Take Test
//     const TakeTest = () => {
//         const isActive = useMatch({
//             path: '/list-test/take-quiz/*',
//         });
//         return (
//             <div className={isActive ? 'item__active' : ''}>
//                 <NavLink to='/list-test/take-quiz/' className='menu__link'>
//                     <h6>Take Test</h6>
//                 </NavLink>
//             </div>
//         );
//     };
//     // CANDIDATE LIST
//     const Candidate = () => {
//         const isActive = useMatch({
//             path: '/hr/candidate/*',
//         });
//         return (
//             <div className={isActive ? 'item__active' : ''}>
//                 <NavLink to='/hr/candidate' className='menu__link'>
//                     <h6>Candidate Manage</h6>
//                 </NavLink>
//             </div>
//         );
//     };

//     return (
//         <div className='sidebar'>
//             <div className='user__image mt-3'>
//                 <img src='/images/user.png' alt='user' />
//             </div>
//             <div className='user__content'>
//                 <p>AIS / {sessionStorage.getItem('username')}</p>
//             </div>
//             <hr />
//             <CompanyManage />
//             <RoleManage />
//             <StaffList />
//             <Question />
//             <Quiz />
//             <TakeTest />
//             <Candidate />
//             <button className='btn text-success' onClick={signOut}>
//                 <i className='fa fa-sign-out fa-2x'></i>
//             </button>
//         </div>
//     );
// };

// export default MenuView;


export const menuItem = [
  {
    title: "Company",
    path: "/supperadmin/company-manage",
    icon: '/icon/Company.svg',
  },
  {
    title: "Role",
    path: "/supperadmin/role-manage",
    icon: '/icon/Role.svg',
  },
  {
    title: "Staff",
    path: "/admin/staff-list",
    icon: '/icon/Staff.svg',
  },
  {
    title: "Question",
    path: "/quiz/create/question",
    icon: '/icon/Question.svg',
  },
  {
    title: "Quiz",
    path: "/quiz/create/quiz",
    icon: '/icon/Quizz.svg',
  },
  {
    title: "Take Test",
    path: "/list-test/take-quiz/",
    icon: '/icon/Take-test.svg'
  },
];
