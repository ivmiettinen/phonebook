import React from 'react'

const Header = () => {
    return (
        <>
            <header style={headerStyle}>
                <h1>Phonebook</h1>
            </header>
            <div style={logoutStyle}>
                <h1 style={logoutStyle}>Logout</h1>
            </div>
        </>
    )
}
const headerStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '5rem',
    backgroundColor: 'rgba(89, 91, 62, 0.77)',
    color: '#080808   ',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10%',
    opacity: '80%',
}

const logoutStyle = {
    textAlign: 'right',
    margin: '1.5rem',
    color: '#080808  ',
}

export default Header
