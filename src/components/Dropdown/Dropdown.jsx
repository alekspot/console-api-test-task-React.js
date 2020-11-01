import React, {useCallback} from 'react';
import {useOutsideClickHandler} from '../../hooks/useOutsideClickHandler';
import * as cn from 'classnames';
import {CSSTransition} from 'react-transition-group';
import {useResizeHandle} from '../../hooks/useResizeHandle';

const Dropdown = ({label, options, icon, onClick, className}) => {

    const [isOpen, setOpen] = React.useState(false);

    const [showMsg, setShowMsg] = React.useState(false);
    const [msgText, setMsgText] = React.useState('');

    const closeMenu = (msgText) => {
        if (msgText) {
            setShowMsg(true);
            setMsgText(msgText);
        }
        setOpen(false);
    };
    
    const [ref] = useOutsideClickHandler(closeMenu);

    const onClickMenu = () => {
        setOpen(true);
    };

    const onClickLabel = () => {
        if (onClick) {
            onClick();
        } 
    };

    const dropdownClass = cn('dropdown', className);

    return (
        <div ref={ref} className={dropdownClass}>
            <div className="dropdown__placeholder">
                <div className="dropdown__btn" onClick={onClickLabel}>
                    <div className="dropdown__icon dropdown__icon--left">
                        {icon}
                    </div>
                    <div className="dropdown__label">{label}</div>
                </div>

                <div onClick={onClickMenu} className="dropdown__icon dropdown__icon--right">
                    <span className="action"></span>
                </div>
            </div>
            <CSSTransition 
                timeout={600} 
                in={showMsg} 
                classNames="dropdown__msg"
                onEntered={() => setShowMsg(false)}
                onExited={() => setMsgText('')}
            > 
                <span className="dropdown__msg">{msgText}</span>
            </CSSTransition>
            {isOpen && <DropdownMenu closeMenu={closeMenu} options={options} dropdownRef={ref}/>}
        </div>);
};

const DropdownMenu = (props) => {
    const [initMenuCoords, setInitMenuCoords] = React.useState({
        height: null,
        bottom: null
    });
   
    const [style, setStyle] =  React.useState({
        top: 'auto',
        left: 'auto'
    });

    const [openMenuTop, setOpenMenuTop] = React.useState(false);

    const menuRef = React.useRef();
    const itemRef = React.useRef();

    useResizeHandle(() => calcMenuPosition(initMenuCoords), [initMenuCoords]);
        
    const calcMenuPosition = useCallback((menuCoords) => {
        const windowHeight = document.documentElement.clientHeight;
        const dropdownBtnCoords = props.dropdownRef.current.getBoundingClientRect();

        const dropdownBtnHeight = dropdownBtnCoords.height;
        const dropdownBtnTop = dropdownBtnCoords.top;
        const dropdownBtnBottom = dropdownBtnCoords.bottom;
        const dropdownBtnLeft = dropdownBtnCoords.x;

        const isOpenTop = windowHeight < menuCoords.bottom + dropdownBtnHeight;
        const isOpenRow = ((dropdownBtnHeight + menuCoords.height) > dropdownBtnTop);

        const menuItemHeight = itemRef.current.getBoundingClientRect().height;

        if (isOpenTop) {
            setStyle({
                top: isOpenRow ? dropdownBtnTop - menuItemHeight - 10 : dropdownBtnTop - menuCoords.height + 10,
                left: dropdownBtnLeft,
                display: isOpenRow ? 'flex' : 'block'
            });
            setOpenMenuTop(true);
        } else {
            setOpenMenuTop(false);
            setStyle({
                top: dropdownBtnBottom,
                left: dropdownBtnLeft,
                display: 'block'
            });
        }
    },[initMenuCoords]);
    
    React.useLayoutEffect(() => {
        const {height, bottom} = menuRef.current.getBoundingClientRect();

        calcMenuPosition({height,bottom});
        setInitMenuCoords({height, bottom});

    },[]);


    const handleClickAction = (action, msg) => () => {
        action();
        props.closeMenu(msg);
    };
   
    const menuClass = cn('dropdown__menu', {'dropdown__menu--top': openMenuTop});
    const actionClass = (className) => cn('dropdown__action', className);

    return (
        <ul className={menuClass} ref={menuRef} style={style}>
            {props.options.map(({label, action, className, msg}, key) => 
                <li key={key} className="dropdown__item">
                    <div ref={itemRef} className={actionClass(className)} onClick={handleClickAction(action, msg)}>
                        {label}
                    </div>  
                </li>
            )}
        </ul>
    );
};


export default Dropdown;