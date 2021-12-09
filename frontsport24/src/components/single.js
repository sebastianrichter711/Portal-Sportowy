import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Post() {
	const { title } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ posts: [] });

	useEffect(() => {
        var url = "http://localhost:8000/api/article/" + title
		axiosInstance.get(url).then((res) => {
			setData({ posts: res.data });
			console.log(res.data);
		});
	}, [setData]);

    var article_url = 'http://localhost:8000/media/' + data.posts.big_title_photo
	console.log(article_url)
	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}></div>
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
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
						align="left"
						color="textSecondary"
						paragraph
					>
						<img className={classes.mainPhoto} src={article_url} alt="big_title_photo"/>
					</Typography>
                    <Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.posts.lead_text}
					</Typography>
                    <Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.posts.text}
					</Typography>

				</Container>
			</div>
		</Container>
	);
}