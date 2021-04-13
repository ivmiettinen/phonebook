import React from 'react';
import '../App.css';

const PersonForm = ({
  addNewPerson,
  newName,
  handleNameChange,
  handleNumberChange,
  newNumber,
}) => {
  const changeBackground = (e) => {
    e.target.style.background = 'rgba(3, 166, 27, 0.68)';
  };

  const changeBackground2 = (e) => {
    e.target.style.background = '#2E8B57';
  };

  return (
    <div style={divCenter}>
      <div style={addPersonBox}>
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
  );
};

const nameLabel = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '6px',
};
const nameInput = {
  marginTop: '5px',
  textAlign: 'center',
};

const numberLabel = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '6px',
};

const numberInput = {
  marginTop: '5px',
  textAlign: 'center',
};

const divCenter = {};

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
  backgroundColor: 'rgba(89, 91, 62, 0.57)',
  padding: '4px',
  margin: 'auto',

  borderRadius: '10pt',
  width: '260px',

  padding: '10px',
};

export default PersonForm;
