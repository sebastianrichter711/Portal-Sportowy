import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts';
import axiosInstance from './axios';
import MainArticle from './components/MainArticle';
import Sections from './components/Sections';
import NewestArticles from './components/NewestArticles';
import Quote from './components/Quote';
import { Button } from '@material-ui/core';

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
	return (
		<div className="App">
			<MainArticle />
			<Posts posts={appState.posts} />
			<Sections/>
			<Button variant="contained">
                        WYNIKI
            </Button>
			<NewestArticles/>
			<Quote/>
		</div>
	);
}
export default App;