import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import reportWebVitals from './reportWebVitals';
import Search from './components/SearchArticles';
import Post from './components/Post';
import ArticlesSections from './components/ArticlesSections';
import Disciplines from './components/Disciplines';
import Games from './components/Games';
import Matches from './components/Matches';
import UserData from './components/UserData';
import ArticleComments from './components/ArticleComments';

const routing = (
	<Router>
		<React.StrictMode>
			<Header />
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/search" component={Search} />
				<Route path="/posts/:id" component={Post} />
				<Route path="/sections/:name" component={ArticlesSections} />
				<Route path="/disciplines" component={Disciplines} />
				<Route path="/games/:name" component={Games} />
				<Route path="/matches/:name" component={Matches} />
				<Route path="/profile" component={UserData} />
			</Switch>
			<Footer />
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

reportWebVitals();