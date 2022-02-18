import React from 'react';

const LoginView = ({ postLogin, user, setUser, show, toggleModal }) => {
    return (
        <div className='card__login'>
            <div className='row'>
                <div className='card__img'>
                    <img
                        src='/images/login-bg.jpg'
                        alt=''
                        width='100%'
                        height='auto'
                    />
                </div>
                <div className='form__login'>
                    <img
                        src='https://aisolutionsjsc.com/wp-content/uploads/2021/07/logo-ai.png'
                        alt='AIS'
                        width='250px'
                        className='mb-3'
                    />
                    <p>Log in</p>
                    <form onSubmit={postLogin}>
                        <div className='form__group text-left'>
                            <div className='form__control'>
                                <label className='form__label' htmlFor=''>
                                    Username
                                </label>
                                <input
                                    className=''
                                    type='text'
                                    name='username'
                                    value={user.username}
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            username: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className='form__group text-left'>
                            <div className='form__control'>
                                <label htmlFor=''>Password</label>
                                <input
                                    className=''
                                    type='password'
                                    name='password'
                                    value={user.password}
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* <div className='form__group text-left'>
                            <div className='form__control'>
                                <label htmlFor=''>Company Code</label>
                                <input
                                    className=''
                                    type='text'
                                    name='text'
                                    value='AIS'
                                    disabled
                                />
                            </div>
                        </div> */}
                        <input
                            type='submit'
                            className='form__btn'
                            value='LOGIN'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
