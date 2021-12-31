import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
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

export default function Edit() {
    const history = useHistory();
    const { id } = useParams();
    const initialFormData = Object.freeze({
        //articleId: '',
        title: '',
        dateOfCreate: '',
        dateOfLastChange: '',
        leadText: '',
        text: '',
        pageViews: '',
        commentsNumber: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/api/article/" + id).then((res) => {
            updateFormData({
                ...formData,
                //['articleId']: res.data.id,
                ['title']: res.data.title,
                ['dateOfCreate']: res.data.date_of_create,
                ['dateOfLastChange']: res.data.date_of_last_change,
                ['leadText']: res.data.lead_text,
                ['text']: res.data.text,
                ['pageViews']: res.data.page_views,
                ['commentsNumber']: res.data.comments_number,

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

        axiosInstance.put('moderator/edit/' + id, {
            //articleId: formData.articleId,
            title: formData.title,
            dateOfCreate: formData.dateOfCreate,
            dateOfLastChange: formData.dateOfLastChange,
            leadText: formData.leadText,
            text: formData.text,
            pageViews: formData.pageViews,
            commentsNumber: formData.commentsNumber
        });

        history.push({
            pathname: '/moderator/edit/' + id,
        });

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
                            id="articleId"
                            label="Id artykułu"
                            name="articleId"
                            autoComplete="articleId"
                            value={formData.articleId}
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
                            id="dateOfCreate"
                            label="Data utworzenia"
                            name="dateOfCreate"
                            autoComplete="dateOfCreate"
                            value={formData.dateOfCreate}
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
                            id="dateOfLastChange"
                            label="Data ostatniej modyfikacji"
                            name="dateOfLastChange"
                            autoComplete="dateOfLastChange"
                            value={formData.dateOfLastChange}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="leadText"
                            label="Tekst początkowy"
                            name="leadText"
                            autoComplete="leadText"
                            value={formData.leadText}
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
                            id="pageViews"
                            label="Liczba odsłon"
                            name="pageViews"
                            autoComplete="pageViews"
                            value={formData.pageViews}
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
                            id="commentsNumber"
                            label="Liczba komentarzy"
                            name="commentsNumber"
                            autoComplete="commentsNumber"
                            value={formData.commentsNumber}
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
