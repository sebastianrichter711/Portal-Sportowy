import '../App.css'
import { useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";
import LoginForm from './components/LoginForm';
import {LINKS} from "./shared/consts";
import Header from "./components/Header.js";


function App() {

  const [links, setLinks] = useState([]);
  const [position, setPosition] = useState("");
  const [logged, setLogged] = useState(false);
  const handleLoginLogout = (pos) => {
      setPosition(pos);
        if (pos in LINKS) {
            setLinks(LINKS[pos]);
          } else {
            setLinks([]);
          }
          setLogged(true);
        }
  const handleLogout = () => {
          localStorage.removeItem("token");
          setLogged(false);
  }

  return (
    <div>
      <Router>
        <Header logged={logged} links={links} logoutCallback={handleLogout}  />
        <Switch>
            <Route path="/login">
              <LoginForm headerCallback={handleLoginLogout}/>
            </Route>            
            </Switch>
      </Router>
    </div>
  )
}

export default App;