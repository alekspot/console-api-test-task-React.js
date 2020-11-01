import React from 'react';
import * as cn from 'classnames';

export const Field = ({value, isError, onChange, label}) => {
    
    const className = cn(
        'field',
        {
            'field--error': isError
        }
    );
    
    const labelClass = cn(
        'label',
        {
            'label--error': isError
        }
    );

    return (
        <>
            <span className={labelClass}>{label}</span>
            <textarea value={value} className={className} onChange={onChange}/>
        </>
    );
};