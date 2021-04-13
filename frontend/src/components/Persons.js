import React from 'react';

const Persons = ({ results, handleDelete }) => {
  const changeBackground = (e) => {
    e.target.style.background = '#F5F5F5';
    e.target.style.color = '#ed1212';
  };

  const changeBackground2 = (e) => {
    e.target.style.background = 'rgba(206, 208, 200, 0.39)';
    e.target.style.color = '#fff';
  };

  let mapping = results.map((result) => {
    return (
      <div className='center' key={result.id}>
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
    );
  });

  return <>{mapping}</>;
};

const lightGreyBox = {
  backgroundColor: 'rgba(206, 208, 200, 0.49)',
  padding: '8px',
  margin: '3px',

  borderRadius: '10pt',
  width: '260px',
};

const buttonStyle1 = {
  // background: '#DC143C',
  color: '#fff',
  padding: '0.5rem 0',
  cursor: 'pointer',

  margin: '0.5rem 1rem',
  width: '8rem',
  background: 'transparent',
  border: '2px solid white',
  fontWeight: 'bold',
  display: 'inline-block',
  borderRadius: '3px',
};

export default Persons;
