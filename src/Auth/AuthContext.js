import React, { useState, createContext, useEffect } from 'react';
import { projectAuth } from '../Firebase/config';

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const[user, setUser] = useState({});
    const[authLoading, setAuthLoading] = useState(true);

    useEffect( () => {
        // console.log("useEffect got called in authContext");
        const unsubscribe = projectAuth.onAuthStateChanged( (e) => {
            // console.log("onAuthStateChanged got called");
            if( e != null){
                setUser({
                    user: e,
                    isLogged: true
                })
                setAuthLoading(false);
            } else {
                setUser( {
                    user: null,
                    isLogged: false
                })
                setAuthLoading(false);
            }
        })
        return() => unsubscribe();
    }, [])


    return (
        <AuthContext.Provider value = {[user, authLoading]}>
            {props.children}
        </AuthContext.Provider>
    );
}