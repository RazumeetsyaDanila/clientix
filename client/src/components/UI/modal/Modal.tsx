import classes from './modal.module.scss'
import React from 'react';
import closeBtn from '../../../img/close-min.png'

const Modal: React.FC<any> = ({children, visible, setVisible}) => {
    const rootClasses = [classes.modal]
    if(visible) rootClasses.push(classes.active)

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
            <img src={closeBtn} alt="..." className='fixed top-[30px] right-[30px] w-[40px] cursor-pointer'/>
        </div>
    );
};

export default Modal;