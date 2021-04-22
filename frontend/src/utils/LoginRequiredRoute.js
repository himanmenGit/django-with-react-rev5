import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAppContext} from "store"

const LoginRequiredRoute = ({component: Component, ...kwargs}) => {
    const {store: {isAuthenticated}} = useAppContext();
    return (
        <Route {...kwargs} render={props => {
            if (isAuthenticated) {
                return <Component {...props} />
            } else {
                return <Redirect to={{pathname: "/accounts/login", state: {from: props.location}}} />
            }
        }}/>
    )
}

export default LoginRequiredRoute

