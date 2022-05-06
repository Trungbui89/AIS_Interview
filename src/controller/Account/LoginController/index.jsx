import React, { useState } from 'react';
import LoginView from '../../../components/Main/LoginComponent';
import { apiAcc } from '../../../api/apiConnect';
import {toastFail} from '../../../helper/Notification/utils'

const Login = (props) => {
    const { setLoading, loginSuccess } = props;
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
                sessionStorage.setItem('id', res.data?.accountInfo?.id);
                sessionStorage.setItem('userType', res.data.accountInfo.userType);
                sessionStorage.setItem('roleId', res.data.accountInfo.roles[0].id);
                setLoading(false);
                loginSuccess()
            })
            .catch((err) => {
                setLoading(false);
                toastFail('Sai tên tài khoản hoặc mật khẩu');
            });
    };
    return <LoginView postLogin={postLogin} setUser={setUser} user={user} />;
};

export default Login;
