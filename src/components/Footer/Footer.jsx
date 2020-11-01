import React from 'react';
import IconFormat from './IconFormat';

export const Footer = ({onSubmit, onFormat}) => {
    
    return (
        <div className="footer">
            <button className="submit" onClick={onSubmit}>Отправить</button>
            <button className="btn footer__format" onClick={onFormat}>
                <span className="footer__format-icon"><IconFormat/></span>
                <span>Форматировать</span>
            </button>
        </div>
    );
};
