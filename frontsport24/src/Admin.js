import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Posts from './components/moderator/articles/posts';
//import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import Disciplines from './components/moderator/games/GetGame';
import Games from './components/moderator/discipline/GetDiscipline';
import AuthContext from './components/AuthContext'

function Admin() {

	let { user } = useContext(AuthContext);

	//const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get('http://127.0.0.1:8000/api/moderator/articles/' + user.username).then((res) => {
			const allPosts = res.data;
			setAppState({ posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	if (user.role != "moderator-art") return (
		<React.Fragment>
		<br/>
		<br/>
		<br/>
	<h1>Strona przeznaczona dla moderatorów artykułów.
	</h1>
	</React.Fragment>
	 )
	return (
		<div className="App">
			<br />
			<br />
			<br />
			{(user != "xxx") && <Posts posts={appState.posts} section={user.section_name}/>}
		</div>
	);
}
export default Admin;