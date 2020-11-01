import React, {useRef} from 'react';
import Dropdown from '../Dropdown/Dropdown';
import {connect} from 'react-redux';
import {clearHistory, performRequest, removeRequest, selectRequest} from '../../redux/actions';
import IconClose from './IconClose';


const History = ({history, performRequest, removeRequest, clearHistory, selectRequest}) => {

    const setDropdown = (request) => {
        
        const icon = <div className={`icon-status icon-status--${request.isError ? 'red' : 'green'}`}></div>;  
        const label = request.req['action'];
        const options = [
            {
                label: 'Выполнить',
                action: () => performRequest(request.req),
                className: 'dropdown__action--blue',
            },
            {
                label: 'Скопировать',
                action: () => navigator.clipboard.writeText(JSON.stringify(request.req)),
                className: 'dropdown__action--blue',
                msg: 'Скопировано'
            },
            {
                label: 'Удалить',
                action: () => removeRequest(request.id),
                className: 'dropdown__action--red'
            }
        ];

        const onClick = () => {
            selectRequest(request);
        };

        return {label, options, icon, onClick};
        
    };

    const ref = useRef(null);

    const onWheel = (e) => {
        ref.current.scrollLeft += e.deltaY;
    };

    return (
        <div className="history">
            <div ref={ref} className="history__items horizontal-scroll-wrapper" onWheel={onWheel}>
                {history.map((item, index) =>  <Dropdown className="history__item" {...setDropdown(item)} key={index}/>)}
            </div>
            <button className="history__btn btn" onClick={() => clearHistory()}>
                <IconClose/>
            </button>
        </div>
    );
};

const mapStateTopProps = ({requestState}) => ({
    history: requestState.history
});

export default connect(mapStateTopProps, {performRequest, removeRequest, clearHistory, selectRequest})(History);