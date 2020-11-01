import * as React from 'react';

export const useOutsideClickHandler = (cb) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        
        function handleClickOutside(event) {
            if (cb && ref.current && !ref.current.contains(event.target)) {
                cb();
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
       
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return [ref];
};
