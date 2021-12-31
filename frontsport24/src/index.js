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
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AddDiscipline from './components/AddDiscipline';
import Admin from './Admin';
import AddArticle from './components/moderator/create';
import AddGame from './components/moderator/AddGame';
import AddMatches from './components/moderator/AddMatches';
import Edit from './components/moderator/edit';
import Delete from './components/moderator/delete';

const routing = (
	<Router>
		<React.StrictMode>
			<AuthProvider>
				<Header />
				<Switch>
					<Route component={App} path="/" exact />
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
					<Route path="/dis" component={AddDiscipline} />
					<Route exact path="/moderator" component={Admin} />
					<Route exact path="/moderator/create" component={AddArticle} />
					<Route exact path="/moderator/create_game" component={AddGame} />
					<Route exact path="/moderator/create_matches" component={AddMatches} />
					<Route exact path="/moderator/edit/:id" component={Edit} />
					<Route exact path="/moderator/delete/:id" component={Delete} />
				</Switch>
				<Footer />
			</AuthProvider>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

reportWebVitals();