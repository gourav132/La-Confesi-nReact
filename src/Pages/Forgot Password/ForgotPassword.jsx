import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ForgotPasswordStyles.module.css';

export default function ForgotPassword() {

    return (
        <div className = { styles.wrapper }>
            <h1 className = { styles.heading }>Trouble Logging In?</h1>
            <p className = { styles.subHeading }>Enter your email, phone, or username <br/>  and we'll send you a link to get <br /> back into your account.</p>
            <form action="">
                <input type="text" placeholder='Email'/>
                <button>SEND</button>
            </form>
        </div>
    )
}