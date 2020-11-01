import React from 'react';
import {FormErrorIcon} from './FormErrorIcon';
import * as cn from 'classnames';

const FormError = ({errMsg, className}) => {

    if (!errMsg) {
        return null;
    }

    const formErorrClass = cn(className, 'form-error');

    return (
        <div className={formErorrClass}>
            
            <div className="form-error__icon">
                <FormErrorIcon/>
            </div>
            <div className="form-error__msg">
                <h2 className="form-error__title">Вход не вышел</h2>
                <div className="form-error__text">{errMsg}</div>
            </div>
        </div>
    );
};

export default FormError;