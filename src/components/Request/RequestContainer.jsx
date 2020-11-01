import React from 'react';
import {connect} from 'react-redux';
import {setRequest} from '../../redux/actions';
import {Field} from '../Field';

const RequestContainer = ({setRequest, value, isError}) => {
    
    const onChange = (e) => {
        setRequest(e.target.value);
    };

    return <Field label="Запрос" value={value} onChange={onChange} isError={isError}/>;
};


const mapStateTopProps = ({requestState}) => ({
    value: requestState.request.value,
    isError: requestState.request.isError
});

export default connect(mapStateTopProps, {setRequest})(RequestContainer);
