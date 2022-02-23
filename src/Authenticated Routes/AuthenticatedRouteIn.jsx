import React from 'react';
import { Redirect, Route } from 'react-router';

export default function AuthenticatedRouteIn(props) {
    // Check if there is any user is logged in or not
    let userLoggedIn = false;
    if(sessionStorage.getItem('userInfo')){
        userLoggedIn = true;
    }
    return (
        <div>
            { userLoggedIn ? <Route path = { props.path } component = { props.component } /> : <Redirect to = '/SignIn' />}
        </div>
    )
}
