import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { signUp } from '../../Auth/Authentication';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { firestore } from '../../Firebase/config';
import Spinner from '../../Assets/svg/Spinner-2.svg';

export default function SignUp() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const [err, setErr ] = useState("");
    const [loading, setloading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const [ user ] = useContext(AuthContext);
    let history = useHistory();

    if(user.user != null){
        <Redirect to = '/Confession' />
    }

    const handleSignUp = () => {
        setErr("");
        setloading(true);
        if(name === ""){
            setErr("Please enter your name");
            setloading(false);
        }
        else{
            firestore.collection("users").where("username", "==", username).get().then((snapshot) => {
                const docs = snapshot.docs;
                if(docs.length > 0){
                    setErr("username already exist");
                    setloading(false)
                }
                else{
                    const url = "http://localhost:3000/Confess/"+username;
                    signUp(email, password, name, url)
                    .then( (resp) => {
                        const userDetails = {
                            name: name,
                            email: email,
                            username: username,
                            uid: resp.user.uid,
                            url: url
                        }
                        firestore.collection("users").add(userDetails);
                        history.push("/Confession")
                    })
                    .catch( (error) => {
                        if(error.code === "auth/user-not-found"){ setErr("Account not found")}
                        if(error.code === "auth/email-already-in-use"){ setErr("The email address is already in use")}
                        if(error.code === "auth/weak-password"){ setErr("Password should be at least 6 characters")}
                        setloading(false)
                    })
                }
            })
        }

    }

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <div className = "grid">
                <div className = "mx-auto flex flex-col justify-center box-wrapper">
                    <h1 className = "text-4xl text-center mb-10 heading" style = {{lineHeight: "1.2"}}>Create your <br/> La Confesión <br/> Account</h1>
                    <form>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input onChange = { (e) => { setName(e.target.value); setErr("") } } className="uk-input input" type="text" placeholder = "Name" style = {{width: "287px"}}/>
                            </div>
                        </div>

                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                <input  onChange = { (e) => { setEmail(e.target.value); setErr("") } } className="uk-input input" type="email" placeholder = "email" style = {{width: "287px"}}/>
                            </div>
                        </div>

                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input  onChange = { (e) => { setUsername(e.target.value); setErr("") } } className="uk-input input" type="text" placeholder = "Username" style = {{width: "287px"}}/>
                            </div>
                        </div>

                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                <input  
                                    type        = { showPassword ? "text" : "password" } 
                                    onChange    = { (e) => { setPassword(e.target.value); setErr("") } } 
                                    className   = "uk-input input" 
                                    placeholder = "Password" 
                                    style       = {{width: "287px"}}
                                />
                                { password.length > 0 ? 
                            <div>
                                { showPassword ? 
                                <button onClick = { handleShowPassword } className="uk-form-icon  uk-form-icon-flip mr-3 remove-highlight">Hide</button>
                                :
                                <button onClick = { handleShowPassword } className="uk-form-icon  uk-form-icon-flip mr-3 remove-highlight">Show</button>
                                }
                            </div>
                            :
                            <></>
                            }
                            </div>
                        </div>

                    </form>

                    <p className = "text-red-400 m-0 p-0 text-center" style = {{marginTop: "-10px", marginBottom: "10px"}}>{ err }</p>

                    <button 
                        onClick = { handleSignUp } 
                        type = "button" 
                        className="submit" 
                    >
                            {loading ?
                                <img className = "h-5 w-5 text-black" src = {Spinner} alt = "loading"/> :
                                <>
                                    <>Sign Up</>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule = "evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule = "evenodd" />
                                    </svg>
                                </>
                            }
                    </button>
                    <Link to = "/SignIn" className = "link hover:no-underline font-thin mt-3">Have an account? Login</Link>
                </div>
            </div>
        </div>
    )
}
