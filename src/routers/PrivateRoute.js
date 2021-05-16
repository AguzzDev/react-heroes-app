import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    Authenticated,
    component: Component,
    ...rest
}) => {
    localStorage.setItem("lastPath", rest.location.pathname)

    return (
        <Route {...rest}
            component={(props) => (
                (Authenticated)
                    ? <Component {...props} />
                    : <Redirect to="/login" />

            )}
        />

    )
}

PrivateRoute.propTypes = {
    Authenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
