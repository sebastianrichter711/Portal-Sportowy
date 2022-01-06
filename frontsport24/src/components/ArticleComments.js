import React, { useEffect, useState, useContext } from 'react';
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
import Post from './Post';
import AuthContext from './AuthContext';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import EditandDeleteComments from './EditAndDeleteComments';


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

const ArticleComments = (props) => {
    let { user, logoutUser } = useContext(AuthContext)
    const { id } = props
    var xxx = { id }
    console.log(xxx)
    const [appState, setAppState] = useState({
        articleComments: [],
    });

    var url = 'http://localhost:8000/api/article/' + props.id + '/comments';
    // var s1 = 'http://localhost:8000/api/article/';
    // var s2 = {art_id}.toString();
    // var s3 = "/comments";
    // var s4 = s1.concat(s2,s3);
    // console.log(s4)
    console.log(url);
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
                            <Grid item xs={12} md={3}>
                                <Card className={classes.card} key={comment}>
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
                                        <EditandDeleteComments login={comment.login} comment_id={comment.comment_id}/>
                                        {/* {(user.username == comment.login) ? (
                                        <Link
                                            color="textPrimary"
                                            href={'/moderator/edit/' + comment.comment_id}
                                            className={classes.link}
                                        >
                                            <EditIcon></EditIcon>
                                        </Link>
                                        ) : <p>NIE</p> }
                                        <Link
                                            color="textPrimary"
                                            href={'/moderator/delete/' + comment.comment_id}
                                            className={classes.link}
                                        >
                                            <DeleteForeverIcon></DeleteForeverIcon>
                                        </Link> */}
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

export default ArticleComments;
