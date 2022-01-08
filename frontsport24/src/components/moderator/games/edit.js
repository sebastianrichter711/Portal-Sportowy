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

export default function EditGame() {
    const history = useHistory();
    const { id } = useParams();

    const initialFormData = Object.freeze({
        db_game_id: '',
        name: '',
        discipline: '',

    });

    const [formData, updateFormData] = useState(initialFormData);
    const [discipline, setDisciplineState] = useState('');

    const [disciplines, setDisciplinesState] = useState({
        disciplines: []
    });

    const handleDisciplineChange = (event) => {
        setDisciplineState(event.target.value);
    };

    var dis_id;
    var nameOfDis = ''

    useEffect(() => {
        axiosInstance.get('edit/gamedetail/' + id + "/").then((res) => {
            updateFormData({
                ...formData,
                //['id']: res.data.id,
                ['db_game_id']: res.data.db_game_id,
                ['name']: res.data.name,
                ['discipline']: res.data.discipline_id,
            });
            dis_id = res.data.discipline_id
            //setDisciplineState(res.data.discipline_id)
            console.log(res.data);
            axiosInstance.get("http://localhost:8000/api/get_discipline/" + res.data.discipline_id).then((res) => {
                setDisciplineState(res.data.name);
                console.log(res.data);
                nameOfDis = res.data.name;
            });
        });

        axiosInstance.get("http://localhost:8000/api/discipline").then((res) => {
            const allDisciplines = res.data;
            setDisciplinesState({ disciplines: allDisciplines });
            console.log(res.data);
        });

        // axiosInstance.get("http://localhost:8000/api/get_discipline/" + dis_id).then((res) => {
        // 	setDisciplineState(res.data.name);
        // 	console.log(res.data);
        // });
    }, [updateFormData, setDisciplinesState]);

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
        console.log(discipline);
        let newFormData = new FormData();
        newFormData.append('db_game_id', formData.db_game_id)
        newFormData.append('name', formData.name)
        newFormData.append('discipline', discipline)
        axiosInstance.put('moderator/edit_game/' + id, newFormData);

        console.log(formData)
        history.push({
        pathname: '/moderator/edit_game/' + id,
        });

        window.location.reload();
    };


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edytuj rozgrywkę
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="id"
                            label="Id artykułu"
                            name="id"
                            autoComplete="id"
                            value={formData.id}
                            onChange={handleChange}
                        />
                    </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="db_game_id"
                                label="DB Id rozgrywki"
                                name="db_game_id"
                                autoComplete="db_game_id"
                                value={formData.db_game_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nazwa"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Dyscyplina</InputLabel>
                            <Select className="custom-select1"
                                name="discipline"
                                value={discipline}
                                onChange={handleDisciplineChange}

                            >
                                {disciplines.disciplines.map((d) => (
                                    <MenuItem value={d.name}>
                                        {d.name}
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
