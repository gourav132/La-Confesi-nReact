import React from 'react';
import Styles from './Login.module.css';

export default function Login() {
    return (
        <div className='grid grid-cols-2'>
            <div>
                <h1 className = { Styles.logo }>La Confesion</h1>
                <div className = {`grid content-center items-center ${Styles.wrapper}`}>
                    <h1 className = {Styles.greetings}>Welcome! back</h1>
                    <p className = { Styles.subHeading }>Login with your La Confesion account</p>

                    <div className = { Styles.inputWrapper }>
                        <div>
                            <label className = { Styles.label } htmlFor="email">Email</label>
                            <br />
                            <input className = { Styles.input } type="email" id='email'/>
                        </div>
                        <div className='mt-6'>
                            <label className = { Styles.label } htmlFor="password">Password</label>
                            <br />
                            <input className = { Styles.input } type="password" id='password'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className = { Styles.leftImage }></div>
        </div>
    )
}
