import React from 'react';
import Loader from '../Loader';
import * as cn from 'classnames';
import FormError from '../FormError/FormError';
import {Formik} from 'formik';

export const Form = ({isLoading, formikSettings}) => {
   
    const loginFormClass = (errors) => cn(
        'login-form',
        {
            'login-form--error': errors.auth
        }
    );

    const submitClass = cn(
        'submit',
        'login-form__item', 
        {
            'submit--loading': isLoading
        }
    );

    const fieldClass = (errorValue, otherClass) => {
        return cn('login-form__input',{
            'login-form__input--invalid': errorValue
        }, otherClass ? otherClass : null);
    };
    
    return (
        <Formik {...formikSettings}>
            {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isValid
            }) => (
                <form className={loginFormClass(errors)}>
                    <h1 className="login-form__title">API-консоль</h1>

                    <FormError className="login-form__item" errMsg={errors.auth}/>
           
                    <label className="login-form__item label">
                        <span className="label__text">Логин</span>
                        <input className={fieldClass(errors.login)}
                            type="text"
                            name="login" 
                            value={values.login}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="login-form__item label">
                        <div className="label__wrap">
                            <span className="label__text">Сублогин</span>
                            <span className="label__text label__text--gray">Опционально</span>
                        </div>
                            
                        <input className={fieldClass(errors.sublogin)}
                            type="text" 
                            name="sublogin"
                            value={values.sublogin}
                            onChange={handleChange} 
                        />
                    </label>

                    <label className="login-form__item label">
                        <span className="label__text">Пароль</span>
                        <input className={fieldClass(errors.password, ['login-form__input--password'])} 
                            type="password" 
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </label>
                    
                    <button className={submitClass} type="submit" onClick={handleSubmit} disabled={!isValid}>
                        {!isLoading && 'Войти'}
                        <Loader isLoading={isLoading}/>
                    </button>
                           
                </form>
            )}</Formik> 
    );

};