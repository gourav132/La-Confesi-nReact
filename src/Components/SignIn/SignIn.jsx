import React, {useState } from 'react'
import { Link } from 'react-router-dom';
import { signIn } from '../../Auth/Authentication';
import Spinner from '../../Assets/svg/Spinner-2.svg'

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        signIn(email, password)
        .then( (resp) => {
            setLoading(false);
            document.getElementById("close").click();
        })
        .catch((error) => {
            if(error.code === "auth/user-not-found"){ setErr("Account not found")}
            if(error.code === "auth/invalid-email"){ setErr("Please enter a valid email id")}
            if(error.code === "auth/wrong-password"){ setErr("Please enter correct password")}
            setLoading(false);
        })
    }
    return (
        <div>
            <div className = "grid modal-body mb-10">
                <button type="button" id = "close" className="btn-close hidden" data-bs-dismiss="modal" aria-label="Close"></button>
                <div className = "mx-auto flex flex-col justify-center signIn-modal">
                    <h1 className = "text-3xl text-gray-300 font-thin text-center mb-6 mt-8 h1">Sign In to get <br/> replies</h1>
                    <form>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input className="uk-input input" type="text" placeholder = "Username or Email" style = {{width: "287px"}} onChange = { (e) => { setEmail(e.target.value); setErr("")}}/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                <input className="uk-input input" type="password" placeholder = "password" style = {{width: "287px"}} onChange = { (e) => {setPassword(e.target.value); setErr(""); }} />
                            </div>
                        </div> 
                    </form>
                    <p className = "text-center text-red-400" style = {{marginTop: "-10px", marginBottom: "10px"}}>{ err }</p>
                    <button onClick = { handleSignIn } type = "button" className="submit" >
                        {loading ?
                            <img className = "h-5 w-5 text-gray-500" src = {Spinner} alt = "loading"/> :
                            <>Sign In</>
                        }
                    </button>
                    <Link onClick = { (e) => { document.getElementById("close").click(); }} to = "/SignUp" className = "link hover:no-underline mb-10">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    )
}
