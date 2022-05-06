import moment from 'moment';
import AccActiveInfo from '../components/Account/AccActiveInfoComponent';
import ListQuizById from '../components/Quiz/ListQuizByIdComponent';
import QuizFinish from '../components/Quiz/QuizFinishComponent';
import StartQuiz from '../components/Quiz/StartQuizComponent';
import CompanyManage from '../controller/Account/CompanyManageController';
import RoleManage from '../controller/Account/RoleManageController';
import StaffInfo from '../controller/Account/StaffInfoController';
import StaffList from '../controller/Account/StaffListController';
import QuestionManage from '../controller/Quiz/QuestionManageController';
import QuizManage from '../controller/Quiz/QuizManageController';
import TakeTest from '../controller/Quiz/TakeTestController';

export const routePath = [
    {
        id: 0,
        path: '/supperadmin/role-manage',
        exact: true,
        component: RoleManage,
    },
    {
        id: 1,
        path: '/supperadmin/company-manage',
        exact: true,
        component: CompanyManage,
    },
    {
        id: 2,
        path: '/admin/staff-list',
        exact: true,
        component: StaffList,
    },
    {
        id: 3,
        path: '/admin/staff-list/:id',
        exact: true,
        component: StaffInfo,
    },
    {
        id: 4,
        path: '/quiz/create/question',
        exact: true,
        component: QuestionManage,
    },
    {
        id: 5,
        path: '/quiz/create/quiz',
        exact: true,
        component: QuizManage,
    },
    {
        id: 6,
        path: '/quiz/quiz-user/:id',
        exact: true,
        component: ListQuizById,
    },
    {
        id: 7,
        path: '/account',
        exact: true,
        component: AccActiveInfo,
    },
    {
        id: 8,
        path: '/list-test/take-quiz',
        exact: true,
        component: TakeTest,
    },
    {
        id: 9,
        path: '/list-test/take-quiz/finish',
        exact: true,
        component: QuizFinish,
    },
    {
        id: 10,
        path: '/list-test/take-quiz/start/:id',
        exact: true,
        component: StartQuiz,
    }
];

export const menuItem = [
    {
        id: 1,
        title: 'Company',
        path: '/supperadmin/company-manage',
        icon: '/icon/Company.svg',
        type: 'staff',
    },
    {
        id: 2,
        title: 'Role',
        path: '/supperadmin/role-manage',
        icon: '/icon/Role.svg',
        type: 'staff',
    },
    {
        id: 3,
        title: 'Staff',
        path: '/admin/staff-list',
        icon: '/icon/Staff.svg',
        type: 'staff',
    },
    {
        id: 4,
        title: 'Question',
        path: '/quiz/create/question',
        icon: '/icon/Question.svg',
        type: 'staff',
    },
    {
        id: 5,
        title: 'Quiz',
        path: '/quiz/create/quiz',
        icon: '/icon/Quizz.svg',
        type: 'staff',
    },
    {
        id: 6,
        title: 'Take Test',
        path: '/list-test/take-quiz/',
        icon: '/icon/Take-test.svg',
        type: 'guest',
    },
];

export const convertDateToLocal = (date) => {
    const dateLocal = moment(date).format("DD/MM/YYYY");
    return dateLocal;
}

export const convertDateToApi = (date) => {
    const dateLocal = moment(date).format("MM/DD/YYYY");
    return dateLocal;
}

