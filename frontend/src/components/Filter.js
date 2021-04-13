import React from 'react';
import '../App.css';

const Filter = ({ handleNameFilter, searchTerm }) => {
  return (
    <div className='center'>
      <div style={filterDiv} className='filterDiv'>
        Filter shown with:
        <br />
        <input
          className='filterField'
          value={searchTerm}
          onChange={handleNameFilter}
          placeholder='Search'
        />
      </div>
    </div>
  );
};

const filterDiv = {
  background: '#FFCB9C',
  padding: '10px',
  marginLeft: '10px',

  borderRadius: '10pt',
  width: '280px',
};

export default Filter;
