import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : "xxx")
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : "xxx")

    const history = useHistory();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
        })
        let data = await response.json()
        console.log('dta: ', data)
        console.log('res: ', response)

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access))
            console.log(authTokens)
            console.log(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')

        } else {
            alert("Niepoprawny email lub hasło!");
        }
        console.log(user)
    }

    let logoutUser = () => {
        setAuthTokens("xxx")
        setUser("xxx")
        localStorage.removeItem('authTokens')
        history.push('/login')
    }


    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}