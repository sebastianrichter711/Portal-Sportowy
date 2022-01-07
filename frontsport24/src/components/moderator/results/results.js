
import React, { useEffect, useState, useContext } from 'react';
import '../../../App';
//import Posts from './components/moderator/articles/posts';
//import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from '../../../axios';
import Disciplines from '../../../components/moderator/games/GetGame';
import Games from '../../../components/moderator/discipline/GetDiscipline';
import AuthContext from '../../../components/AuthContext'
import ModeratorSeasons from '../seasons/Seasons';
import ModeratorMatches from '../matches/Matches';


export default function ModeratorResults() {

	let { user } = useContext(AuthContext);

	return (
		<div className="App">
			<br />
			<br />
			<br />
            <h1>Wyniki spotkań</h1>
			<Games />
            <Disciplines />
            <ModeratorSeasons/>
            <ModeratorMatches/>
		</div>
	);
}

