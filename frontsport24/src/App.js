import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts';
import axiosInstance from './axios';
import MainArticle from './components/MainArticle';
import Sections from './components/Sections';
import NewestArticles from './components/NewestArticles';
import NewestMatches from './components/NewestMatches';
import Quote from './components/Quote';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	link: {
        margin: theme.spacing(1, 1.5),
    },
}));

function App() {

	const [appState, setAppState] = useState({
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get("http://localhost:8000/api/articles_home_page").then((res) => {
			const allPosts = res.data;
			setAppState({ posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	const classes = useStyles();

	return (
		<div className="App">
			<NewestMatches/>
			<Link
										color="textPrimary"
										href={'http://localhost:3000/disciplines'}
										className={classes.link}
			>
			<Button variant="contained">
                        WYNIKI
            </Button>
			</Link>
			<MainArticle />
			<Posts posts={appState.posts} />
			<Sections/>
			<NewestArticles/>
			<Quote/>
		</div>
	);
}
export default App;