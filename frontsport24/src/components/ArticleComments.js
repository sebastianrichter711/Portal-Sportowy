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
import Post from './single';

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

export default function ArticleComments({art_id}) {

    //const {id} = props
    var xxx = {art_id}
    console.log(xxx)
    const [appState, setAppState] = useState({
        articleComments: [],
    });

    var url = 'http://localhost:8000/api/article/' + 9 + '/comments'
    console.log(url)
    useEffect(() => {
        axiosInstance.get(url).then((res) => {
            const comments = res.data;
            setAppState({ articleComments: comments });
            console.log(res.data);
        });
    }, [setAppState]);

    const classes = useStyles();

    if (!appState.articleComments || appState.articleComments.length === 0) return <h1>Nie znaleziono komentarzy dla tego artykułu. Możesz dodać komentarz jako pierwszy!</h1>;
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={2} alignItems="center">
                    {appState.articleComments.map((comment) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={comment.id} xs={12} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {comment.avatar}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {comment.login} {comment.date_of_create}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {comment.modified} {comment.text}
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
