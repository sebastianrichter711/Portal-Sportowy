import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/moderator/articles/posts';
//import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import Disciplines from './components/moderator/games/GetGame';
import Games from './components/moderator/discipline/GetDiscipline';

function Admin() {
	//const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		posts: null,
	});

	
	useEffect(() => {
		axiosInstance.get('http://127.0.0.1:8000/api/articles/Piłka nożna').then((res) => {
			const allPosts = res.data;
			setAppState({ posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
            <br/>
            <br/>
            <br/>
			<h1>Artykuły - Piłka nożna</h1>
			<Posts posts={appState.posts} />
			<Disciplines />
			<Games/>
		</div>
	);
}
export default Admin;