import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { projectAuth } from '../../Firebase/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AuthContext } from '../../Auth/AuthContext';
import './Sidebar.css';

export default function Sidebar() {

    const[ url, setUrl ] = useState("");
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const [user] = useContext(AuthContext);

    const handleLogout = () => {
        sessionStorage.clear();
        userInfo = null;
        projectAuth.signOut();
    }

    const handleCopy = () => {
        alert("Social media link copied to clipboard");
    }

    return (
        <div>
            <div id="offcanvas-nav" uk-offcanvas="overlay: true">
                <div className="uk-offcanvas-bar sidebar">
                    <ul className="uk-nav uk-nav-default">
                        <li className="uk-nav-header">Menu</li>
                        {/* <li className = "uk-margin"> <NavLink activeStyle={{ color:'#00b894' }} id = "/" to="/" style = {{display: "flex"}}> <span className="uk-margin-small-right" uk-icon = "icon: home"></span>Home</NavLink></li> */}
                        <li className = "uk-margin"> <NavLink activeStyle={{ color:'#00b894' }} to="/Confession" style = {{display: "flex"}}><span className="uk-margin-small-right" uk-icon="icon: comments"></span> Confessions</NavLink></li>
                        <li className = "uk-margin"> <NavLink activeStyle={{ color:'#00b894' }} to="/Confess" style = {{display: "flex"}}> <span className="uk-margin-small-right" uk-icon="icon: commenting"></span> Confess</NavLink></li>
                        <li className = "uk-margin"> <NavLink activeStyle={{ color:'#00b894' }} to="/Reply" style = {{display: "flex"}}> <span className="uk-margin-small-right" uk-icon="icon: reply"></span> Replies</NavLink></li>
                        <li className = "uk-margin"> <NavLink activeStyle={{ color:'#00b894' }} to="/Contact" style = {{display: "flex"}}> <span className="uk-margin-small-right" uk-icon="icon: receiver"></span> Contact</NavLink></li>
                        <li className="uk-nav-divider"></li>
                        <li className="uk-nav-header">Account</li>
                        { (user.user == null) ? 
                        <>
                            <li className = "uk-margin"><NavLink activeStyle={{ color:'#00b894' }} id = "/SignIn" to="/SignIn" style = {{display: "flex"}}> <span className="uk-margin-small-right" uk-icon="icon: sign-in"></span> Sign In</NavLink></li>
                            <li className = "uk-margin"><NavLink activeStyle={{ color:'#00b894' }} id = "/SignUp"to="/SignUp" style = {{display: "flex"}}><span className="uk-margin-small-right" uk-icon="icon: sign-out"></span> Sign Up</NavLink></li>
                        </>
                        :
                        <>
                            <li className = "uk-margin"><NavLink activeStyle={{ color:'#00b894' }} id = "/Manage" to="/Manage" style = {{display: "flex"}}><span className="uk-margin-small-right" uk-icon="icon: cog"></span> Manage Account</NavLink></li>
                            <li className = "uk-margin"><button style = {{display: "flex",  color: "#a5a5a5"}} onClick = { handleLogout }><span className="uk-margin-small-right" uk-icon="icon: sign-out"></span> Logout</button></li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-nav-header">Social Media Link</li>
                            <li className = "uk-margin">
                                <CopyToClipboard text = {String(url)} onCopy = {handleCopy}>
                                    <button style={{display: "flex", color: "#a5a5a5"}}>
                                        <span className="uk-margin-small-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        </span>
                                        Click to copy link
                                    </button>
                                </CopyToClipboard>
                            </li>
                        </>
                        }
                        <li className="uk-nav-divider"></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
