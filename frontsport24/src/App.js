import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/Posts';
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

	const classes = useStyles();

	return (
		<div className="App">
			<br/>
			<br/>
			<br/>
			<NewestMatches/>
			<Link
                        color="textPrimary"
                        className={classes.link}
						to="/profile"
                    >
                        <Button variant="contained">
                           TWÓJ PROFIL
                        </Button>
                    </Link>
			<MainArticle />
			<Posts/>
			<Sections/>
			<NewestArticles/>
			<Quote/>
		</div>
	);
}
export default App;