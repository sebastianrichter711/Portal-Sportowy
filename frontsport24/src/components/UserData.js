import React, { useState, useEffect, useContext } from 'react';
//import axiosInstance from '../axios';
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
import axios from 'axios';
import AuthContext from './AuthContext'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainPhoto: {
        width: "110px",
        height: "110px",
        top: "40px",
        alignContent: "left"
    }
}));

export default function UserData() {
    let {user} = useContext(AuthContext);
    const { title } = useParams();
    const classes = useStyles();

    const [data, setData] = useState({ userData: [] });

    const config = {
        headers: {
            Authorization: 'JWT' + localStorage.getItem('access_token')
        }
    }
    useEffect(() => {
        var url = "http://localhost:8000/api/user/profile/" + user.username
        axios.get(url,config).then((res) => {
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
                        <p>{data.userData.login}</p>
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
                    <p>Data urodzenia: {data.userData.birth_date} </p>
                    </Typography>
                    <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                    >
                    <p>Numer telefonu: {data.userData.phone_number}</p>
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                    <p>Liczba komentarzy: {data.userData.comments_number}</p>
                    </Typography>
                   
                    <Button
						href={'http://localhost:3000/edituser/' + user.user_id}
                        color="white"
						variant="outlined"
						className={classes.link}
						//to="/logout"
					>
						EDYTUJ KONTO
					</Button>
                    {(user.role != "moderator") ? (
                    <Button
						href={'http://localhost:3000/deleteuser/' + user.username}
						color="white"
						variant="outlined"
						className={classes.link}
						//to="/logout"
					>
						USUŃ KONTO
					</Button> ) : null }
                   
                    </Container>
                    </div>
                </Container>
                );
}