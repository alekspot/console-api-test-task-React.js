import React from 'react';
import Logo from '../Logo';
import IconExit from './HeaderIcons/IconExit';
const Header = ({onLogout, account}) => {
    

    return (
        <div className="header">
            <div className="header__logo"><Logo/></div>
            
            <div className="header__title">API-консоль</div>
            
            <div className="header__profile profile">
                {account && <div className="profile__accaunt">{account.account}</div>} 
                <span className="profile__gutter">:</span> 
                {account && <div className="profile__sublogin">{account.sublogin}</div>}
            </div>
            
            
            <button className="header__logout btn" onClick={onLogout}>
                <span>Выйти</span> <IconExit/>
            </button>
            
            {/* <button className="btn">
                <IconFullScreen/>
            </button> */}
        </div>
    );
};

export default Header;