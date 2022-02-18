/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import CreateQuiz from '../Modal/QuizModal/CreateQuiz';
import AddSuccess from '../Modal/AddSuccess';
import AddFailed from '../Modal/AddFailed';
import { apiAcc } from '../../../api/apiConnect';
import { Link } from 'react-router-dom';

export default function QuizManageView(props) {
    return (
        <div className='page__out'>
            <div className='page__in'>
                <div className='container card__list-test'>
                    <div className='card__header'>
                        <h3 className=''>Quiz Management</h3>
                    </div>
                    <div className='mt-5 text-left'>
                        <button
                            className='snip1582'
                            onClick={props.toggleModalCreate}
                        >
                            Create New Quiz
                        </button>
                    </div>
                    {props.showCreateQuiz === true ? (
                        <CreateQuiz
                            showCreateQuiz={props.showCreateQuiz}
                            toggleModalCreate={props.toggleModalCreate}
                            categories={props.categories}
                            postCreateQuiz={props.postCreateQuiz}
                        />
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className='container my-4'>
                    <ListCandidateQuiz />
                </div>
            </div>
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
const ListCandidateQuiz = () => {
    const token = sessionStorage.getItem('token');
    const [candidates, setCandidates] = React.useState([]);
    //GET User - Candidate
    const getCandidates = () => {
        apiAcc
            .get('/accounts/list', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setCandidates(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        getCandidates();
    }, []);
    const RenderCandidate = () => {
        if (candidates.length > 0) {
            return candidates.map((can) => (
                <tbody key={can.id}>
                    {can.userType === 'Cand' ? (
                        <tr>
                            <td>{can.id}</td>
                            <td>{can.fullName}</td>
                            <td>{can.company.shortCutName}</td>
                            <td>
                                {can.userType === 'Cand' ? 'Ứng viên' : null}
                            </td>
                            <td>
                                <Link to={`/quiz/quiz-user/${can.id}`}>
                                    <button className='btn btn-outline-primary'>
                                        View Quiz
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            ));
        } else return null;
    };
    return (
        <>
            <table className='table table-borderless table-list-candidate'>
                <thead className='thead-dark'>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Company</th>
                        <th>Position</th>
                        <th>#</th>
                    </tr>
                </thead>
                <RenderCandidate />
            </table>
        </>
    );
};
