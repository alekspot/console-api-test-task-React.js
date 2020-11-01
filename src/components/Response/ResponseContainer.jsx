import {Field} from '../Field';
import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {Format} from '../../utils';

const ResponseContainer = ({value, isError}) => {
    const formatValue = value ? Format.formatJSON(value) : '';

    const onChange = useCallback(() => {}, []);
    
    return <Field 
        label="Ответ" 
        value={formatValue}
        onChange={onChange}
        isError={isError}
    />;
};

const mapStateTopProps = ({requestState}) => ({
    value: requestState.response.value,
    isError: requestState.response.isError
});

export default connect(mapStateTopProps)(ResponseContainer);