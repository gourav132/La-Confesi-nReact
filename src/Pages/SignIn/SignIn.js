import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext';
import { signIn } from '../../Auth/Authentication';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Spinner from '../../Assets/svg/loading.svg';
import { projectAuth } from '../../Firebase/config';


export default function SignIn() {
    const date = new Date();
    console.log("Signin Re-renders at ", date);

    const[ user ] = useContext(AuthContext); // getting user details from context //
    const[ email, setEmail ] = useState("gouravchatterjee65@gmail.com")
    const[ password, setPassword ] = useState("gourav")
    const[ err, setErr ] = useState("");
    const[ loading, setLoading ] = useState(true);
    const[ showPassword, setShowPassword ] = useState(false);

    let history = useHistory();

    // Checking if user is logged in or not
    if(user.user != null){
        return (
            <Redirect to = "/Confession" /> 
        );
    }

    // useEffect(() => {
    //     projectAuth.onAuthStateChanged((response) => {
    //         if(response != null){
    //             history.push('/Confession')
    //         }
    //     })
    // })


    const handleSignIn = (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        signIn(email, password)
        .then( (resp) => {
            // console.log("Signed in...")
            // history.push("/Confession");
        })
        .catch((error) => {
            if(error.code === "auth/user-not-found"){ setErr("Account not found")}
            if(error.code === "auth/invalid-email"){ setErr("Please enter a valid email id")}
            if(error.code === "auth/wrong-password"){ setErr("Please enter correct password")}
            setLoading(false);
        })
    }

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className = "grid">
            <div className = "mx-auto flex flex-col justify-center box-wrapper">
                <h1 className = "text-4xl text-center mb-10 heading">Sign In to <br/>La Confesión</h1>
                <form>
                    <div className="uk-margin">
                        <div className="uk-inline">
                            <span className="uk-form-icon" uk-icon="icon: user"></span>
                            <input 
                                className   ="uk-input input" 
                                type        ="text" 
                                placeholder = "Username or Email" 
                                style       = {{width: "287px"}} 
                                onChange    = { (e) => { 
                                        setEmail(e.target.value);
                                        setErr("")
                                }}
                            />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <div className="uk-inline">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input 
                                className   ="uk-input input" 
                                type        = { showPassword ? "text" : "password" }
                                placeholder = "password" 
                                style       = {{width: "287px"}}
                                onChange    = { (e) => {
                                    setPassword(e.target.value);
                                    setErr("");
                                }}
                            />
                
                            { password.length > 0 ? 
                            <div>
                                { showPassword ? 
                                <button onClick = { handleShowPassword } className="uk-form-icon  uk-form-icon-flip mr-3 remove-highlight"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin = "round" strokeWidth = "2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg></button>
                                :
                                <button onClick = { handleShowPassword } className="uk-form-icon  uk-form-icon-flip mr-3 remove-highlight"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin = "round" strokeWidth = "2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin = "round" strokeWidth = "2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg></button>
                                }
                            </div>
                            :
                            <></>
                            }
                        </div>
                    </div>
                    
                </form>

                <p className = "error" style = {{marginTop: "-10px", marginBottom: "10px"}}>{ err }</p>

                <button  onClick = { (e) => handleSignIn(e) }  type = "button"  className="submit"  >
                    {loading ?
                        <img className = "h-5 w-5 text-black" src = {Spinner} alt = "loading"/> :
                        <>
                            <>Sign In</>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 ml-1 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </>
                    }
                </button>

                <Link to = "/Forgot" className = "link hover:no-underline font-thin mt-5">Forgot password?</Link>
                <Link to = "/SignUp" className = "link hover:no-underline font-thin">Don't have an account? Sign up</Link>
            </div>
        </div>
    )
}
