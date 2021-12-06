import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import logo from '../images/logo.png'
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import fb from '../images/fb.png'
import insta from '../images/insta.png'
import twit from '../images/twit.png'

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
    toolbar: {
        backgroundColor: '#006600'
    },
    logo: {
        width: '300px'
    },
    fbLogo:{
		width: '60px',
		height: '60px',
		//position: absolute,
		//top: 4%,
		//left: 69.5%,
	},
	twLogo: {
		width: '0.000000001px',
		height: '0.00000001px',
		//position: absolute,
		//top: 4%,
		//left: 74.3%,
	},
	insLogo: {
		width: '0.1px',
		height: '0.1px',
		//position: absolute,
		// top: 4%,
		// left: 79%,
	}
}));

function Header() {
	const classes = useStyles();
    let history = useHistory();
    const [data, setData] = useState({ search: '' });

	const goSearch = (e) => {
		history.push({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
    };
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color='#006600'
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							<img src={logo} alt="logo" className={classes.logo}/>
						</Link>
					</Typography>
                    <SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>
					<nav>
					{/* <Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							<img src={fb} alt="fb" className={classes.fbLogo}/>
						</Link>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							<img src={twit} alt="insta" className={classes.twitLogo}/>
						</Link>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							<img src={insta} alt="twit" className={classes.instaLogo}/>
						</Link> */}
						<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					<Button
						href="#"
						color="white"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					<Button
						href="#"
						color="white"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;