import React from 'react';

const ClinicInfo = ({clinic}) => {
    return clinic ?
        <div>
            {clinic.name}
        </div>
    : null
}

export default ClinicInfo