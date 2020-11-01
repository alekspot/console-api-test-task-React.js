import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import Logo from '../Logo';

const LoginPage = () => {
    return (
        <div className="login-page">
            
            <div className="login-page__wrap">
                <div className="login-page__logo">
                    <Logo/>
                </div>
                <LoginFormContainer/>
            </div>
        </div>
    );
};

export default LoginPage;