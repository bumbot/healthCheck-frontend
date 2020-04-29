import React, {Component} from 'react';

export default class Appointment extends Component {
    renderAppointments = () => {
        return this.props.appointments.map(appt => {
            return <li>
                {appt.appointment_date} <br></br>
                {appt.appointment_time}
            </li>
        })
    }

    renderUserClinics = () => {
        return this.props.clinics.map(clinic => {
            return <li>
                {clinic.name}
            </li>
        })
    }

    render() {
        return(
            <div>
                <h1>Scheduled Appointments</h1>
                <ol>
                    {this.renderUserClinics()}
                    {this.renderAppointments()}
                </ol>
            </div>
        )
    }
}