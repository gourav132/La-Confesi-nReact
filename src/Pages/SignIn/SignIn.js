import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext';
import { signIn } from '../../Auth/Authentication';
import { Link, Redirect } from 'react-router-dom';
import { Typography, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';


export default function SignIn() {

    const[ user ] = useContext(AuthContext); // getting user details from context //
    const { register, handleSubmit, formState: { errors } } = useForm();

    const[ err, setErr ] = useState("");
    const[ loading, setLoading ] = useState(false);

    if(user.user != null){
        return (
            <Redirect to = "/Confession" /> 
        );
    }



    const handleSignIn = (data) => {
        setErr("");
        setLoading(true);
        signIn(data.email, data.password)
        .then( (resp) => {
        })
        .catch((error) => {
            if(error.code === "auth/user-not-found"){ setErr("Account not found")}
            if(error.code === "auth/invalid-email"){ setErr("Please enter a valid email id")}
            if(error.code === "auth/wrong-password"){ setErr("Please enter correct password")}
            setLoading(false);
        })
    }


    return (
        <div className = "grid">
            <div className = "mx-auto flex flex-col justify-center box-wrapper">
                <Typography variant = 'h4' sx = {{ textAlign: 'center ', marginBottom: 3}}>
                    Sign in to <br/>La Confesión
                </Typography>
                <form onSubmit={handleSubmit(handleSignIn)}>
  
                    <TextField 
                        variant = 'outlined' margin = 'normal' label = 'Email' fullWidth
                        { ...register("email", { required: "Email is required" })}
                        error = { Boolean(errors.email) }
                        helperText = { errors.email?.message }
                    />

                    <TextField variant = 'outlined' margin = 'normal' label = 'Password' type = 'password' fullWidth
                        { ...register("password", { required: "Password is required" })}
                        error = { Boolean(errors.password) }
                        helperText = { errors.password?.message }
                    />
                    
                    <LoadingButton
                        sx = {{ marginTop: 2 }}
                        loading = { loading }
                        fullWidth
                        loadingPosition="start"
                        startIcon={<LoginIcon />}
                        variant="outlined"
                        type = 'submit'
                    >
                        {loading ? "Signing in": "Sign in" } 
                    </LoadingButton>

                </form>

                <p className = "error" style = {{marginTop: "10px", marginBottom: "10px"}}>{ err }</p>

                <Link to = "/Forgot" className = "link hover:no-underline font-thin mt-3">Forgot password?</Link>
                <Link to = "/SignUp" className = "link hover:no-underline font-thin">Don't have an account? Sign up</Link>
            </div>
        </div>
    )
}
