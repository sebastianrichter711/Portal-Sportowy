import {useState} from 'react'
import Button from './Button'
import usePost from "../hooks/usePost"
const LoginForm = ({headerCallback}) => {

    const [loginError, setLoginError] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [usernameError, setUsernameError] = useState(false);    
    const [passwordError, setPasswordError] = useState(false);
    const [res, login, err] = usePost("login", credentials);

    function handleUsername(e) {
        setCredentials({...credentials, username: e.target.value});
        setUsernameError(e.target.value.trim() === "")
    }
    
    function handlePassword(e) {
        setCredentials({...credentials, password: e.target.value});
        setPasswordError(e.target.value.trim() === "")
    }

    function handleLogin(e) {

        e.preventDefault();
        if (!usernameError && !passwordError) {
            console.log(credentials);
            login();
            if (!err) {
                localStorage.setItem("token", res.token);
                headerCallback(res.position)
                setLoginError(false);
            } else {
                setLoginError(true);
            }
            
        }
    }

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <div className="logo"/>
            {loginError && 
                <p>Błąd logowania</p>
                }
            <input type="text" placeholder="Login" onChange={handleUsername} value={credentials.username}/>
            {usernameError && 
                <p>Proszę wpisać login</p>
                }
            <input type="password" placeholder="Hasło" onChange={handlePassword} value={credentials.password}/>
            {passwordError && 
                <p>Proszę wpisać hasło</p>
                }
            <Button type="submit" txt="Zaloguj"/>
        </form>
    )
}

export default LoginForm