import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'

export default class Appointment extends Component {

    renderUserAppointments = () => {
        let appts = this.props.appointments
        let clinics = this.props.clinics
        let array = []

        for (let i = 0; i < appts.length; i++) {
            array.push(
                <>
                <li>
                    Clinic Name: {clinics[i].name}<br></br>
                    Date: {appts[i].appointment_date}<br></br>
                    Time: {appts[i].appointment_time}
                </li>
                <Button type="submit" value={appts[i].id} onClick={this.props.deleteAppt}>
                    Delete    
                </Button>
                </>
            )
        }
        
        return array
    }

    render() {
        return(
            <div>
                <h1>Scheduled Appointments</h1>
                <ol>
                    {this.renderUserAppointments()}
                </ol>
            </div>
        )
    }
}