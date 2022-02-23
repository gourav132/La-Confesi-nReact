import React from 'react'
import { SharingModal } from '..';
import Avatar from '../../Assets/images/avatar.jpg';
import style from './ConfessionBlockStyle.module.css'

export default function ConfessionBlock({ checkForReply, details, setShareConfession }) {
    return (
        <div>
            <div className = { `uk-card uk-card-default mt-5 rounded-2xl md:w-11/12 w-11/12 ${ style.confessionBlock }`} >
                <div className="uk-card-header">
                    <div className="uk-grid-small uk-flex-middle" uk-grid="ture">
                        <div className="">
                            <img className="uk-border-circle" width="45" height="45" src= { Avatar } alt = "Avatar"/>
                        </div>
                        <div className="uk-width-expand grid-span-3">
                            <h3 className={`uk-margin-remove-bottom ${style.subHeading}`}>Anonymous</h3>
                            <p className="uk-text-meta uk-margin-remove-top sub-sub-heading">{ details.date }</p>
                        </div>
                        <div className = "uk-card-media-right">
                            { details.reply ? 
                            <button type = "button" 
                                onClick = { () => {
                                    checkForReply(details);
                                }}    
                            >
                                <span className="mt-4 mr-6" uk-icon="icon: reply"></span>
                            </button> : <></>}

                            <button onClick = {() => {
                                setShareConfession(details);
                            }}>
                                <span className="mt-4" uk-icon="icon: social"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="uk-card-body">
                    <p className={ style.confession } style = {{overflowwrap:" break-word"}}>{ details.confession }</p>
                </div>
            </div>
            {/* <hr className="uk-divider-icon md:w-9/12 w-11/12 mx-auto"  style = {{marginBottom: "25px"}}/> */}

        </div>
        
    )
}
