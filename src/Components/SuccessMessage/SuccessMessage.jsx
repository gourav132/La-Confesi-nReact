import React from 'react'
import { Link } from 'react-router-dom';

export default function SuccessMessage() {
    return (
        <div className='backdrop'>
            <button type="button" className="btn-close hidden" id = "close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div 
                className="uk-card uk-card-default mt-5 p-5 md:w-5/12 w-11/12 shadodw-2xl rounded-2xl confession confessionBlock">
            
            <h1 className = "text-lg modal-message text-green-300 text-center">CONFESSION SENT</h1>
            <p className = "text-gray-400 text-center font-thin mt-3 text-lowercase">
                Found it interesting to confess to someone without being recognised create your very own La Confesion account and let your friends confess to you anonymously.
                {/* FOUND IT INTERESTING TO CONFESS TO SOMEONE WITHOUT BEING RECOGNISED CREATE YOUR VERY OWN LA CONFESION ACCOUNT AND LET YOUR FRIENDS CONFESS TO YOU ANONYMOUSLY*/}
                </p>
            <Link
                onClick = {()=>{
                    document.getElementById("close").click();
                }}
                to = "/SignUp" 
                className = "uk-button uk-width-1-1 modal-button">Sign Up</Link>
            </div>
        </div>
    )
}
