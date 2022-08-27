import React, {MouseEvent, TransitionEvent} from 'react';
import Portal from '../../../portal/Portal';
import useValue from '../../../hooks/value-popup-hook';

interface ContactPopupProps {
    onClose: () => void;
    children: React.ReactNode;
};

const ContactPopup = ({onClose, children}: ContactPopupProps) => {
    const {value, setValue} = useValue();

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setValue('out');
    };
    
    const transitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
        e.persist();
        if (e.propertyName !== 'opacity' || value === 'in') return;

        if (value  === 'out') onClose();
    };

    return(
        <Portal>
            <div
                className={`contact-popup value-${value}`}
                onTransitionEnd={transitionEnd}
            >
                <div className={'contact-popup-container'} onClick={e => e.preventDefault()}>
                    <div className={'contact-popup-content'}>
                        {children}
                    </div>
                </div>
                <div
                    onMouseDown={handleClick}
                    className={'contact-popup-background'}
                />
            </div>
        </Portal>
    );
};


export default ContactPopup;