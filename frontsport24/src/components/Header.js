import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import logo from '../images/logo.png'
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import fb from '../images/fb.png'
import insta from '../images/insta.png'
import twit from '../images/twit.png'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Slide } from '@material-ui/core';
import AuthContext from './AuthContext';
import UnregisteredUser from './UnregisteredUser';
import RegisteredUser from './RegisteredUser';


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
	fbLogo: {
		width: '45px',
		height: '45px',
		//position: absolute,
		//top: 4%,
		//left: 69.5%,
	},
	twLogo: {
		width: '45px',
		height: '45px',
		//position: absolute,
		//top: 4%,
		//left: 74.3%,
	},
	insLogo: {
		width: '45px',
		height: '45px',
		//position: absolute,
		// top: 4%,
		// left: 79%,
	}
}));

function ScrollTop(props) {

	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor',
		);

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				{children}
			</Box>
		</Zoom>
	);
}

ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default function Header(props) {
	let { user, logoutUser } = useContext(AuthContext)
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
			<ElevationScroll {...props}>
				<AppBar
					posiiton="static"
					elevation={0}
					color='#006600'
					className={classes.appBar}
				>
					<Toolbar className={classes.toolbar} id="back-to-top-anchor">
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
								<img src={logo} alt="logo" className={classes.logo} />
							</Link>
						</Typography>
						<a href="https://facebook.com">
							<img src={fb} alt="fb" className={classes.fbLogo} />
						</a>
						&nbsp;
						<a href="https://twitter.com">
							<img src={twit} alt="twit" className={classes.twLogo} />
						</a>
						&nbsp;
						<a href="https://instagram.com">
							<img src={insta} alt="insta" className={classes.insLogo} />
						</a>
						&ensp;
						<SearchBar
							placeholder="Szukaj..."
							value={data.search}
							onChange={(newValue) => setData({ search: newValue })}
							onRequestSearch={() => goSearch(data.search)}
						/>
						{(user!="xxx") ? (
							<RegisteredUser />
						) : (
							<UnregisteredUser />
						)}
						{(user!="xxx") &&
							<Button href="/profile" variant="contained">
								{user.username}
							</Button>
						}
						{(user.role == "moderator-art") && <Button href="/moderator" variant="contained">
								PANEL MODERATROSKI 
							</Button>}
						{(user.role == "moderator-wyniki") && <Button href="/moderator/results" variant="contained">
								PANEL MODERATROSKI - WYNIKI
							</Button>}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
		</React.Fragment>
	);
}

//export default Header;