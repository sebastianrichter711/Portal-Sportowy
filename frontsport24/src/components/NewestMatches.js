import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axiosInstance from '../axios';

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
        fontSize: '17px',
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

const GreenTypography = withStyles({
    root: {
        color: "#006600",
    }
})(Typography);

function NewestMatches() {

    const [appState, setAppState] = useState({
        newestMatches: [],
    });

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/newest_matches").then((res) => {
            const matches = res.data;
            setAppState({ newestMatches: matches });
        });
    }, [setAppState]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container component="main">
                <Grid container spacing={2} alignContent="center">
                    {appState.newestMatches.map((match) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={match.id} xs={2}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <GreenTypography
                                            gutterBottom
                                            variant="h6"
                                            align="justify"
                                            className={classes.postTitle}
                                        >
                                            {match.match_date}
                                        </GreenTypography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            align="justify"
                                            className={classes.postTitle}
                                        >
                                            {match.host} {match.host_score}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            align="justify"
                                            className={classes.postTitle}
                                        >
                                            {match.guest} {match.guest_score}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment >
    );
}

export default NewestMatches;