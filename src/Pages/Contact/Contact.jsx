import React, { useState } from 'react'
import { firestore } from '../../Firebase/config'
import { TextField, Typography, Container, Alert, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import style from './ContactStyle.module.css';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useForm } from 'react-hook-form';
import Test from './Test';



export default function Contact() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ alert, setAlert ] = useState({ Type: 'success', Status: false, Msg: '' })
    const [ loading, setLoading ] = useState(false);

    const handleQuery = (data) => {
        console.log("data -> ", data);
        setLoading(true);
        firestore.collection("Feedback").add(data).then(() => {
            setLoading(false);
            setAlert({ Type: 'success', Status: true, Msg: 'Thank you for your feedback'});
        })
        .catch((error) => {
            setAlert({ Type: 'error', Status: true, Msg: 'Try again after some time' });
            setLoading(false);
        })
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
            <form onSubmit = { handleSubmit(handleQuery) }>
                <TextField 
                    fullWidth  margin='normal' label="Full Name" name = 'fullName'
                    {...register("fullName", { required: "First Name is required." })}
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName?.message}
                />
                <TextField 
                    fullWidth margin='normal'label="Email Address" name = "email"
                    {...register("email", { required: "Email is required." })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                />
                <TextField 
                    rows={5} maxRows={8} fullWidth multiline margin='normal' label="Your query" name = 'feedBack'
                    {...register("feedBack", { required: "Feedback is required." })}
                    error={Boolean(errors.feedBack)}
                    helperText={errors.feedBack?.message}
                />

                <LoadingButton
                fullWidth
                    loading = { loading }
                    sx = {{ marginTop: 2, marginBottom: 2 }}
                    loadingPosition="start"
                    startIcon={<DoneIcon />}
                    variant="outlined"
                    type = "submit"
                >
                    { loading? "Submitting..." : "Submit" }
                </LoadingButton>
            </form>

        {/* <Test/> */}
        </div>
        </div>
    )
}
