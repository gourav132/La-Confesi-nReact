import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../../Assets/images/avatar.jpg'
import './SharingModal.css';


export default function SharingModal({ shareConfession, setShareConfession }) {

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setShareConfession(null);
        }
    }

    return (
        <motion.div 
            initial = {{ opacity: 0 }} 
            animate = {{ opacity: 1 }}  
            exit = {{ opacity: 0 }}
            className='backdrop'
            onClick={ handleClick }
        >
            <motion.div 
                initial = {{ y: "-100vh" }} 
                animate = {{ y: 0 }} 
                exit={{ y: "-100vh"}} 
                className="uk-card uk-card-default md:w-5/12 w-11/12 mt-5 shadodw-2xl rounded-2xl confession confessionBlock"
            > 
                <div className="uk-card-header">
                    <div className="uk-grid-small uk-flex-middle" uk-grid="ture">
                        <div className="">
                            <img className="uk-border-circle" width="45" height="45" src = { Avatar } alt = "Avatar"/>
                        </div>
                        <div className="uk-width-expand grid-span-3">
                            <h3 className="uk-margin-remove-bottom title">Anonymous</h3>
                            <p className="uk-text-meta uk-margin-remove-top message">{ shareConfession.date }</p>
                        </div>
                        <div className = "uk-card-media-right">
                            <button type = "button" onClick = { () => setShareConfession(null)}>
                                <span className="mt-4" uk-icon="icon: close"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="uk-card-body">
                    <p className="message" style = {{overflowwrap:" break-word"}}>{ shareConfession.confession }</p>
                </div>

            </motion.div>
        </motion.div>
    )
}
