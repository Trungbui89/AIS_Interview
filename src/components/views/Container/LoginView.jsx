import { TextField } from "@mui/material";
import React from "react";

const LoginView = ({ postLogin, user, setUser, show, toggleModal }) => {
  return (
    <div className="card__login container-fluid">
      <div className="row">
        <div className="card__img">
          <img src="/images/logo.png" alt="" width="50%" />
          <div>
            <img src="/images/logo-login.png" alt="" width="450px" />
          <h3 className='font-weight-bold text-white'>AI for the better life</h3>
          </div>
        </div>
        <div className="form__login">
          <p>Log in</p>
          <form onSubmit={postLogin}>
            <div className="form__group text-left">
              <div className="form__control">
                <TextField
                  style={{width: '100%'}}
                  variant="standard"
                  label="User Name"
                  type="text"
                  name="username"
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
            <div className="form__group text-left">
              <div className="form__control">
                <TextField
                  style={{width: '100%'}}
                  variant="standard"
                  label="Password"
                  type="password"
                  name="password"
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
            <input type="submit" className="form__btn" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
