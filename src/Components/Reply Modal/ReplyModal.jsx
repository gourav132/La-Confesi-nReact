import React from 'react'
import Avatar from '../../Assets/images/avatar.jpg'
import { motion } from 'framer-motion';
import style from './replyStyle.module.css';

// setReplyToConfession({
//     confessionId: details.confessionId,
//     confession: details.confession,
//     date: details.date,
//     from: details.from,
//     Reply: null
// });

export default function ReplyModal({ replyToConfession, setReplyToConfession }) {

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setReplyToConfession(null);
        }
    }
    
    return (
        <motion.div 
            className = 'backdrop' 
            onClick = { handleClick }
            initial = {{ opacity: 0 }}
            animate = {{ opacity: 1 }}
            exit = {{ opacity: 0 }}
        >
            <motion.div 
                className="uk-card uk-card-default mt-5 md:w-5/12 w-11/12 shadodw-2xl rounded-2xl confession confessionBlock"
                initial = {{ y: '-100vh' }}
                animate = {{ y: 0 }}
                exit = {{ y: '-100vh' }}
            >
                <div className="uk-card-header">
                    <div className="uk-grid-small uk-flex-middle" uk-grid="ture">
                        <div className="hidden">
                            <img className="uk-border-circle" width="45" height="45" src= { Avatar } alt = "Avatar"/>
                        </div>
                        <div className="uk-width-expand grid-span-3">
                            <h3 className = {`${style.title} uk-margin-remove-bottom title`}>Anonymous -{'>'} </h3>
                            <p className="uk-text-meta uk-margin-remove-top message">{ replyToConfession.date }</p>
                        </div>
                        <div className = "uk-card-media-right">
                            <button type = "button" onClick={ () => setReplyToConfession(null)}>
                                <span className="mt-4" uk-icon="icon: close"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="uk-card-body">
                    <p className = { style.message } style = {{overflowwrap:" break-word"}}>{ replyToConfession.confession }</p>
                </div>

                { replyToConfession.Reply ?
                <>
                    <div className="uk-card-footer">
                        <h1 className = { style.title }>Your Reply -{'>'} </h1>
                        <p className = { `${style.message} mt-4` }>{ replyToConfession.Reply }</p>
                    </div>
                </>
                    :
                    <div className="uk-card-footer">
                        <div className="uk-margin">
                            <textarea  id = "reply" className={`uk-textarea ${style.textarea} `} rows="5" placeholder="Your reply..."></textarea>
                        </div>
                        <div className="">
                            <button className="rounded-lg uk-button uk-button-secondary confess-submit uk-width-1-1" style = {{ display: "flex", justifyContent: "center" }}>
                                SEND
                            </button>
                        </div>
                    </div>
                }
            </motion.div>
        </motion.div>
    )
}
