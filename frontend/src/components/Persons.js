import React from 'react'

const Persons = ({ results, handleDelete }) => {
    const changeBackground = (e) => {
        e.target.style.background = '#F5F5F5'
        e.target.style.color = '#ed1212'
    }

    const changeBackground2 = (e) => {
        e.target.style.background = 'rgba(206, 208, 200, 0.39)'
        e.target.style.color = '#fff'
    }

    const mapping = results.map((result) => {
        return (
            <div style={personsSpan} key={result.id}>
                <div style={lightGreyBox}>
                    {result.name}: {result.number}
                    <span className='buttonStyle1hover'>
                        <div>
                            <button
                                onMouseEnter={changeBackground}
                                onMouseLeave={changeBackground2}
                                style={buttonStyle1}
                                onClick={handleDelete}
                                value={result.id}
                            >
                                Delete
                            </button>
                        </div>
                    </span>
                </div>
            </div>
        )
    })

    return <>{mapping}</>
}

const personsSpan = {
    margin: '7px',
}

const lightGreyBox = {
    backgroundColor: 'rgba(206, 208, 200, 0.39)',
    padding: '8px',
    margin: 'auto',
    borderRadius: '10pt',
    width: '260px',
    border: '1px solid rgba(89, 91, 62, 0.57)',
}

const buttonStyle1 = {
    color: '#fff',
    padding: '0.5rem 0',
    cursor: 'pointer',

    margin: '0.5rem 1rem',
    width: '8rem',
    background: 'transparent',
    border: '2px solid white',
    fontWeight: 'bold',
    display: 'inline-block',
    borderRadius: '10px',
}

export default Persons
