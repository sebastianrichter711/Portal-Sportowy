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

export default function EditMatch() {
    const history = useHistory();
    const { id } = useParams();

    const initialFormData = Object.freeze({
        match_date: '',
        host: '',
        guest: '',
        score: '',
        season: ''

    });

    const [formData, updateFormData] = useState(initialFormData);
    const [season, setSeasonState] = useState('');

    const [seasons, setSeasonsState] = useState({
        seasons: []
    });

    const handleSeasonChange = (event) => {
        setSeasonState(event.target.value);
    };

    useEffect(() => {
        axiosInstance.get('edit/matchdetail/' + id + "/").then((res) => {
            updateFormData({
                ...formData,
                //['id']: res.data.id,
                ['match_date']: res.data.match_date,
                ['host']: res.data.host,
                ['guest']: res.data.guest,
                ['score']: res.data.score,
                ['season']: res.data.season_id

            });
            console.log(res.data);
            axiosInstance.get("http://localhost:8000/api/get_season/" + res.data.season_id).then((res) => {
                setSeasonState(res.data.season_id);
                console.log(res.data);
            });
        });

        axiosInstance.get("http://localhost:8000/api/seasons_moderator").then((res) => {
            const allSeasons = res.data;
            setSeasonsState({ seasons: allSeasons });
            console.log(res.data);
        });

        // axiosInstance.get("http://localhost:8000/api/get_discipline/" + dis_id).then((res) => {
        // 	setDisciplineState(res.data.name);
        // 	console.log(res.data);
        // });
    }, [updateFormData, setSeasonsState]);

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
        newFormData.append('match_date', formData.match_date)
        newFormData.append('host', formData.host)
        newFormData.append('guest', formData.guest)
        newFormData.append('score', formData.score)
        newFormData.append('season', season)
        axiosInstance.put('moderator/edit_match/' + id, newFormData);

        console.log(formData)
        history.push({
        pathname: '/moderator/edit_match/' + id,
        });

        window.location.reload();
    };


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edytuj mecz
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="match_date"
                                label="Data spotkania"
                                name="match_date"
                                autoComplete="match_date"
                                value={formData.match_date}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="host"
                                label="Gospodarz"
                                name="host"
                                autoComplete="host"
                                value={formData.host}
                                onChange={handleChange}
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="guest"
                                label="Gość"
                                name="guest"
                                autoComplete="guest"
                                value={formData.guest}
                                onChange={handleChange}
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="score"
                                label="Wynik"
                                name="score"
                                autoComplete="score"
                                value={formData.score}
                                onChange={handleChange}
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Sezon</InputLabel>
                            <Select className="custom-select1"
                                name="season"
                                value={season}
                                onChange={handleSeasonChange}

                            >
                                {seasons.seasons.map((s) => (
                                    <MenuItem value={s.season_id}>
                                        {s.game_name} {s.season} {s.phase} {s.round}
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
