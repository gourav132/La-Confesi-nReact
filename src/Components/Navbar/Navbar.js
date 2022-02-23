import React from 'react'
import { Link } from 'react-router-dom';
import { Sidebar } from '../';
import './Navbar.css'

export default function Navbar() {
    return (
        <div>
            <nav className="uk-navbar uk-margin uk-margin-bottom-remove mb-0 sign-in-navbar">
                <div className="uk-navbar-left">
                    <button className="uk-navbar-toggle" uk-navbar-toggle-icon="true" href="#" uk-toggle="target: #offcanvas-nav"></button>
                </div>
                <div className = "uk-navbar-left"><Link to = "/" className="uk-navbar-item navbar uk-text-uppercase">LA CONFESIóN</Link></div>
            </nav>
            <Sidebar />
        </div>
    )
}
