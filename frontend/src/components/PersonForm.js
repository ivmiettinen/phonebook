import React from 'react';
import '../App.css';

const PersonForm = ({
  addNewPerson,
  newName,
  handleNameChange,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <div className='center'>
      <div style={addPersonBox}>
        <form onSubmit={addNewPerson}>
          <div className='inputDiv'>
            Name:
            <input
              className='inputField1'
              value={newName}
              onChange={handleNameChange}
            />
            Number:
            <input
              className='inputField2'
              type='number'
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <div style={submitButtonParagraph}>
            <button style={addPersonButton} type='submit'>
              add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const submitButtonParagraph = {
  padding: '6px 6px',
};

const addPersonButton = {
  background: '#2E8B57',
  color: '#fff',
  padding: '5px 10px',
  borderRadius: '5%',
  cursor: 'pointer',
  textAlign: 'right',
  border: 'none',
};

const addPersonBox = {
  background: '#FFCB9C',
  padding: '10px',
  float: 'left',

  borderRadius: '10pt',
  width: '280px',
};

export default PersonForm;
