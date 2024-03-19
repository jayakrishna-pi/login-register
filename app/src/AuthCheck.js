import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';
import Cookie from 'js-cookie';

const AuthCheck = () => {
    const token = Cookie.get('token')
    return(
        token ? <Outlet /> : <Navigate to='/login' />
    )
};

export default AuthCheck;
