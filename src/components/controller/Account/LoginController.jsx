import React, { useState } from 'react';
import LoginView from '../../views/Container/LoginView';
import { apiAcc } from '../../../api/apiConnect';

const Login = ({ loginSuccess, setLoading }) => {
    const [user, setUser] = useState({ username: '', password: '' });
    const postLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        apiAcc
            .post('/accounts/login', user)
            .then((res) => {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('token', res.data.jwtToken);
                sessionStorage.setItem('username', user.username);
                sessionStorage.setItem('company', res.data.accountInfo.company.id);
                sessionStorage.setItem('id', res.data.accountInfo.id);
                loginSuccess();
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                alert('Invalid username or password');
            });
    };
    return <LoginView postLogin={postLogin} setUser={setUser} user={user} />;
};

export default Login;
