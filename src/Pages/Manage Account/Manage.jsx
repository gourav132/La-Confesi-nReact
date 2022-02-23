import React, {useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext'
import { firestore } from '../../Firebase/config';
import { useFetchCount } from '../../Hooks/useFetchCount';
import { Modal } from '../../Components'
export default function Manage() {

    const [user] = useContext(AuthContext);
    const [confessionCount, setConfessionCount] = useState();
    const [replyCount, setReplyCount] = useState();

    useEffect(()=>{
        if(user.user != null){
            firestore.collection("confessions").where("to", "==", user.user.uid).get().then( response => {
                const docs = response.docs;
                setConfessionCount(docs.length);
            })
            firestore.collection("reply").where("replyingTo", "==", user.user.uid).get().then( response => {
                const docs = response.docs;
                setReplyCount(docs.length);
            })
        }
    }, [user])

    if(user.user == null){
        return(
            <Redirect to = '/SignIn' />
        )
    }
    
    const handleModal = (btnId) => {
        document.getElementById(btnId).click();
      }

    return (
        <div className="pb-5">
            <Modal deletewarning = "true"  id = "deleteWarning"  btnId = "toggleDeleteWarning" />

            <hr className="uk-divider-icon pt-16" />
            <h1 className="uk-text-center heading md:text-4xl text-3xl">Manage your account</h1>
            <hr className="uk-divider-icon mt-10" />

            <div className="box-wrapper mx-auto w-11/12 md:w-7/12">
                <h1 className="text-3xl mb-6 font-thin text-gray-300">Change password</h1>
                <div className="uk-margin">
                    <div className="uk-inline uk-width-1-1">
                        <input className="uk-input input" type="text" placeholder="Current password" />
                    </div>
                </div>
                <div className="uk-margin">
                    <div className="uk-inline uk-width-1-1">
                        <input className="uk-input input" type="text" placeholder="New password" />
                    </div>
                </div>
                <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <input className="uk-input input" type="text" placeholder="Confirm new password" />
                </div>
                </div>
                <div>
                    {/* <button className = "manage-password-button">Update</button> */}
                    <button className = "secondary-button uk-width-1-1">Update</button>
                </div>
            </div>

            <hr className="uk-divider-icon w-11/12 md:w-7/12 mx-auto" />

            <div className = "box-wrapper font-thin mx-auto w-11/12 md:w-7/12">
                <h1 className="text-3xl mb-2 text-gray-300">Delete account :(</h1>
                <p className = "text-md text-gray-400">No. of confessions: { confessionCount }</p>
                <p className = "text-md text-gray-400 mb-1">No. of replies: { replyCount }</p>
                <div className="uk-margin">
                    <textarea className="uk-textarea input" name="" id="" cols="30" rows="9" placeholder = "Reason for leaving us...(optional)"></textarea>
                    {/* <button onClick = { () => handleModal("toggleDeleteWarning")} className="manage-delete-button">Delete</button> */}
                </div>
                    <button onClick = { () => handleModal("toggleDeleteWarning")} className="danger-button uk-width-1-1">Delete</button>
            </div>

        </div>
    )
}
