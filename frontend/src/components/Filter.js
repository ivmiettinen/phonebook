import React from 'react';
import '../App.css';

const Filter = ({ handleNameFilter, searchTerm }) => {
  return (
    <div className='center'>
      <div style={filterDiv}>
        Filter shown with:
        <br />
        <input
          style={filterField}
          value={searchTerm}
          onChange={handleNameFilter}
          placeholder='Search'
        />
      </div>
    </div>
  );
};

const filterField = {
  textAlign: 'center',
};

const filterDiv = {
  background: 'rgba(89, 91, 62, 0.57)',
  padding: '10px',
  margin: 'auto',

  borderRadius: '10pt',
  width: '240px',
};

export default Filter;
