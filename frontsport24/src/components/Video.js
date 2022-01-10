import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import ReactPlayer from 'react-player'
import fb from '../images/fb.png'

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
    mainPhoto: {
        width: '800px',
        height: '600px',
        paddingTop: '1.25%'
    },
    video: {
        marginLeft: '440px'
    }
}));

const VideoJS = () => {
    const classes = useStyles();
    const videoSrc = 'https://www.youtube.com/watch?v=YFIFcjovxCM'
    return(
        <div className={classes.video}>
            <ReactPlayer
            controls
            url={videoSrc}
            />
        </div>

    )
}

export default VideoJS;