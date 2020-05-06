import React from 'react';
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'

const ClinicInfo = ({clinic}) => {
    return clinic ?
        <div>
            {clinic.name}
            <Button variant='secondary' onClick={<Redirect to="/appointments/new"/>}>Create Appointment</Button>
        </div>
    : null
}

export default ClinicInfo