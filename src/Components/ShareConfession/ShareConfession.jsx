import React from 'react'
import Avatar from '../../Assets/images/avatar.jpg'

export default function ShareConfession({modalDate, modalConfession, reply}) {
    return (
        <div>
            <div className="uk-card uk-card-default mt-5 shadodw-2xl rounded-2xl confession-confessionBlock">
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
                            {/* { reply ? 
                            <button type = "button">
                                <span className="mt-4 mr-6" uk-icon="icon: reply"></span>
                            </button> : <></> } */}
                            <button type = "button" data-bs-dismiss="modal" aria-label="Close">
                                <span className="mt-4" uk-icon="icon: close"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="uk-card-body">
                    <p className="message" style = {{overflowwrap:" break-word"}}>{ modalConfession }</p>
                </div>
            </div>
        </div>
    )
}
