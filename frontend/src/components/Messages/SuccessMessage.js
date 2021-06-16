import React from 'react'
import { Alert } from '@material-ui/lab'

const SuccessMessage = ({ successMessage }) => {
    if (successMessage === null) {
        return null
    }

    return (
      <div className='success'>
            <Alert severity='success'>{successMessage}</Alert>
        </div>
    )
}

export default SuccessMessage
