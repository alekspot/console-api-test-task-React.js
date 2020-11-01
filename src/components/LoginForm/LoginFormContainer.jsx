import {connect} from 'react-redux';
import {requestLogin} from '../../redux/actions';
import {Validate} from '../../utils';
import React, {useMemo} from 'react';
import {Form} from './Form';

//login: 'x_1601796305216414',
//sublogin: 'pokemon',
//password: 'thieetho6Y',
//password: 'R^D;~[&hJ_'

const LoginFormContainer = (props) => {
    const [validateOnChange, setValidateOnChange] = React.useState(false);
    
    const formikSettings = useMemo(() => ({
        initialValues: {
            login: 'x_1601796305216414',
            sublogin: 'pokemon',
            //password: 'thieetho6Y',
            password: 'R^D;~[&hJ_'
        },
        validateOnChange: validateOnChange,
        onSubmit(fields, {setSubmitting, setErrors}) {
            const {requestLogin} = props;
                
            requestLogin(fields)
                .then((err) => {
                    if (err) {
                        setErrors({auth: err}); 
                        setSubmitting(false);
                        setValidateOnChange(true);
                    }
                });
        },
        validate({login, password, sublogin}) {
            setValidateOnChange(true);
            const errors = {};
        
            if (!login) {
                errors.login = 'Required';
            } else if (Validate.isCirilic(login) || Validate.hasWhitespace(login)) {
                errors.login = 'Invalid login';
            }
        
            if (sublogin) {
                if (Validate.isCirilic(sublogin) || Validate.hasWhitespace(sublogin)) {
                    errors.sublogin = 'Invalid sublogin';
                }
            }
                    
            if (!password) {
                errors.password = 'Required';
            } else if (Validate.isCirilic(password)) {
                errors.password = 'Invalid password';
            }
        
            return errors;
        }
    }),[validateOnChange]);

    return <Form formikSettings={formikSettings} isLoading={props.isLoading}/>;
};
const mapStateToProps = ({auth}) => ({
    isLoading: auth.isLoading
});

export default  connect(mapStateToProps, {requestLogin})(LoginFormContainer);
