import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import ListGroup from 'react-bootstrap/ListGroup'

export default class Appointment extends Component {

    renderUserAppointments = () => {
        let appts = this.props.appointments
        let clinics = this.props.clinics
        let array = []

        for (let i = 0; i < appts.length; i++) {
            array.push(
                <>
                <Card border='info' bg="secondary">
                    <Card.Body>
                        <Card.Title>Clinic Name: {clinics[i].name}</Card.Title>
                        <Card.Text>
                            Reason for Visit: {appts[i].reason_for_visit}
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Appointment Date: {appts[i].appointment_date}</ListGroup.Item>
                            <ListGroup.Item>Appointment Time: {appts[i].appointment_time}</ListGroup.Item>
                        </ListGroup>
                        <Button type="submit" value={appts[i].id} onClick={this.props.deleteAppt}>
                            Delete    
                        </Button>
                    </Card.Body>
                </Card>
                </>
            )
        }
        
        return array
    }

    render() {
        return(
            <div>
                <h1>Scheduled Appointments</h1>
                <CardColumns>
                    {this.renderUserAppointments()}
                </CardColumns>
            </div>
        )
    }
}