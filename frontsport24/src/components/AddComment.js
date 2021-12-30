import React, { useState , useContext} from 'react';
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
import AuthContext from './AuthContext'


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

export default function Create({art_id}) {
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
    let {user} = useContext(AuthContext);
	const initialFormData = Object.freeze({
		text: '',
	});

	const [postData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		if ([e.target.name] == 'text') {
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
    
	const handleSubmit = (e) => {
		e.preventDefault();
        var url = "http://localhost:8000/api/add_comment/" + art_id + "/" + user.username
        console.log(url)
        let formData = new FormData();
        formData.append('text', postData.text);
		axiosInstance.post(url, formData);
		// history.push({
		//  	pathname: '/add_comment'
		// });
	    window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
            <img className="logo" src={logo} alt="logo" />
				
				<form className={classes.form} noValidate>
                <TextField
								variant="outlined"
								required
								fullWidth
								id="text"
								label="Napisz komentarz"
								name="text"
								autoComplete="text"
								onChange={handleChange}
							/>
                    <Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>     
                    Dodaj
                    </Button>
				</form>
			</div>
		</Container>
	);
}