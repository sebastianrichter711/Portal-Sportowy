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
        id: '',
        title: '',
        date_of_create: '',
        date_of_last_change: '',
        lead_text: '',
        text: '',
        page_views: '',
        comments_number: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        axiosInstance.get('moderator/edit/postdetail/' + id).then((res) => {
            updateFormData({
                ...formData,
                //['id']: res.data.id,
                ['title']: res.data.title,
                ['date_of_create']: res.data.date_of_create,
                ['date_of_last_change']: res.data.date_of_last_change,
                ['lead_text']: res.data.lead_text,
                ['text']: res.data.text,
                ['page_views']: res.data.page_views,
                ['comments_number']: res.data.comments_number,

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

        axiosInstance.put('moderator/edit/' + id + "/", {
            //id: formData.id,
            title: formData.title,
            date_of_create: formData.date_of_create,
            date_of_last_change: formData.date_of_last_change,
            lead_text: formData.lead_text,
            text: formData.text,
            page_views: formData.page_views,
            comments_number: formData.comments_number
        });

        console.log(formData)
        // history.push({
        //     pathname: '/moderator/edit/' + id,
        // });

        //window.location.reload();
    };
        

    const classes = useStyles();

return (
    <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Edytuj artykuł
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
                            id="title"
                            label="Tytuł"
                            name="title"
                            autoComplete="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="date_of_create"
                            label="Data utworzenia"
                            name="date_of_create"
                            autoComplete="date_of_create"
                            value={formData.date_of_create}
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
                            id="date_of_last_change"
                            label="Data ostatniej modyfikacji"
                            name="date_of_last_change"
                            autoComplete="date_of_last_change"
                            value={formData.date_of_last_change}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lead_text"
                            label="Tekst początkowy"
                            name="lead_text"
                            autoComplete="lead_text"
                            value={formData.lead_text}
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
                            id="text"
                            label="Tekst"
                            name="text"
                            autoComplete="text"
                            value={formData.text}
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
                            id="page_views"
                            label="Liczba odsłon"
                            name="page_views"
                            autoComplete="page_views"
                            value={formData.page_views}
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
                            id="comments_number"
                            label="Liczba komentarzy"
                            name="comments_number"
                            autoComplete="comments_number"
                            value={formData.comments_number}
                            onChange={handleChange}
                            multiline
                            rows={8}
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
