import React, { useState, useEffect, useParams, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import AuthContext from '../../AuthContext';
import axiosInstance from '../../../axios';


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

const Posts = (props) => {
	const { posts, section } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return ( <React.Fragment>
		<p>Can not find any posts, sorry</p>
										<Button
											href={'/moderator/create/' + section}
											variant="contained"
											color="primary"
										>
											Dodaj artykuł
										</Button>
										</React.Fragment>);
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<h1>Artykuły - {section} </h1>
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Data utworzenia</TableCell>
									<TableCell align="left">Url zdjęcia</TableCell>
									<TableCell align="left">Tytuł</TableCell>
									<TableCell align="left">Liczba odsłon</TableCell>
									<TableCell align="left">Liczba komentarzy</TableCell>
									<TableCell align="left">Akcje</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts.map((post) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">
												{post.article_id}
											</TableCell>
											<TableCell align="left">{post.date_of_create}</TableCell>
											<TableCell align="left">{post.big_title_photo}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/posts/' + post.article_id}
													className={classes.link}
												>
													{post.title}
												</Link>
											</TableCell>
											<TableCell align="left">{post.page_views}</TableCell>
											<TableCell align="left">{post.comments_number}</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/moderator/edit/' + post.article_id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/moderator/delete/' + post.article_id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={4} align="right">
										<Button
											href={'/moderator/create/' + section}
											variant="contained"
											color="primary"
										>
											Dodaj artykuł
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};

export default Posts;