import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axiosInstance from '../axios';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
    photo: {
        width: '30px',
        height: '30px'
    },
    results: {
        textAlign: "left"
    },
    btn: {
        width: 160,
        alignContent: 'center'

    }
}));

function Disciplines() {

    const [appState, setAppState] = useState({
        disciplines: [],
    });

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/discipline").then((res) => {
            const gotDisciplines = res.data;
            setAppState({ disciplines: gotDisciplines });
            console.log(res.data);
        });
    }, [setAppState]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Grid container spacing={5} xs={3} alignItems="center">
                    <h1 className={classes.results}> WYNIKI </h1>
                    {appState.disciplines.map((discipline) => {
                        var url = 'http://localhost:8000' + discipline.icon
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <Link
										color="textPrimary"
										href={'games/' + discipline.name}
										className={classes.link}
							>
                            <Button variant="contained" alignItems="center" className={classes.btn}>
                                <img className={classes.photo} src={url} alt="url" /> <br /> {discipline.name}
                            </Button>
                            </Link>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Disciplines;