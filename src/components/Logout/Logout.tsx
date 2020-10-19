import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '@/redux/actions/auth';

const Logout: FC<PropsFromRedux> = (props) => {
    useEffect(() => {
        props.logout();
    }, []);

    return <Redirect to={'/'} />;
};

const mapDispatch = {
    logout,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Logout);
