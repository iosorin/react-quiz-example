import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '@/redux/actions/auth';

const Logout: FC<any> = (props) => {
    useEffect(() => {
        props.logout();
    }, []);

    return <Redirect to={'/'} />;
};

function mapDispatchToProps(dispatch: any) {
    return {
        logout: () => dispatch(logout()),
    };
}

export default connect(null, mapDispatchToProps)(Logout);
