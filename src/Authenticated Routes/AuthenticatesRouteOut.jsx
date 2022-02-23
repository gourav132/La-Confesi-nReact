import React from 'react';
import { Redirect, Route } from 'react-router';

export default function AuthenticatedRouteOut(props) {
    // Check if there is any user logged in or not
    let userLoggedIn = false;
    if(sessionStorage.getItem('userInfo')){
        userLoggedIn = true;
    }
    return (
        <div>
            { userLoggedIn ? <Redirect to = '/Confession' /> : <Route path = { props.path } component = { props.component } />}
        </div>
    )
}