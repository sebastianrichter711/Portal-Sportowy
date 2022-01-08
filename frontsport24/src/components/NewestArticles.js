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
import { List, ListItem, ListItemButton, TextField } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1),
        textAlign: 'left'
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
        width: '40px',
        height: '40px'
    },
    gridNA: {
        alignContent: "right"
    },
    newest: {
        textAlign: "left"
    }
}));

function NewestArticles() {

    const [appState, setAppState] = useState({
        newArticles: [],
    });

    const [appStatePosts, setAppStatePosts] = useState({
        posts: []
    });

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/newest_articles").then((res) => {
            const articles = res.data;
            setAppState({ newArticles: articles });
            console.log(res.data);
        });

        axiosInstance.get("http://localhost:8000/api/articles_home_page").then((res) => {
            const allPosts = res.data;
            setAppStatePosts({ posts: allPosts });
            console.log(res.data);
        });
    }, [setAppState, setAppStatePosts]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container component="main">
                <br />
                <br />
                <Grid container xs={12}>
                    {/* <h1> Najnowsze </h1><br /> */}
                    <Grid xs={4} alignContent='left'>
                        &ensp;
                        <br />
                        <br />
                        <h2 className={classes.newest}>Najnowsze</h2>
                        {appState.newArticles.map((article) => {
                            return (
                                // Enterprise card is full width at sm breakpoint
                                <Grid container xs={8} alignContent='left'>
                                    <Link
                                        color="textPrimary"
                                        href={'http://localhost:3000/posts/' + article.article_id}
                                        className={classes.link}
                                    >
                                        {article.date_of_create} {article.title}
                                    </Link>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid container xs={8} spacing={2}>
                        {appStatePosts.posts.map((post) => {
                            var url = 'http://localhost:8000' + post.big_title_photo
                            return (
                                // Enterprise card is full width at sm breakpoint
                                <Grid item key={post.id} xs={6}>
                                    <Card className={classes.card}>
                                        <Link
                                            color="textPrimary"
                                            href={'http://localhost:3000/posts/' + post.article_id}
                                            className={classes.link}
                                        >
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={url}
                                                title="Image title"
                                            />
                                        </Link>
                                        <CardContent className={classes.cardContent}>
                                            <Link
                                                color="textPrimary"
                                                href={'posts/' + post.article_id}
                                                className={classes.link}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="h2"
                                                    className={classes.postTitle}
                                                >
                                                    {post.title}
                                                </Typography>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default NewestArticles;