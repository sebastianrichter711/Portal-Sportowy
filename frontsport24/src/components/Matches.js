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
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

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
    photo: {
        width: '30px',
        height: '30px'
    },
    results: {
        textAlign: "left"
    }
}));


function Matches() {

    const { name } = useParams();
    const [appState, setAppState] = useState({
        games: [],
    });
    const [season, setSeasonState] = React.useState('');
    const [phase, setPhaseState] = useState('');
    const [round, setRoundState] = useState('');

    const [seasons, setSeasonsState] = useState({
        seasons: []
    })
    const [rounds, setRoundsState] = useState({
        rounds: []
    })

    const handleSeasonChange = (event) => {
        setSeasonState(event.target.value);
        var url = "http://localhost:8000/api/get_rounds/" + event.target.value + "/" +  name
        axiosInstance.get(url).then((res) => {
            const gotRounds = res.data;
            setRoundsState({ rounds: gotRounds });
            console.log(res.data);
        });
    };

    const handlePhaseChange = (event) => {
        setPhaseState(event.target.value);
        // var url = "http://localhost:8000/api/get_rounds/" + season + "/" + event.target.value + "/" +  name
        // axiosInstance.get(url).then((res) => {
        //     const gotRounds = res.data;
        //     setRoundsState({ rounds: gotRounds });
        //     console.log(res.data);
        // });
    };

    const handleRoundChange = (event) => {
        setRoundState(event.target.value);
    };

    useEffect(() => {
        var url = "http://localhost:8000/api/get_seasons/" + name
        axiosInstance.get(url).then((res) => {
            const gotSeasons = res.data;
            setSeasonsState({ seasons: gotSeasons });
            console.log(res.data);
        });
    }, [setSeasonsState]);


    const handleSubmit = (e) => {
        e.preventDefault();
        var url = "http://localhost:8000/api/get_matches/" + season + "/" + round + "/" + name
        console.log(url);
        axiosInstance.get(url).then((res) => {
            const gotGames = res.data;
            setAppState({ games: gotGames });
            console.log(res.data);
        });
        //if (!appState.games || appState.games.length === 0) return <p>Can not find any posts, sorry</p>
    };

    const classes = useStyles();
    //console.log(appState.games)
    //if (!appState.games || appState.games.length === 0) return <p>Can not find any posts, sorry</p>
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <br />
                <br />
                <br />
                <Grid container spacing={3} xs={8} alignItems="center">
                    <br />
                    <br />
                    <br />
                    <h1 className={classes.results}> WYNIKI - {name} </h1>
                    <br />
                </Grid>
                <Grid container spacing={5} xs={8} alignItems="center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Sezon</InputLabel>
                        <Select className="custom-select1"
                            value={season}
                            onChange={handleSeasonChange}

                        >
                            {seasons.seasons.map((s) => (
                                <MenuItem value={s.season}>
                                    {s.season}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Faza</InputLabel>
                        <Select className="custom-select2"
                            value={phase}
                            onChange={handlePhaseChange}
                        >
                           {phases.phases.map((p) => (
                                <MenuItem value={p.phase}>
                                    {p.phase}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Runda</InputLabel>
                        <Select className="custom-select3"
                            value={round}
                            onChange={handleRoundChange}
                        >
                            {rounds.rounds.map((r) => (
                                <MenuItem value={r.round}>
                                    {r.round}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Pokaż wyniki
                    </Button>
                    {appState.games.map((game) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <p>{game?.match_date} {game?.host} {game?.score} {game?.guest}</p>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Matches;