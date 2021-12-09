import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const ArticlesSections = () => {
	const classes = useStyles();
	const {name} = useParams();
	const [appState, setAppState] = useState({
		search: '',
		articles: [],
	});

	useEffect(() => {
        var url = "http://localhost:8000/api/articles/" + name
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ articles: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

    if (!appState.articles || appState.articles.length === 0) return <h1>Nie znaleziono artykułów dla działu {name}!</h1>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					<br/>
					<h1> {name} </h1> 
					<br/>
					{appState.articles.map((article) => {
						var url = 'http://localhost:8000' + article.big_title_photo
                        console.log(url)
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={article.id} xs={12} md={4}>
								<Card className={classes.card}>
									<Link
										color="textPrimary"
										href={'http://localhost:3000/posts/' + article.title}
										className={classes.link}
									>
										<CardMedia
											className={classes.cardMedia}
											image={url}
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.postTitle}
										>
											{article.title}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default ArticlesSections;