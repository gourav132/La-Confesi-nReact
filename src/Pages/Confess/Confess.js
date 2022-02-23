import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext';

import { Modal } from '../../Components';
import SuccessMessage from '../../Components/SuccessMessage/SuccessMessage';
import Spinner from '../../Assets/svg/Spinner.svg';
import useUserValidate from '../../Hooks/useUserValidate';

import { handleConfession, toggleModal } from './ConfessLogic';

export default function Confess(props) {
    // currently signed in use
    const [user] = useContext(AuthContext);
    const [username] = useState(props.match.params.username);
    const {loadingUser, isPresent, toUser, toUid} = useUserValidate(username);

    const[confession, setConfession] = useState("");
    const[reply, setReply] = useState(false);
    const[fromId, setFromId] = useState("Anonymous");
    const[errorMessage, setErrorMessage] = useState("");
    
    return (
        <div>
            { loadingUser ? 
            <>
                <div className = "flex justify-center flex-wrap content-center" style = {{minHeight: "75vh"}}>
                    <div> <img className = "h-20 w-20" src = { Spinner } alt = "Loading" /> </div>
                </div>  
            </> 
            :
            <>
                { isPresent ? 
                <>
                <SuccessMessage />
                <Modal 
                    signin = "true" 
                    id     = "signIn" 
                    btnId  = "toggleSignIn" 
                />
                <Modal 
                    successmessage = "true" 
                    id             = "successMessage" 
                    btnId          = "toggleSuccessMessage" 
                />

                <hr className="uk-divider-icon mt-6" />
                <h2 className="uk-text-center text-4xl p-4 heading" style = {{lineHeight: "1.2"}}>Wanna confess somthing to { toUser }?</h2>
                <p className="uk-text-center uk--uppercase sub-heading text-lg">confess here</p>
                <hr className="uk-divider-icon mb-6" />

                <div>
                    <div className="uk-container">
                    <div className = "text-center mb-6 text-red-700">{ errorMessage }</div>
                        <form>
                            <textarea onChange = { (e) => { setConfession(e.target.value); setErrorMessage(""); }} className="uk-textarea input" style = {{borderRadius: "12px"}} cols="20" rows="10" placeholder="Your Confession..."></textarea>
                            { user.isLogged ? 
                            <p className= "uk-margin-top">
                                <input onChange = { (e) => setReply(e.target.checked)} id="reply" className= "uk-checkbox" type="checkbox" /> <label for = "reply" className = " ml-2 sub-heading">Want to get reply for this confession?</label>
                            </p> :
                            <p className= "uk-margin-top">
                                <button type = "button" className = "sub-heading" onClick = { toggleModal }>Sign In to get reply for your confession </button>
                            </p> }
                            <br />
                            <button 
                                onClick = {() => {
                                    handleConfession(user, setFromId, confession, fromId, toUid, reply, setErrorMessage)
                                }} 
                                type = "button"  
                                className="secondary-button uk-width-1-1"
                            >
                                SEND YOUR CONFESSION
                            </button>
                        </form>
                    </div>
                </div>
                </>
                : 
                <>
                <hr className="uk-divider-icon mt-6" />
                <h2 className="uk-text-center uk-text-uppercase text-4xl p-4">User not found</h2>
                <hr className="uk-divider-icon mb-6" />
                </>
                } 
            </>
            }

        </div>
    )
}
