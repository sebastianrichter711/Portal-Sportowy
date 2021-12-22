import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ArticleComments from './ArticleComments';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainPhoto: {
        width: "1100px",
        height: "770px",
        top: "40px",
        alignContent: "left"
    }
}));

export default function UserData() {
    const { title } = useParams();
    const classes = useStyles();

    const [data, setData] = useState({ userData: [] });

    useEffect(() => {
        var url = "http://localhost:8000/api/user/profile/Seba"
        axiosInstance.get(url).then((res) => {
            setData({ userData: res.data });
            console.log(res.data);
        });
    }, [setData]);

    var userAvatar = 'http://localhost:8000/media/' + data.userData.avatar
    console.log(userAvatar)
    return (
        <Container component="main" xs={3} md={3}>
            <CssBaseline />
            <br/>
            <br/>
            <br/>
            <div className={classes.paper}></div>
            <div className={classes.heroContent}>
                <Container xs={3}>
                <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        <img className={classes.mainPhoto} src={userAvatar} alt="big_title_photo" />
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        <p>Login: {data.userData.login}</p>
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        <p>Email: {data.userData.email}</p>
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        <p>Imię: {data.userData.first_name}</p>
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        <p>Nazwisko: {data.userData.last_name}</p>
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        <p>Płeć: {data.userData.sex} </p>
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                    </Typography>
                    <p>Data urodzenia: {data.userData.birth_date} </p>
                    <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                    >
                    </Typography>
                    <p>Numer telefonu: {data.userData.phone_number}</p>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                    <p>Liczba komentarzy: {data.userData.comments_number}</p>
                    </Typography>
                    <Button
						href="#"
						color="white"
						variant="outlined"
						className={classes.link}
						to="/logout"
					>
						EDYTUJ KONTO
					</Button>
                    <Button
						href="#"
						color="white"
						variant="outlined"
						className={classes.link}
						to="/logout"
					>
						USUŃ KONTO
					</Button>


                    </Container>
                    </div>
                </Container>
                );
}