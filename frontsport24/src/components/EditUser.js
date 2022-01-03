import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Edit() {
    const history = useHistory();
    const { username } = useParams();
    const initialFormData = Object.freeze({
        //articleId: '',
        login: '',
        email: '',
        firstName: '',
        lastName: '',
        sex: '',
        birthDate: '',
        phoneNumber: '',
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [sex, setSexState] = useState('');

    const handleSexChange = (event) => {
        setSexState(event.target.value);
    };

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/user/profile/" + username).then((res) => {
            updateFormData({
                ...formData,
                //['articleId']: res.data.id,
                ['login']: res.data.login,
                ['email']: res.data.email,
                ['firstName']: res.data.first_name,
                ['lastName']: res.data.last_name,
                ['sex']: sex,
                ['birthDate']: res.data.birth_date,
                ['phoneNumber']: res.data.phone_number,

            });
            console.log(res.data);
        });
    }, [updateFormData]);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.put('user/edit/' + username, {
            //articleId: formData.articleId,
            login: formData.login,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            sex: sex,
            birthDate: formData.birthDate,
            phoneNumber: formData.phoneNumber,
        });

        history.push({
            pathname: '/edituser/' + formData.login,
        });

        //window.location.reload();
    };


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edytuj artykuł
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="articleId"
                            label="Id artykułu"
                            name="articleId"
                            autoComplete="articleId"
                            value={formData.articleId}
                            onChange={handleChange}
                        />
                    </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                name="login"
                                autoComplete="login"
                                value={formData.login}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Imię"
                                name="firstName"
                                autoComplete="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Nazwisko"
                                name="lastName"
                                autoComplete="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Płeć</InputLabel>
                        <Select className="custom-select3"
                            name = "sex"
                            value={sex}
                            onChange={handleSexChange}
                        >
                                <MenuItem value="kobieta"> Kobieta </MenuItem>
                                <MenuItem value="mężczyzna"> Mężczyzna </MenuItem>
                        </Select>
                        {initialFormData.sex}
                    </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="birthDate"
                                label="Data urodzenia"
                                name="birthDate"
                                autoComplete="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Numer telefonu"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Edytuj
                    </Button>
                </form>
            </div>
        </Container>
    );
};
