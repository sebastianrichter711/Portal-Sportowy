import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function EditSeason() {
    const history = useHistory();
    const { id } = useParams();

    const initialFormData = Object.freeze({
        season: '',
        phase: '',
        round: '',
        game: '',

    });

    const [formData, updateFormData] = useState(initialFormData);
    const [game, setGameState] = useState('');

    const [games, setGamesState] = useState({
        games: []
    });

    const handleGameChange = (event) => {
        setGameState(event.target.value);
    };

    var gameId;
    var nameOfDis = ''

    useEffect(() => {
        axiosInstance.get('edit/seasondetail/' + id + "/").then((res) => {
            updateFormData({
                ...formData,
                ['season']: res.data.season,
                ['phase']: res.data.phase,
                ['round']: res.data.round,
                ['game']: res.data.game_id,

            });
            gameId = res.data.game_id
            //setDisciplineState(res.data.discipline_id)
            console.log(res.data);
            axiosInstance.get("http://localhost:8000/api/get_game/" + res.data.game_id).then((res) => {
                setGameState(res.data.name);
                console.log(res.data);
            });
        });

        axiosInstance.get("http://localhost:8000/api/get_all_games").then((res) => {
            const allGames = res.data;
            setGamesState({ games: allGames });
            console.log(res.data);
        });

    }, [updateFormData, setGamesState]);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        let newFormData = new FormData();
        newFormData.append('season', formData.season)
        newFormData.append('phase', formData.phase)
        newFormData.append('round', formData.round)
        newFormData.append('game', game)
        axiosInstance.put('moderator/edit_season/' + id, newFormData);

        console.log(formData)
        history.push({
            pathname: '/moderator/edit_season/' + id,
        });

        window.location.reload();
    };


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edytuj sezon
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="season"
                                label="Sezon"
                                name="season"
                                autoComplete="season"
                                value={formData.season}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phase"
                                label="Faza"
                                name="phase"
                                autoComplete="phase"
                                value={formData.phase}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="round"
                                label="Runda"
                                name="round"
                                autoComplete="round"
                                value={formData.round}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Rozgrywka</InputLabel>
                            <Select className="custom-select1"
                                name="game"
                                value={game}
                                onChange={handleGameChange}

                            >
                                {games.games.map((g) => (
                                    <MenuItem value={g.name}>
                                        {g.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Edytuj
                    </Button>
                </form>
            </div>
        </Container>
    );
};
