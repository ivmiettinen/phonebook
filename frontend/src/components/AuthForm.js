import React, { useState } from 'react'

const AuthForm = ({ handleLogin, loggedIn, setErrorMessage }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = (e) => {
        e.preventDefault()

        if (email.trim().length < 3) {
            console.log('arg')
            setErrorMessage('Email must be at least 3 characters long.')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        } else if (password.trim().length < 3) {
            setErrorMessage('password must be 3 letters or longer.')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        } else {
            handleLogin({
                email: email,
                password: password,
            })
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div style={authButtons}>
            <form onSubmit={handleSignIn}>
                <h2>sign in</h2>
                <p>
                    <label style={loginLabel}>
                        <input
                            style={LoginformInput}
                            type='email'
                            value={email}
                            name='email'
                            placeholder='Your email...'
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </label>
                </p>

                <p>
                    <label style={loginLabel}>
                        <input
                            style={LoginformInput}
                            type='password'
                            value={password}
                            name='Password'
                            placeholder='Your password...'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </p>
                <p>
                    <button type='submit'>
                        {loggedIn ? 'Sign up' : 'login'}
                    </button>
                </p>
            </form>
        </div>
    )
}

const authButtons = {
    padding: '3rem 0rem',
    margin: '2rem auto',
    width: '50rem',
    maxWidth: '95%',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    opacity: '0.9',
    fontSize: '24px',
    textAlign: 'center',
    backgroundColor: 'rgba(206, 208, 200, 0.88)',

    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const loginLabel = {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    placeItems: 'center',
}

const LoginformInput = {
    height: '20px',
    flex: '0 0 200px',
    marginLeft: '1em',
    marginRight: '1em',
    borderStyle: 'solid',
    borderRadius: '3.5px',
}

export default AuthForm
