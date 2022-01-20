import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axiosInstance from '../axios';

const useStyles = makeStyles(() => ({
    postTitle: {
        fontSize: '17px',
        textAlign: 'left',
        fontStyle: 'bold'
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
                            <Grid item xs={2}>
                                <Card>
                                    <CardContent>
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
        </React.Fragment>
    );
}

export default NewestMatches;