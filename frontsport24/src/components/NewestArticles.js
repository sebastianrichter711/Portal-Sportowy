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
        width: '20px',
        height: '20px'
    }
}));

function NewestArticles() {

    const [appState, setAppState] = useState({
        newArticles: [],
    });

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/newest_articles").then((res) => {
            const articles = res.data;
            setAppState({ newArticles: articles });
            console.log(res.data);
        });
    }, [setAppState]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={1} alignItems="center">
                    <h1> Najnowsze </h1><br/>
                    &ensp;
                    {appState.newArticles.map((article) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            //<List>
                            <Grid container columnSpacing={{ xs: 1, sm: 4, md: 4 }} xs={12}>
                                <Link
										color="textPrimary"
										href={'http://localhost:3000/posts/' + article.article_id}
										className={classes.link}
								>
                                {/* //<ListItem disablePadding> */}
                                    {/* //<ListItem button> */}
                                        {/* <ListItemText primary={article.date_of_create} secondary={article.title} /> */}
                                        {article.date_of_create} {article.title}
                                    {/* //</ListItem> */}
                                {/* </ListItem> */}
                                </Link>
                            {/* //</List> */}
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default NewestArticles;