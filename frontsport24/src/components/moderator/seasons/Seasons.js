import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axiosInstance from '../../../axios';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

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
        fontStyle: 'bold'
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
    photo: {
        width: '20px',
        height: '20px'
    }
}));

export default function ModeratorSeasons() {

    const [seasons, setSeasonsState] = useState({
		seasons: []
	});

    useEffect(() => {
		axiosInstance.get("http://localhost:8000/api/seasons").then((res) => {
			const allSeasons = res.data;
			setSeasonsState({ seasons: allSeasons });
			console.log(res.data);
		});
	}, [setSeasonsState]);

    const classes = useStyles();

    if (!seasons.seasons || seasons.seasons.length === 0) return <p>Nie znaleziono sezonów</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell>Sezon</TableCell>
									<TableCell align="left">Faza</TableCell>
									<TableCell align="left">Runda</TableCell>
                                    <TableCell align="left">Rozgrywki</TableCell>
									<TableCell align="left">Akcje</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{seasons.seasons.map((season) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">
												{season.season_id}
											</TableCell>
											<TableCell align="left">{season.season}</TableCell>
											<TableCell align="left">{season.phase}</TableCell>
                                            <TableCell align="left">{season.round}</TableCell>
                                            <TableCell align="left">{season.game}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/moderator/edit_season/' + season.season_id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/moderator/delete_season/' + season.season_id}
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
											href={'/moderator/create_matches'}
											variant="contained"
											color="primary"
										>
											Dodaj mecze
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
}

