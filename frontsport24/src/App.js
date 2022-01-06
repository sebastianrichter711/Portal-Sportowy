import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Posts from './components/Posts';
import axiosInstance from './axios';
import MainArticle from './components/MainArticle';
import Sections from './components/Sections';
import NewestArticles from './components/NewestArticles';
import NewestMatches from './components/NewestMatches';
import Quote from './components/Quote';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from './components/AuthContext'

const useStyles = makeStyles((theme) => ({
	link: {
        margin: theme.spacing(1, 1.5),
    },
}));

function App() {

	let {user} = useContext(AuthContext);

	const classes = useStyles();

	return (
		<div className="App">
			<br/>
			<br/>
			<br/>
			<NewestMatches/>
			<Grid alignContent='right'>
			<MainArticle />
			</Grid>
			<Grid>
			<Posts/>
			</Grid>
			<Sections/>
			<NewestArticles/>
			<Quote/>
		</div>
	);
}
export default App;