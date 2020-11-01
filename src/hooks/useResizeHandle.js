import React from 'react';

export const useResizeHandle = (handler, dep) => {
    React.useEffect(() => {
        window.addEventListener('resize', handler );

        return () =>  window.removeEventListener('resize', handler );
        
    }, [dep]);
};