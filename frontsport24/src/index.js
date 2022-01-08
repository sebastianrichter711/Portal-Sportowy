import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
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
import AddArticle from './components/moderator/articles/create';
import AddGame from './components/moderator/games/AddGame';
import AddMatches from './components/moderator/matches/AddMatches';
import Edit from './components/moderator/articles/edit';
import Delete from './components/moderator/articles/delete';
import EditDis from './components/moderator/discipline/edit';
import DeleteDis from './components/moderator/discipline/delete';
import EditGame from './components/moderator/games/edit';
import DeleteGame from './components/moderator/games/delete';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import DeleteComment from './components/DeleteComment';
import EditComment from './components/EditComment';
import ModeratorArticle from './components/moderator/articles/posts';
import ModeratorResults from './components/moderator/results/results';
import EditSeason from './components/moderator/seasons/edit';
import DeleteSeason from './components/moderator/seasons/delete';
import EditMatch from './components/moderator/matches/edit';
import DeleteMatch from './components/moderator/matches/delete';

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
					<Route exact path="/moderator/create/:section_name" component={AddArticle} />
					<Route exact path="/moderator/create_game" component={AddGame} />
					<Route exact path="/moderator/create_matches" component={AddMatches} />
					<Route exact path="/moderator/edit/:id/" component={Edit} />
					<Route exact path="/moderator/delete/:id" component={Delete} />
					<Route exact path="/moderator/edit_dis/:id" component={EditDis} />
					<Route exact path="/moderator/delete_dis/:id" component={DeleteDis} />
					<Route exact path="/moderator/edit_game/:id" component={EditGame} />
					<Route exact path="/moderator/delete_game/:id" component={DeleteGame} />
					<Route exact path="/moderator/edit_season/:id" component={EditSeason} />
					<Route exact path="/moderator/delete_season/:id" component={DeleteSeason} />
					<Route exact path="/moderator/edit_match/:id" component={EditMatch}/>
					<Route exact path="/moderator/delete_match/:id" component={DeleteMatch} />
					<Route path="/add_discipline" component={AddDiscipline} />
					<Route path="/edituser/:username" component={EditUser} />
					<Route path="/deleteuser/:username" component={DeleteUser} />
					<Route path="/deletecom/:id/:article_id" component={DeleteComment} />
					<Route path="/editcom/:id" component={EditComment} />
					<Route path="/moderator/results" component={ModeratorResults} />


				</Switch>
				<Footer />
			</AuthProvider>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

reportWebVitals();