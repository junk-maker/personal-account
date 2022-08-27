import React from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    return (
        <>
            {localStorage.getItem('access') ? children : <Navigate to={'/'}/>}
        </>
    );
};

export default ProtectedRoute;