import React, { useState, useEffect, useContext } from 'react';
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
import jwt_decode from "jwt-decode";
import AuthContext from './AuthContext'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';


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
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    const history = useHistory();
    const { username } = useParams();
    const dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const initialFormData = Object.freeze({
        user_name: '',
        email: '',
        first_name: '',
        last_name: '',
        sex: '',
        birth_date: '',
        phone_number: ''
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [sex, setSexState] = useState('');
    const [date, setDate] = useState('');

    const handleSexChange = (event) => {
        setSexState(event.target.value);
    };

    const handleDateChange = (event) => {
        console.log(dateValue);
        let gotDay = new Date(event.target.value).getDate().toString();
        if (gotDay >=0 && gotDay <=9){
            gotDay = '0' + gotDay;
        } 
        let gotMonth = new Date(event.target.value).getMonth()+1;
        let convertedMonth = gotMonth.toString();
        console.log(convertedMonth)
        if (convertedMonth >=0 && convertedMonth <=9){
            convertedMonth = '0' + convertedMonth;
        } 
        let gotYear = new Date(event.target.value).getFullYear().toString();
        console.log(gotDay);
        console.log(convertedMonth);
        console.log(gotYear);
        let dateToApply = gotYear + "-" + convertedMonth + "-" + gotDay
        setDate(dateToApply);
        console.log(dateToApply);
    };

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/user/edit/detail/" + user.user_id).then((res) => {
            updateFormData({
                ...formData,
                // //['id']: res.data.id,
                ['user_name']: res.data.user_name,
                ['email']: res.data.email,
                ['first_name']: res.data.first_name,
                ['last_name']: res.data.last_name,
                ['sex']: res.data.sex,
                ['birth_date']: res.data.birth_date,
                ['phone_number']: res.data.phone_number,
            });
            setSexState(res.data.sex)
            if (res.data.birth_date == null)
                setDate("2021-01-01")
            else
                setDate(res.data.birth_date)
            console.log(res.data);
            console.log(date)
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
        let newFormData = new FormData();
        newFormData.append('user_name', formData.user_name);
        newFormData.append('email', formData.email);
        newFormData.append('first_name', formData.first_name);
        newFormData.append('last_name', formData.last_name);
        newFormData.append('sex', sex);
        newFormData.append('birth_date', date);
        newFormData.append('phone_number', formData.phone_number);
        axiosInstance.put('user/edit/' + user.user_id, newFormData);

        console.log(formData.sex)
        history.push({
             pathname: '/edituser/' + user.user_id,
        });

        window.location.reload();
    };


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edytuj dane osobowe
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
                                id="user_name"
                                label="Login"
                                name="user_name"
                                autoComplete="user_name"
                                value={formData.user_name}
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
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="first_name"
                                label="Imię"
                                name="first_name"
                                autoComplete="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="last_name"
                                label="Nazwisko"
                                name="last_name"
                                autoComplete="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Płeć</InputLabel>
                                <Select className="custom-select3"
                                    name="sex"
                                    value={sex}
                                    onChange={handleSexChange}
                                >
                                    <MenuItem value="kobieta"> Kobieta </MenuItem>
                                    <MenuItem value="mężczyzna"> Mężczyzna </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="birth_date"
                                label="Data urodzenia"
                                name="birth_date"
                                autoComplete="birth_date"
                                value={date}
                                onChange={handleChange}
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <CalendarComponent value={dateValue} onChange={handleDateChange}
                            ></CalendarComponent>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone_number"
                                label="Numer telefonu"
                                name="phone_number"
                                autoComplete="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                multiline
                                rows={1}
                            />
                        </Grid>
                        {/* <input
                            accept='image/*'
                            className={classes.input}
                            id="avatar"
                            onChange={handleChange}
                            name="avatar"
                            type="file"
                        /> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    //onSubmit={loginUser}
                    >
                        Edytuj
                    </Button>
                </form>
            </div>
        </Container>
    );
};
