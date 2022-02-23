import React, { useState, useEffect } from 'react'
import { firestore } from '../../Firebase/config';
import Avatar from '../../Assets/images/avatar.jpg'
import Spinner from '../../Assets/svg/Spinner-2.svg'

export default function Reply({ modalDate, modalConfession, modalConfessionId, from, reply, replyToConfession }) {
    // console.log(replyToConfession)
    const [ replyInput, setReplyInput ] = useState("");
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    const [ replyStatus, setReplyStatus ] = useState(true);
    const [ incomingReply, setIncomingReply ] = useState(reply);

    useEffect(() => {
        setIncomingReply(reply);
    }, [reply])

    useEffect(() => { 
        if(incomingReply === null){
            setReplyStatus(false);
        } else{
            setReplyStatus(true);
        }
    }, [incomingReply])

    const handleReply = () => {
        setLoadingStatus(true);
        const outgoingReply = {
            confessionId: modalConfessionId,
            reply: replyInput,
            replyingTo: from
        }
        firestore.collection("reply").add(outgoingReply)
        .then(reponse => {
            setIncomingReply(replyInput);
            setLoadingStatus(false)
        })
    }


    return (
        <div>
            <div className="uk-card uk-card-default mt-5 shadodw-2xl rounded-2xl confession confessionBlock">
                <div className="uk-card-header">
                    <div className="uk-grid-small uk-flex-middle" uk-grid="ture">
                        <div className="">
                            <img className="uk-border-circle" width="45" height="45" src= { Avatar } alt = "Avatar"/>
                        </div>
                        <div className="uk-width-expand grid-span-3">
                            <h3 className="uk-margin-remove-bottom title">Anonymous</h3>
                            <p className="uk-text-meta uk-margin-remove-top message">{ modalDate }</p>
                        </div>
                        <div className = "uk-card-media-right">
                            <button type = "button" data-bs-dismiss="modal" aria-label="Close">
                                <span className="mt-4" uk-icon="icon: close"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="uk-card-body">
                    <p className="message" style = {{overflowwrap:" break-word"}}>{ modalConfession }</p>
                </div>

                {replyStatus ?
                <div className="uk-card-footer">
                    <h1 className = "text-xl text-gray-300 font-thin">Your Reply</h1>
                    <p className = "text-gray-400 font-thin m-2">{ incomingReply }</p>
                </div>
                :
                <div className="uk-card-footer">
                    <div className="uk-margin">
                        <textarea onChange = { e => setReplyInput(e.target.value)} id = "reply" className="uk-textarea contact-input" rows="5" placeholder="Your reply..."></textarea>
                    </div>
                    <div className="">
                        <button onClick = { handleReply } className="rounded-lg uk-button uk-button-secondary confess-submit uk-width-1-1" style = {{ display: "flex", justifyContent: "center" }}>
                        {loadingStatus ?
                        <img className = "h-5 w-5 m-2 text-black" src = {Spinner} alt = "loading"/> :
                            <>
                            Send
                            </>
                    }
                        </button>
                    </div>
                </div>
                }



            </div>
        </div>
    )
}
