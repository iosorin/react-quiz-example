import React, { FC } from 'react';
import Button from '../Button/Button';
import classes from './Modal.module.scss';

type Props = {
    isOpen: boolean;
    name?: string;
    submitLabel?: string;
    closeLabel?: string;
    onClose?: () => void;
    onSubmit?: () => void;
};

const Modal: FC<Props> = ({
    isOpen,
    name = 'Modal Name',
    submitLabel = 'save',
    closeLabel = 'close',
    onClose,
    onSubmit,
    children,
}) => {
    return isOpen ? (
        <div className={classes.Modal}>
            <div className={classes.overlay} />
            <div className={classes.inner}>
                <div className={classes.head}>
                    {name && <h4 className={classes.name}>{name}</h4>}

                    <div className={classes.close}>
                        <i className={'fa fa-close'} />
                    </div>
                </div>

                <div className={classes.content}>{children}</div>

                <div className={classes.buttons}>
                    <Button onClick={onSubmit} type="success">
                        {submitLabel}
                    </Button>

                    <Button onClick={onClose}>{closeLabel}</Button>
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;
