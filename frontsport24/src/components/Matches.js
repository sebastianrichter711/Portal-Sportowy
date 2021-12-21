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

const seasons = [
    { label: '2021-2022' },
    { label: '2020-2021' },
    { label: '2019-2020' }
]

const phases = [
    { label: 'grupowa' },
    { label: 'pucharowa' }
]


function Matches() {

    const { name } = useParams();
    const [appState, setAppState] = useState({
        games: [],
    });
    const [season, setSeasonState] = useState("2021-2022"
    );
    const [phase, setPhaseState] = useState("grupowa");
    const [round, setRoundState] = useState("17");

    var new_season, new_phase, new_round; 
    const handleChangeSeason = (e) => {
        const selectedSeason = e.target.value;
        setSeasonState(selectedSeason);
        new_season = e.target.value;
    }

    const handleChangePhase = (e) => {
        const selectedPhase = e.target.value;
        setPhaseState(selectedPhase);
        new_phase = e.target.value;
    }

    const handleChangeRound = (e) => {
        const selectedRound = e.target.value;
        setRoundState(selectedRound);
        new_round = e.target.value;
    }

    useEffect(() => {
        setSeasonState("2021-2022");
        setPhaseState("grupowa");
        setRoundState("1");
        var url = "http://localhost:8000/api/get_matches/" + new_season + "/" + new_phase + "/" + new_round + "/" + name
        axiosInstance.get(url).then((res) => {
            const gotGames = res.data;
            setAppState({ games: gotGames });
            console.log(res.data);
        });
    }, [setAppState, setSeasonState, setPhaseState, setRoundState]);

    const classes = useStyles();
    //console.log(appState.games)
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={1} xs={8} alignItems="center">
                    <h1 className={classes.results}> WYNIKI - {name} </h1>
                    <br />
                    <div className="container 1">
                        <select className="custom-select1"
                            value={season}
                            onChange={handleChangeSeason}
                        >
                            <option value="2021-2022">2021-2022</option>
                            <option value="2020-2021">2020-2021</option>
                            <option value="2019-2020">2019-2020</option>
                        </select>
                    </div>
                    <div className="container 2">
                        <select className="custom-select2"
                            value={phase}
                            onChange={handleChangePhase}
                        >
                            <option value="grupowa">grupowa</option>
                            <option value="pucharowa">pucharowa</option>
                        </select>
                    </div>
                    <div className="container 3">
                        <select className="custom-select3"
                            value={round}
                            onChange={handleChangeRound}
                        >
                            <option value="1">1</option>
                            <option value="17">17</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    {appState.games.map((game) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <p>{game.match_date} {game.host} {game.score} {game.guest}</p>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Matches;