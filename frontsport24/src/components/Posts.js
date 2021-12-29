import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axiosInstance from '../axios';

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

export default function Posts () {

	const [appState, setAppState] = useState({
		posts: []
	});

	useEffect(() => {
		axiosInstance.get("http://localhost:8000/api/articles_home_page").then((res) => {
			const allPosts = res.data;
			setAppState({ posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	
	const classes = useStyles();
	if (!appState.posts || appState.posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{appState.posts.map((post) => {
                        var url = 'http://localhost:8000' + post.big_title_photo
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={4} md={4}>
								<Card className={classes.card}>
									<Link
										color="textPrimary"
										href={'http://localhost:3000/posts/' + post.article_id}
										className={classes.link}
									>
										<CardMedia
											className={classes.cardMedia}
											image={url}
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
									<Link
										color="textPrimary"
										href={'posts/' + post.article_id}
										className={classes.link}
									>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.postTitle}
										>
											{post.title}
										</Typography>
										</Link>
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
