import React from 'react'
import { useHistory } from 'react-router-dom'
import './Header.css'

const Header = ({ logOut, user }) => {
    const history = useHistory()

    const handleLogout = () => {
        logOut()
        history.push('/')
    }

    console.log('user', user)

    const currentUser = user ? [user].map((p) => p.email) : null
    // {currentUser}`s
    return (
        <header className='header'>
            <div className='column corner'>
                <button className='headerButton'>{currentUser}`s  Phonebook</button>
            </div>
            <div className='column middle'></div>
            <div className='column corner'>
                <button className='logOutButton' onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}




export default Header
