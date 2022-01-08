import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default function EditComment() {
    const history = useHistory();
    const { id } = useParams();
    const initialFormData = Object.freeze({
        author_id: null, 
        date_of_create: null,
        text: '',
        article_id: null,
    });

    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        axiosInstance.get('com/detail/' + id).then((res) => {
            updateFormData({
                ...formData,
                //['id']: res.data.id,
                ['author_id']: res.data.author_id,
                ['date_of_create']: res.data.date_of_create,
                ['text']: res.data.text,
                ['article_id']: res.data.article_id
            });
            console.log(res.data);
        });
    }, [updateFormData]);

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

        axiosInstance.put('/editcom/' + id, {
            //id: formData.id,
            author_id: formData.author_id, 
            date_of_create: formData.date_of_create,
            text: formData.text,
            article_id : formData.article_id,
        });

        console.log(formData)
        history.push({
             pathname: '/posts/' + formData.article_id,
        });

        window.location.reload();
    };
        

    const classes = useStyles();

return (
    <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Edytuj Twój komentarz
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
                            id="text"
                            label="Tekst"
                            name="text"
                            autoComplete="text"
                            value={formData.text}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </Grid>
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
