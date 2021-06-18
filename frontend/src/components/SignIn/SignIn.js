import React from 'react'
import { useHistory } from 'react-router-dom'

const SignIn = ({ setShowLogIn }) => {
    const history = useHistory()

    const registerButtonHandler = () => {
        setShowLogIn(false)

        history.push('/register')
    }

    const loginBtnHandler = () => {
        setShowLogIn(true)
        history.push('/login')
    }

    const changeBackground = (e) => {
        e.target.style.background = 'rgba(145, 137, 137, 0.78)'
    }

    const changeBackground2 = (e) => {
        e.target.style.background = 'grey'
    }

    return (
        <div style={signInDiv}>
            <h1 style={h1Header}>Phonebook</h1>
            <button
                style={SignInButtons}
                onClick={loginBtnHandler}
                onMouseEnter={changeBackground}
                onMouseLeave={changeBackground2}
            >
                Login
            </button>
            <button
                style={SignInButtons}
                onClick={registerButtonHandler}
                onMouseEnter={changeBackground}
                onMouseLeave={changeBackground2}
            >
                Register
            </button>
        </div>
    )
}
const h1Header = {
    textDecorationLine: 'underline'
}

const signInDiv = {
    padding: '3rem 0rem',
    backgroundColor: 'rgba(206, 208, 200, 0.88)',
    margin: '2rem auto',
    width: '50rem',
    maxWidth: '95%',
    borderRadius: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    opacity: '0.9',
    fontSize: '24px',

    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const SignInButtons = {
    font: 'inherit',
    border: 'rgba(222, 219, 230, 0.88)',
    background: 'grey',
    color: 'white',
    padding: '0.25rem 1rem',
    cursor: 'pointer',
    borderRadius: '0.8rem',
    margin: '1rem',
}

export default SignIn
