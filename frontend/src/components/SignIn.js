import React, { useState } from 'react'

const SignIn = ({setShowSignUp, setShowLogIn}) => {
    

    const handleClick = (e) => {
        console.log('click', e.target.value)
    }

    const registerButtonHandler = () => {
        setShowSignUp(true)
        setShowLogIn(false)
    }

    const loginBtnHandler = () => {
        setShowLogIn(true)
        setShowSignUp(false)

    }


    return (
        <div style={authButtonDiv}>
            <button style={authButtons} onClick={loginBtnHandler} >Log in</button>
            <button style={authButtons} onClick={registerButtonHandler} >Register</button>
        </div>
    )
}

const authButtonDiv = {
    padding: '3rem 0rem',
    backgroundColor: 'rgba(206, 208, 200, 0.88)',
    margin: '2rem auto',
    width: '50rem',
    maxWidth: '95%',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    opacity: '0.9',
    fontSize: '24px',
}

const authButtons = {
    font: 'inherit',
    border: 'rgba(222, 219, 230, 0.88)',
    background: 'grey',
    color: 'white',
    padding: '0.25rem 1rem',
    cursor: 'pointer',
    borderRadius: '12px',
    margin: '1rem'
    
}


export default SignIn
