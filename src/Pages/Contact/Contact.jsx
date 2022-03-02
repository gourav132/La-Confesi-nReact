import React, { useState } from 'react'
import { firestore } from '../../Firebase/config'
import { TextField, Typography, Container, Alert, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import style from './ContactStyle.module.css';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';



export default function Contact() {

    const [ inputs, setInputs ] = useState({
        Name: '',
        Email: '',
        Feedback: ''
    })

    const [ alert, setAlert ] = useState({
        Type: 'success',
        Status: false,
        Msg: ''
    })

    const [ validation, setValidation ] = useState({
        name: false,
        email: false,
        query: false
    })

    const [ loading, setLoading ] = useState(false);

    const handleQuery = (e) => {
        if(validation.name === false && validation.email === false && validation.query === false)  {
        e.preventDefault();
        setLoading(true);
        firestore.collection("Feedback").add(inputs).then(() => {
            setLoading(false);
            setAlert({ Type: 'success', Status: true, Msg: 'Thank you for your feedback'});
        })
        .catch((error) => {
            setAlert({ Type: 'error', Status: true, Msg: 'Try again after some time' });
            setLoading(false);
        })
    }
    }

    const handleChange = (event, target) => {
        setInputs({
            ...inputs,
            [target]: event.target.value
        });
        setAlert({ ...alert, Status: false });
    }

    const handleValidation = () => {
        console.log(inputs)
        if(inputs.Name === ''){
            setValidation({...validation, name: true })
        }
        if(inputs.Email === ''){
            setValidation({...validation, email: true })
        }
        if(inputs.Feedback === ''){
            setValidation({...validation, query: true })
        }
        console.log(validation)
        handleQuery();
    }

    return (
        <div>
            <Box>
                <hr className="uk-divider-icon pt-16" />
                <Container>
                    <Typography variant='h4' sx = {{ textAlign: "center" }}>Need help with something ? </Typography>
                    <Typography variant='h6' sx = {{ textAlign: "center" }}>Contact Us</Typography>
                </Container>
                <hr className="uk-divider-icon mt-10" />
            </Box>
        <div className = {style.wrapper}>

            <Box sx={{ width: '100%' }}>
                <Collapse in = { alert.Status }>
                    <Alert severity = { alert.Type }
                        action = {
                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setAlert({ ...alert, Status: false }); }} >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        { alert.Msg }
                    </Alert>
                </Collapse>
            </Box>

            <TextField 
                fullWidth  margin='normal' label="Full Name" error = { validation.name }
                onChange   = { (e) => {
                    handleChange(e, "Name");
                }} 
            />
            <TextField 
                fullWidth margin='normal'label="Email Address" error = { validation.email }
                onChange = { (e) => { 
                    handleChange(e, "Email")
                }}
            />
            <TextField 
                rows={5} maxRows={8} fullWidth multiline margin='normal' label="Your query" error = { validation.query }
                onChange = { (e) => { 
                    handleChange(e, "Feedback");
                }}
            />

            <LoadingButton
            fullWidth
                loading = { loading }
                sx = {{ marginTop: 2, marginBottom: 2 }}
                loadingPosition="start"
                // startIcon={<SaveIcon />}
                variant="outlined"
                onClick = { (e) => handleQuery(e) }
                // onClick = { handleValidation }
            >
                { loading? "Submitting..." : "Submit" }
            </LoadingButton>
        </div>
        </div>
    )
}
