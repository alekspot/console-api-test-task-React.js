import React from 'react';
import Split from 'react-split';
const SplitView = ({children}) => {
    const size = React.useMemo(() => {
        const sizes = localStorage.getItem('split-sizes');
        
        return sizes ? JSON.parse(sizes) : [50, 50];
    }, []);

    return <Split
        className={'split-view'}
        sizes={size}
        direction="horizontal"
        cursor="col-resize"
        gutter={(index, direction) => {
            const gutterWrap = document.createElement('div');
            gutterWrap.className = `split-view__gutter gutter-${direction}`;
            gutterWrap.innerHTML = '<span class="split-view__gutter-icon action"></span>';

            return gutterWrap;
        }}
        onDragEnd={(sizes) => {
            localStorage.setItem('split-sizes', JSON.stringify(sizes));
        }}
    >
        {React.Children
            .toArray(children)
            .map((child, index) => <div className="split-view__item" key={index}>{child}</div>)} 
    </Split>;
};

export default SplitView;