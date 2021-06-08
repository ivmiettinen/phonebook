import React from 'react'
import { useHistory } from 'react-router-dom'

const SignIn = ({ setShowSignUp, setShowLogIn }) => {
    const history = useHistory()

    const registerButtonHandler = () => {
        setShowSignUp(true)
        setShowLogIn(false)

        history.push('/register')
    }

    const loginBtnHandler = () => {
        setShowLogIn(true)
        setShowSignUp(false)
        history.push('/login')
    }

    return (
        <div style={signInDiv}>
            <button style={SignInButtons} onClick={loginBtnHandler}>
                Login
            </button>
            <button style={SignInButtons} onClick={registerButtonHandler}>
                Register
            </button>
        </div>
    )
}

const signInDiv = {
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
    borderRadius: '12px',
    margin: '1rem',
}

export default SignIn
