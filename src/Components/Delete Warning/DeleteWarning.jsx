// handleDeleteAccount 
// 	Firstly delete all the confessions from confession table --- done
// 	Secondly delete all the replies from reply table
// 	thirdly delete the users details from the users table 
// 	forthly delete the user from authentication section
//  and lastly redirect the user to login page

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext'
import Spinner from '../../Assets/svg/Spinner-2.svg';
import './DeleteWarning.css'
import { firestore, projectAuth } from '../../Firebase/config';

export default function DeleteWarning() {
    const history = useHistory();
    const [user] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const handleDeleteRequest = () => {
        setLoading(true);
        const uid = user.user.uid;
        firestore.collection('confessions').where("to", "==", uid).get().then(response => {
            for(var i = 0; i < response.docs.length; i++){
                response.docs[i].ref.delete();
            }

            firestore.collection('reply').where("replyingTo", "==", uid).get().then(response => {
                for(var i = 0; i < response.docs.length; i++){
                    response.docs[i].ref.delete();
                }

                firestore.collection('users').where("uid", "==", uid).get().then(response => {
                    for(var i = 0; i < response.docs.length; i++){
                        response.docs[i].ref.delete();
                    }

                    document.getElementById("close").click();
                    projectAuth.currentUser.delete().then(()=>{
                        // setLoading(false);
                        history.push('/SignIn')
                    }).catch((error) => console.log(error))
                }).catch((error) => console.log(error))
            }).catch((error) => console.log(error))
            setLoading(false);
            document.getElementById("close").click();
        }).catch((error) => console.log(error))
    }

    return (
        <div>
            <button type="button" className="btn-close hidden" id = "close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div className="uk-card uk-card-default mt-5 p-5 shadodw-2xl rounded-2xl confession-confessionBlock">
                <h1 className = "text-lg text-red-400 text-center">Are you sure you want to delete your Account</h1>
                <p className = "text-gray-400 text-center font-thin mt-3 text-lowercase">All your confessions and replies will be deleted and can't be restored back.</p>
                <div className = "button-group">
                    <button className = "delete-cancel-button text-center m-1" onClick = {()=>{ document.getElementById("close").click(); }} >
                        <spna>
                            Close
                        </spna>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg>
                        </button>
                    <button
                        className = "delete-warning-button text-center m-1"
                        onClick = {()=>{
                            handleDeleteRequest();
                        }}
                    >
                        {loading ? 
                            <>
                                <img className = "h-5 w-5 text-black text-center" src = {Spinner} alt="Loading" />
                            </>
                            :
                            <> 
                                <sapn>
                                    Delete 
                                </sapn>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </> 
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
