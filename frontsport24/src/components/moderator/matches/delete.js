import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function DeleteMatch() {
	const history = useHistory();
	const { id } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.delete('moderator/delete_match/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
					history.push({
						pathname: '/moderator/results',
					});
					window.location.reload();
			});
	};

	return (
		<Container component="main" maxWidth="sm">
            <br/>
            <br/>
            <br/>
			<Box
				display="flex"
				justifyContent="center"
				m={1}
				p={1}
				bgcolor="background.paper"
			>
				<Button
					variant="contained"
					color="secondary"
					type="submit"
					onClick={handleSubmit}
				>
					Naciśnij, jeśli chcesz usunąć
				</Button>
			</Box>
		</Container>
	);
}