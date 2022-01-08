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

// /**
//  * @params {File[]} files Array of files to add to the FileList
//  * @return {FileList}
//  */
// function FileListItems(files) {
//     var b = new ClipboardEvent("").clipboardData || new DataTransfer()
//     for (var i = 0, len = files.length; i < len; i++) b.items.add(files[i])
//     return b.files
// }

export default function EditDiscipline() {
    const history = useHistory();
    const { id } = useParams();
    const initialFormData = Object.freeze({
        name: '',
    });

    const [formData, updateFormData] = useState(initialFormData);
    //const [postImage, setPostImage] = useState(null);

    //let list = new DataTransfer();
    useEffect(() => {
        axiosInstance.get('edit/disdetail/' + id).then((res) => {
            updateFormData({
                ...formData,
                //['id']: res.data.id,
                ['name']: res.data.name,
                //['icon']: res.data.icon

            });
            // let postimage = document.getElementById('postimage')
            // var files = [
            //     new File([''], res.data.icon)
            // ];
            // postimage.files = new FileListItems(files)
            // var newList = new FileListItems(files)
            // //list.items.add(file);
            // console.log(postimage.files);
            // setPostImage({
            //     image: postimage.files
            // })
            // console.log(postImage);

        });
    }, [updateFormData]);

    const handleChange = (e) => {
        // if ([[e.target.name] == 'image']) {
        //     setPostImage({
        //         image: e.target.files,
        //     });
        //     console.log(e.target.value);
        // }
        if ([e.target.name] == 'name') {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),

            });
            console.log(e.target.value)
        } else {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        let newFormData = new FormData();
        newFormData.append('name', formData.name)
        //newFormData.append('icon', postImage.image[0])
        axiosInstance.put('moderator/edit_dis/' + id, newFormData);

        console.log(newFormData)
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
                    Edytuj dyscyplinę
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nazwa"
                                name="name"
                                autoComplete="name"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </Grid>
                        {/* <input
                            accept='image/*'
                            className={classes.input}
                            id="postimage"
                            onChange={handleChange}
                            name="image"
                            type="file"
                        /> */}
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
