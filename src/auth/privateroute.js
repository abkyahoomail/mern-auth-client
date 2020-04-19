import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers';

const PrivateRoute = ({ children, ...rest }) => {

    return (
        <Route
            {...rest}
            render={
                (props) => isAuth() ? children :
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
            }
        />
    )
}

export default PrivateRoute;