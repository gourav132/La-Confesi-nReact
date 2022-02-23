import React from 'react'
import SignIn from '../SignIn/SignIn'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import ShareConfession from '../ShareConfession/ShareConfession'
import Reply from '../Reply/Reply'
import DeleteWarning from '../Delete Warning/DeleteWarning.jsx'

export default function Modal({signin, successmessage, shareconfesion, replyconfession, deletewarning, id, btnId, modalDate, modalConfession, modalConfessionId, reply, from }) {
    return (
        <div>
            <div className = "">
            <div className="">
            <div className="modal fade" id= {id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-2xl" style = {{backgroundColor: "#fff0"}}>

                        {/* +++++ Dynamic content goes here ++++++ */}
                        { signin ? <SignIn /> : <></> }
                        { shareconfesion ? <ShareConfession modalDate = { modalDate } modalConfession = { modalConfession }/> : <></>}
                        { successmessage ? <SuccessMessage /> : <></> }
                        { deletewarning ? <DeleteWarning /> : <></> }
                        { replyconfession ? <Reply modalDate = { modalDate } modalConfession = { modalConfession } modalConfessionId = { modalConfessionId } from = { from } reply = { reply }/> : <></>}
                        
                    </div>
                </div>
            </div>
            </div>
            </div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary hidden" id = { btnId } data-bs-toggle="modal" data-bs-target= { '#'+ id }>
            Launch demo modal
            </button>
        </div>
    )
}
