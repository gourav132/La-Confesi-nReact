import React, { useState } from 'react'
import { firestore } from '../../Firebase/config'
import Spinner from '../../Assets/svg/Spinner-2.svg'
import { TextField, Button, Typography, Container, Alert, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';
import style from './ContactStyle.module.css';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';



export default function Contact() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ query, setQuery ] = useState("");
    const [ err, setErr ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [open, setOpen] = useState(false);

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
            setOpen(true);
        })
        .catch((error) => {
            console.log(error);
            setErr("Try again later")
            setLoading(false);
        })
    }
    return (
        <div>
        <hr className="uk-divider-icon pt-16" />
        <Container>
            <Typography variant='h4' sx = {{ textAlign: "center" }}>Need help with something ? </Typography>
            <Typography variant='h6' sx = {{ textAlign: "center" }}>Contact Us</Typography>
        </Container>
        <hr className="uk-divider-icon mt-10" />
        <div className = {style.wrapper}>

            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert severity="success"
                        action = {
                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }} >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Your feedback is greatly appreciated.
                    </Alert>
                </Collapse>
            </Box>

            <TextField 
                fullWidth  margin='normal' label="Full Name"
                onChange   = { (e) => {
                    setName(e.target.value);
                    setErr("");
                    setSuccessMessage("")
                }} 
            />
            <TextField 
                fullWidth margin='normal'label="Email Address"
                onChange = { (e) => { 
                    setEmail(e.target.value); 
                    setErr(""); 
                    setSuccessMessage("") 
                }}
            />
            <TextField 
                rows={5} maxRows={8} fullWidth multiline margin='normal' label="Your query"
                onChange = { (e) => { 
                    setQuery(e.target.value); 
                    setErr(""); 
                    setSuccessMessage("") 
                }}
            />

            {/* <Button onClick = { (e) => handleQuery(e) }  variant='outlined' fullWidth sx = {{ marginTop: 2, marginBottom: 2 }}>Submit</Button> */}
            <LoadingButton
            fullWidth
                loading = { loading }
                sx = {{ marginTop: 2, marginBottom: 2 }}
                loadingPosition="start"
                // startIcon={<SaveIcon />}
                variant="outlined"
                onClick = { (e) => handleQuery(e) }
            >
                { loading? "Submitting..." : "Submit" }
            </LoadingButton>


            <p className = "text-center text-red-400" style = {{marginTop: "-10px", marginBottom: "10px"}}>{ err }</p>
            <p className = "text-center text-green-400" style = {{marginBottom: "-18px"}}>{ successMessage }</p>
        </div>
        </div>
    )
}
