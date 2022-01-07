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
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

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
		name: '',
	});

	const [postData, updateFormData] = useState(initialFormData);
	const [postImage, setPostImage] = useState(null);

	const [disciplines, setDisciplinesState] = useState({
		disciplines: []
	});

	const [discipline, setDisciplineState] = useState('')

	const handleDisciplineChange = (event) => {
		setDisciplineState(event.target.value);
	};

	const handleChange = (e) => {
		if ([[e.target.name] == 'image']) {
			setPostImage({
				image: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'name') {
			updateFormData({
				...postData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
				//['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...postData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	useEffect(() => {
		axiosInstance.get("http://localhost:8000/api/discipline").then((res) => {
			const allDisciplines = res.data;
			setDisciplinesState({ disciplines: allDisciplines });
			console.log(res.data);
		});
	}, [setDisciplinesState]);

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
		formData.append('db_game_id', postData.db_game_id);
		formData.append('name', postData.name);
		formData.append('icon', postImage.image[0]);
		axiosInstance.post(`add_game/`, formData);
		history.push({
			pathname: 'add_game/'
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Utwórz rozgrywki
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
					<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="db_game_id"
								label="Id gry"
								name="db_game_id"
								autoComplete="db_game_id"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Nazwa"
								name="name"
								autoComplete="name"
								onChange={handleChange}
							/>
						</Grid>
						<input
							accept='image/*'
							className={classes.input}
							id="post-image"
							onChange={handleChange}
							name="image"
							type="file"
						/>
						<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="demo-simple-select-standard-label">Dyscyplina</InputLabel>
							<Select className="custom-select1"
								name="discipline"
								//value={discipline}
								onChange={handleDisciplineChange}

							>
								{disciplines.disciplines.map((d) => (
									<MenuItem value={d.name}>
										{d.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Utwórz rozgrywki
					</Button>
				</form>
			</div>
		</Container>
	);
}