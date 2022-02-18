import React, { useState } from 'react';
import AccActiveInfo from '../Modal/AccActiveInfo';

const NavbarView = ({ onSetSidebarOpen }) => {
    const [showInfo, setShowInfo] = useState(false);
    const toggleShowInfo = () => {
        setShowInfo(!showInfo);
    };
    return (
        <div className='navigation__bar'>
            <header>
                <nav>
                    <div className='logo'>
                        <button
                            className='set__sidebar'
                            onClick={() => onSetSidebarOpen(true)}
                        >
                            <i className='fa fa-bars' aria-hidden='true'></i>{' '}
                            {/* <i className='fa fa-long-arrow-right'></i> */}
                        </button>
                        <img
                            // src='https://aisolutionsjsc.com/wp-content/uploads/2021/07/logo-ai.png'
                            src='/images/logo-ai.png'
                            alt='AIS'
                            width='80px'
                            className='ml-1'
                        />
                    </div>
                    <div className='menu'>
                        <ul>
                            <li>
                                <button
                                    className='ml-2 mr-2'
                                    onClick={() => {
                                        alert('The function is developing');
                                    }}
                                >
                                    <i className='fa fa-bell-o mt-2'>
                                        <p className='notification__nav'>1</p>
                                    </i>
                                </button>
                            </li>
                            <li>
                                <button
                                    className='ml-2 mr-2'
                                    onClick={() => {
                                        alert('The function is developing');
                                    }}
                                >
                                    <i className='fa fa-envelope-o mt-2'>
                                        <p className='notification__nav'>3</p>
                                    </i>
                                </button>
                            </li>
                            <li>
                                <button onClick={toggleShowInfo} className='ml-2 mr-2'>
                                    <span>
                                        {sessionStorage.getItem('username')}
                                    </span>
                                </button>
                            </li>
                            <AccActiveInfo
                                show={showInfo}
                                toggleShowInfo={toggleShowInfo}
                            />
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavbarView;
