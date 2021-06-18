import React from 'react'
import Filter from './Filter'


const PersonForm = ({
    addNewPerson,
    newName,
    handleNameChange,
    handleNumberChange,
    newNumber,
    searchTerm,
    handleNameFilter,
}) => {
    const changeBackground = (e) => {
        e.target.style.background = 'rgba(3, 166, 27, 0.68)'
    }

    const changeBackground2 = (e) => {
        e.target.style.background = '#2E8B57'
    }

    const peronFormStyle = {
        position: 'relative',
        marginTop: '7rem',
    }

    return (
        <div style={peronFormStyle}>
            <Filter
                                searchTerm={searchTerm}
                                handleNameFilter={handleNameFilter}
                            />
            <div style={addPersonBox}>
                <h3>Add a new person:</h3>
                <form onSubmit={addNewPerson}>
                    Name:
                    <label style={nameLabel}>
                        <input
                            style={nameInput}
                            name='nameInput'
                            value={newName}
                            onChange={handleNameChange}
                            placeholder='John Doe'
                        />
                    </label>
                    Number:
                    <label style={numberLabel}>
                        <input
                            style={numberInput}
                            name='numberInput'
                            type='number'
                            value={newNumber}
                            onChange={handleNumberChange}
                            placeholder='0447351234'
                        />
                    </label>
                    <div style={submitButtonParagraph}>
                        <button
                            onMouseEnter={changeBackground}
                            onMouseLeave={changeBackground2}
                            style={addPersonButton}
                            type='submit'
                        >
                            add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const nameLabel = {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '6px',
}


const numberLabel = {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '6px',

}

const nameInput = {
    marginTop: '5px',
    textAlign: 'center',
    borderRadius: '0.3rem',
}

const numberInput = {
    marginTop: '5px',
    textAlign: 'center',
    borderRadius: '0.3rem',
}

const submitButtonParagraph = {
    padding: '6px 6px',
}

const addPersonButton = {
    background: '#2E8B57',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5%',
    cursor: 'pointer',
    textAlign: 'right',
    border: 'none',
}

const addPersonBox = {
    backgroundColor: 'rgba(89, 91, 62, 0.57)',
    margin: 'auto',
    marginTop: '1.5rem',

    borderRadius: '10pt',
    width: '260px',

    padding: '10px',
}



export default PersonForm
