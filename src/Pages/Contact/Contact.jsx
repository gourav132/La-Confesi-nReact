import React, { useState } from 'react'
import { firestore } from '../../Firebase/config'
import Spinner from '../../Assets/svg/Spinner-2.svg'


export default function Contact() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ query, setQuery ] = useState("");
    const [ err, setErr ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleQuery = (e) => {
        e.preventDefault();
        setLoading(true);
        const feedback = {
            Name: name,
            Email: email,
            Feedback: query
        }
        firestore.collection("Feedback").add(feedback).then(() => {
            setSuccessMessage("Query successfully sent");
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setErr("Try again later")
        })
    }
    return (
        <div>
        <hr className="uk-divider-icon pt-16" />
        <h1 className="text-center heading text-3xl md:text-4xl">Need help with something ?                                                                                                                                                             </h1>
        <p className = "sub-heading text-center text-lg md:text-xl mt-1">Contact Us </p>
        <hr className="uk-divider-icon mt-10" />

        <div className = " w-11/12 md:w-7/12 p-4 md:p-6 mx-auto box-wrapper">

            <form>
                <fieldset className="uk-fieldset">

                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                        <input 
                            className  ="uk-input input" 
                            type       ="text" 
                            placeholder="Full Name"
                            onChange   = { (e) => {
                                setName(e.target.value);
                                setErr("");
                                setSuccessMessage("")
                            }} 
                        />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: mail"></span>
                            <input onChange = { (e) => { setEmail(e.target.value); setErr(""); setSuccessMessage("") } } id = "email" name = "email" className="uk-input input" type="text" placeholder="Email" />
                        </div>
                    </div>


                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <textarea onChange = { (e) => { setQuery(e.target.value); setErr(""); setSuccessMessage("") } } id = "feedback" name = "feedback" className="uk-textarea input" rows="5" placeholder="Your query..."></textarea>
                        </div>
                    </div>

                    <p className = "text-center text-red-400" style = {{marginTop: "-10px", marginBottom: "10px"}}>{ err }</p>
                    <p className = "text-center text-green-400" style = {{marginBottom: "-18px"}}>{ successMessage }</p>

                <div className="mt-8">
                    <button onClick = { (e) => handleQuery(e) } type = "button" className = "uk-width-1-1 mb-4 md:mb-2 secondary-button">
                    {loading ?
                            <img className = "h-5 w-5 text-black" src = {Spinner} alt = "loading"/> :
                            <>
                            <>Send</>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mt-1 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            
                            </>
                        }
                    </button>
                </div>
                </fieldset>
            </form>

        </div>
        </div>
    )
}
