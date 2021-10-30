import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"

const Header = ({logged, links, logoutCallback}) => {
    const [logout, setLogout] = useState(false);
    useEffect(() => setLogout(logged), [logged]);
    return (
        <header>
            {logout &&
                <>
                <div className="links">
                    {links.map((link, index) => {
                        return <Link key={index} to={link.link}>{link.name}</Link>
                    })}
                </div>
                <div className="logo-header"></div>
                <Link to="/login" onClick={logoutCallback}>Wyloguj</Link> 
                </>
            } 
        </header>
    )
};

export default Header;