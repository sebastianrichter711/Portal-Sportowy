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
import { List, ListItem, ListItemButton } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';

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
        fontStyle: 'bold'
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
        width: '20px',
        height: '20px'
    }
}));

function NewestMatches() {

    const [appState, setAppState] = useState({
        newestMatches: [],
    });

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/newest_matches").then((res) => {
            const matches = res.data;
            setAppState({ newestMatches: matches });
            console.log(res.data);
        });
    }, [setAppState]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={2} alignItems="center">
                    {appState.newestMatches.map((match) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={match.id} xs={12} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {match.match_date}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {match.host} {match.host_score}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {match.guest} {match.guest_score}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                    <Link
                        color="textPrimary"
                        href={'http://localhost:3000/disciplines'}
                        className={classes.link}
                    >
                        <Button variant="contained">
                            WYNIKI
                        </Button>
                    </Link>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default NewestMatches;