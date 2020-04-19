import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers';

const AdminRoute = ({ component: Component, ...rest }) => {

    let checkAuth = isAuth();
    if(checkAuth){
        checkAuth = JSON.parse(checkAuth);
    }

    return (
        <Route
            {...rest}
            render={
                (props) => checkAuth && checkAuth.role === 'admin' ?
                 <Component {...props} /> :
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
            }
        />
    )
}

export default AdminRoute;