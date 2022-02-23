import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useFetchConfession from '../../Hooks/useFetchConfession';
import { AnimatePresence } from 'framer-motion';
import { ReplyModal, SharingModal, ConfessionBlock } from '../../Components';
import './Confession.css'
import Spinner from '../../Assets/svg/loading.svg';
import getReplyDetails from './functions';

export default function Confession() {

    const [ shareConfession, setShareConfession ] = useState(null);
    const [ replyToConfession, setReplyToConfession ] = useState(null);
    const { confessionData, confessionLoading, name, user, authLoading } = useFetchConfession();

    if(authLoading === false){
        if(user.user == null){
            return(
                <Redirect to = "/SignIn" />
            );
        }
    }

    const checkForReply = (details) => {
        getReplyDetails(details).then(response => {
            setReplyToConfession(response);
        });
    }

    return (
        <div className = "body">
            { authLoading ?
            <div className = "flex justify-center flex-wrap content-center" style = {{minHeight: "75vh"}}>
                <div> <img className = "h-12 w-12" src = { Spinner } alt = "Loading" /> </div>
            </div>
            :
            <>
            <AnimatePresence>
                { shareConfession && <SharingModal shareConfession = { shareConfession } setShareConfession = { setShareConfession } /> }
                { replyToConfession && <ReplyModal replyToConfession = {replyToConfession} setReplyToConfession = { setReplyToConfession }/> }
            </AnimatePresence>
            <div className = "confession">
                <hr className="uk-divider-icon pt-16 mb-0" />
                <h1 className="uk-text-center text-3xl md:text-4xl p-4 heading">Hola, { name }</h1>
                <hr className="uk-divider-icon mt-6" />
                <div>
                    <h1 className = "text-center pb-6 md:pt-6 md:pb-12 text-xl md:text-3xl sub-heading font-thin" >Your confessions</h1>
                    {confessionLoading ? 
                        <div className = "flex justify-center flex-wrap content-center" style = {{minHeight: "20vh"}}>
                            <div>
                                <img className = "h-8 w-8" src = { Spinner } alt = "Loading" />
                            </div>
                        </div>
                    :   <>
                        { confessionData.length > 0 ? 
                        <>
                        <div className = "grid md:grid-cols-2 w-12/12 md:w-9/12  mx-auto">
                            {confessionData.map((confession,index) => (
                                <ConfessionBlock
                                    key                = { confession.confessionId }
                                    checkForReply      = { checkForReply }
                                    details            = { confession }
                                    setShareConfession = { setShareConfession }
                                />
                            ))}
                        </div>
                        </>
                        :
                        <div className = "w-11/12 md:w-7/12 mx-auto no-confession">
                            <div>
                                <h1 className = "text-xl heading mb-3">No Confessions</h1>
                                <div className = "instruction">Copy your link and share it on your social media handles to let your followers confess to you anonymously</div>
                            </div>
                            <CopyToClipboard text = {user.user.photoURL}>
                                <button className = "mt-2 submit" style={{display: "flex"}}>
                                    <span className="mr-1 ml-3 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = "2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    </span>
                                    <span className = "mb-0.5 mr-3">Click to copy your social media link</span>
                                </button>
                            </CopyToClipboard>
                            
                        </div>
                        }
                        </>
                    }
                </div>
            </div>
            </> }
        </div>
    )
}
