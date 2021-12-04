import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../images/logo.png'
import '../style.css'

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

export default function Create() {
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

	const handleChange = (e) => {
        if ([[e.target.name] == 'image']){
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
        formData.append('name', postData.name);
        formData.append('icon', postImage.image[0]);
		axiosInstance.post(`add_discipline/`, formData);
	    //window.location.reload(false);
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
            <img className="logo" src={logo} alt="logo" />
				<Typography component="h1" variant="h5">
					Utwórz dyscyplinę
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
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
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Utwórz dyscyplinę
					</Button>
				</form>
			</div>
		</Container>
	);
}