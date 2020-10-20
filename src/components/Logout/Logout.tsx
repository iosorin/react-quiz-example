import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteProps } from 'react-router-dom';
import { actions } from '@/store/actions/auth';

type Props = RouteProps & {
    logout: () => void;
};

const Logout: FC<Props> = (props) => {
    useEffect(() => {
        props.logout();
    }, []);

    return <Redirect to={'/'} />;
};

// const connector = connect(null, { logout });
// type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect<null, Props, RouteProps>(null, { logout: actions.logout })(Logout);
