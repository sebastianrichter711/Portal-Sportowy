import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ArticleComments from './ArticleComments';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddComment from './AddComment';
import AuthContext from './AuthContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	mainPhoto: {
		width: "1100px",
		height: "770px",
		top: "40px",
		alignContent: "left"
	},
	bold: {
		fontWeight: 600
	}
}));

const BlackTextTypography = withStyles({
	root: {
	  color: "#000000",
	}
  })(Typography);

export default function Post() {

	let { user, logoutUser } = useContext(AuthContext)
	const { id } = useParams();
	const [data, setAppState] = useState({ posts: [] });

	var url = "http://localhost:8000/api/article/" + id
	console.log(url)
	useEffect(() => {
		axiosInstance.get(url).then((res) => {
			const gotPost = res.data;
			setAppState({ posts: gotPost });
			console.log(res.data);
		});
	}, [setAppState]);

	console.log(data.posts.title)
	var article_url = 'http://localhost:8000/media/' + data.posts.big_title_photo
	//var id = data.posts.id
	console.log(article_url)
	const classes = useStyles();
	return (
		<Container component="main" xs={3} md={3}>
			<br />
			<br />
			<br />
			<CssBaseline />
			<div className={classes.paper}></div>
			<div className={classes.heroContent}>
				<Container xs={3}>
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
						className={classes.bold}
					>
						{data.posts.title}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.posts.date_of_create}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						Liczba odsłon: {data.posts.page_views}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						<img className={classes.mainPhoto} src={article_url} alt="big_title_photo" />
					</Typography>
					<BlackTextTypography
						variant="h4"
						align="left"
						color="textSecondary"
						paragraph
						className={classes.bold}
					>
						{data.posts.lead_text}
					</BlackTextTypography>
					<Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph
					>
						{data.posts.text}
					</Typography>
					<br/>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						Komentarze ({data.posts.comments_number})
					</Typography>
					{(user != "xxx") ? (<AddComment art_id={id} />) : (<h1 align="center"> Jeśli chcesz dodać komentarz, musisz mieć konto w serwisie!</h1>)}
					<ArticleComments id={id} />
				</Container>
			</div>
		</Container>
	);
}

