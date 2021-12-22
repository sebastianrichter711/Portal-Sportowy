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
    const [season, setSeasonState] = React.useState('');
    const [phase, setPhaseState] = useState('');
    const [round, setRoundState] = useState('');

    const handleSeasonChange = (event) => {
        setSeasonState(event.target.value);
    };

    const handlePhaseChange = (event) => {
        setPhaseState(event.target.value);
    };

    const handleRoundChange = (event) => {
        setRoundState(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var url = "http://localhost:8000/api/get_matches/" + season + "/" + phase + "/" + round + "/" + name
        console.log(url);
        axiosInstance.get(url).then((res) => {
            const gotGames = res.data;
            setAppState({ games: gotGames });
            console.log(res.data);
        })
        return <p>Can not find any posts, sorry</p>;
        //if (!appState.games || appState.games.length === 0) return <p>Can not find any posts, sorry</p>
    };

    const classes = useStyles();
    //console.log(appState.games)
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <br/>
                <br/>
                <br/>
                <Grid container spacing={3} xs={8} alignItems="center">
                    <br/>
                    <br/>
                    <br/>
                    <h1 className={classes.results}> WYNIKI - {name} </h1>
                    <br />
                    <div className="container 1">
                        <Select className="custom-select1"
                            value={season}
                            onChange={handleSeasonChange}

                        >
                            <MenuItem value="2021-2022">2021-2022</MenuItem>
                            <MenuItem value="2020-2021">2020-2021</MenuItem>
                            <MenuItem value="2019-2020">2019-2020</MenuItem>
                        </Select>
                    </div>
                    <div className="container 2">
                        <Select className="custom-select2"
                            value={phase}
                            onChange={handlePhaseChange}
                        >
                            <MenuItem value="grupowa">grupowa</MenuItem>
                            <MenuItem value="pucharowa">pucharowa</MenuItem>
                        </Select>
                    </div>
                    <div className="container 3">
                        <Select className="custom-select3"
                            value={round}
                            onChange={handleRoundChange}
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="17">17</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                        </Select>
                    </div>
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