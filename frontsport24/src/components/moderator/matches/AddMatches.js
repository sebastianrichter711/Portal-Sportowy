import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import { useHistory } from 'react-router-dom';
import axios from '../../../axios';
//MaterialUI
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../../../style.css'
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function AddDiscipline() {
	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

	const history = useHistory();
	const initialFormData = Object.freeze({
		gameId: '',
		phase: '',
		round: '',
		season: '',

	});

	const [postData, updateFormData] = useState(initialFormData);
	const [games, setGamesState] = useState({
		games: []
	});

    const [game, setGameState] = useState('')

	const handleGameChange = (event) => {
        setGameState(event.target.value);
    };

	const handleChange = (e) => {
		if ([e.target.name] == 'gameId') {
			updateFormData({
				...postData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
				//['slug']: slugify(e.target.value.trim()),
			});
		}
		if ([e.target.name] == 'phase') {
			updateFormData({
				...postData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
				//['slug']: slugify(e.target.value.trim()),
			});
		}
		if ([e.target.name] == 'round') {
			updateFormData({
				...postData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
				//['slug']: slugify(e.target.value.trim()),
			});
		}
		if ([e.target.name] == 'season') {
			updateFormData({
				...postData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
				//['slug']: slugify(e.target.value.trim()),
			});
		}
		else {
			updateFormData({
				...postData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	useEffect(() => {
		axiosInstance.get("http://localhost:8000/api/get_all_games").then((res) => {
			const allGames = res.data;
			setGamesState({ games: allGames });
			console.log(res.data);
		});
	}, [setGamesState]);

	// const config = {headers: {'Content-Type': 'multipart/form-data'}};
	// const URL = 'http://127.0.0.1:8000/add_discipline/';
	// let formData = new FormData();
	// formData.append('name', postData.name);
	// formData.append('icon', postImage.image[0]);
	// axios
	//     .post(URL,formData,config)
	//     .then((res) => {
	//     console.log(res.data);
	//     })
	//     .catch((err) => console.log(err));

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('gameId', postData.gameId);
		formData.append('phase', postData.phase);
		formData.append('round', postData.round);
		formData.append('season', postData.season);
		axiosInstance.post('add_matches/' + game, formData);
		history.push({
			pathname: 'create_matches'
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Dodaj mecze
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="demo-simple-select-standard-label">Rozgrywka</InputLabel>
							<Select className="custom-select3"
								//value={xxx}
								onChange={handleGameChange}
							>
								{games.games.map((g) => (
									<MenuItem value={g.name}>
										{g.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="phase"
								label="Faza"
								name="phase"
								autoComplete="phase"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="round"
								label="Runda"
								name="round"
								autoComplete="round"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="season"
								label="Sezon"
								name="season"
								autoComplete="season"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Dodaj mecze
					</Button>
				</form>
			</div>
		</Container>
	);
}