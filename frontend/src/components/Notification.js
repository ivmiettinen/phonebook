import React from 'react';

const Notification = ({ errorMessage }) => {
  JSON.stringify(errorMessage);

  if (errorMessage === null) {
    return null;
  }
  return <div className='error'>{errorMessage}</div>;
};

export default Notification;
