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
import ReactPaginate from 'react-paginate';

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
	const [pageNumber, setPageNumber] = useState(0);

	const usersPerPage = 5;
	const pagesVisited = pageNumber * usersPerPage;

	useEffect(() => {
		var url = "http://localhost:8000/api/articles/" + name
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ articles: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	var currUrl = window.location.href;

	const displayUsers = appState.articles
		.slice(pagesVisited, pagesVisited + usersPerPage)
		.map((article) => {
			var url = 'http://localhost:8000/media/' + article.big_title_photo
			console.log(url)
			return (
				// Enterprise card is full width at sm breakpoint
				<Grid item key={article.id} xs={12} md={4}>
					<Card className={classes.card}>
						<Link
							color="textPrimary"
							href={'http://localhost:3000/posts/' + article.article_id}
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
								<br />
								{article.title}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			);
		});

	const pageCount = Math.ceil(appState.articles.length / usersPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};


	//if (!appState.articles || appState.articles.length === 0) return <h1>Nie znaleziono artykułów dla działu {name}!</h1>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<br />
				<br />
				<br/>
				<h1>{name}</h1>
				<Grid container spacing={5} alignItems="flex-end">
					{displayUsers}
				</Grid>
				<Grid container spacing={1} alignItems="flex-end">
					<ReactPaginate
						previousLabel={"previous"}
						nextLabel={"next"}
						breakLabel={"..."}
						pageCount={pageCount}
						marginPagesDisplayed={2}
						pageRangeDisplayed={3}
						onPageChange={changePage}
						containerClassName={"pagination justify-content-center"}
						pageClassName={"page-item"}
						pageLinkClassName={"page-link"}
						previousClassName={"page-item"}
						previousLinkClassName={"page-link"}
						nextClassName={"page-item"}
						nextLinkClassName={"page-link"}
						breakClassName={"page-item"}
						breakLinkClassName={"page-link"}
						activeClassName={"active"}
					/>
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default ArticlesSections;