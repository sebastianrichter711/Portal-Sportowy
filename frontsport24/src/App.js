import React, {useState} from 'react';
import './style.css'
import MainPage from './components/MainPage';
import Create from './components/AddDiscipline';
import Search from './components/SearchArticles';
import SearchBar from 'material-ui-search-bar';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

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
}));


function App () {
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
      <div className="div">
        <SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>
      </div>
    );
  }

export default App;
