import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteProps } from 'react-router-dom';
import { actions } from '@/store/actions/auth';

type Props = RouteProps & {
    logout: () => void;
};

const Logout: FC<Props> = (props) => {
    useEffect(() => {
        console.log('LOGOUT');
        props.logout();
    }, []);

    return <Redirect to={'/'} />;
};

// type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect<null, Props, RouteProps>(null, { logout: actions.logout });

export default connector(Logout);
