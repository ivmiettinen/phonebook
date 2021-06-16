import React from 'react'
import { useHistory } from 'react-router-dom'
import './Header.css'

const Header = ({ logOut }) => {
    const history = useHistory()

    const handleLogout = () => {
        console.log('clickclck')
        logOut()
        history.push('/')
    }

    return (
        <header className='header'>
            <div className='column corner'>
                <button className='headerButton'>Phonebook</button>
            </div>
            <div className='column middle'></div>
            <div className='column corner'>
                <button className='logOutButton' onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}




export default Header
