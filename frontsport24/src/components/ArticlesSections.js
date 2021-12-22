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
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Button } from '@material-ui/core';

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
	const { name } = useParams();
	const [appState, setAppState] = useState({
		search: '',
		articles: [],
	});

	const [artNumber, setArtNumber] = useState(10);

    const handleArtNoChange = (event) => {
        setArtNumber(event.target.value);
    };

	const handleSubmit = (e) => {
        e.preventDefault();
        var url = "http://localhost:8000/api/articles/" + name + '/' + artNumber
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ articles: allPosts });
			console.log(res.data);
		});
        return <p>Can not find any posts, sorry</p>;
        //if (!appState.games || appState.games.length === 0) return <p>Can not find any posts, sorry</p>
    };

	useEffect(() => {
		var url = "http://localhost:8000/api/articles/" + name + '/' + artNumber
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ articles: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	//if (!appState.articles || appState.articles.length === 0) return <h1>Nie znaleziono artykułów dla działu {name}!</h1>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={4} alignItems="flex-end">
					<br />
					<h1> {name} </h1>
					<br />
					<p> Liczba artykułów: </p>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={artNumber}
						label="Liczba artykułów"
						onChange={handleArtNoChange}
						defaultValue={1}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
					</Select>
					<Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Wykonaj
                    </Button>
				</Grid>
				<Grid container spacing={5} alignItems="flex-end">
					{appState.articles.map((article) => {
						var url = 'http://localhost:8000/media/' + article.big_title_photo
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
											{article.date_of_create}
											<br/>
											{article.title}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
				<Grid container spacing={4} alignItems="flex-end">
					<br />
					<p> Liczba artykułów: </p>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={artNumber}
						label="Liczba artykułów"
						onChange={handleArtNoChange}
						defaultValue={1}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
					</Select>
					<Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Wykonaj
                    </Button>
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default ArticlesSections;