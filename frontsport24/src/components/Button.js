import React from 'react'

const Button = ({type, txt, clickCallback}) => {
    return (
        <button type={type} onClick={clickCallback}>
            <div>
            </div>
            <p>{txt}</p> 
        </button>
    )
}

export default Button