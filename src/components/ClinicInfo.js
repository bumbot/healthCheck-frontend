import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'

export default class ClinicInfo extends Component {
    constructor() {
        super();
        this.state={
            newAppt: false,
            id: null
        }
    }

    onBtnClick = () => {
        this.setState({
            newAppt: true,
            id: this.props.id
        })
    }

    showSpecialities = () => {
        let array = Object.entries(this.props.specialities)
        
        let newArray = array.filter(speciality => {
            if (speciality[1] !== false && speciality[1] !== null) {
                if (speciality[1] === true){
                    speciality[1] = "Yes"
                }
                return speciality
            }
        })
        debugger

        return newArray.map(speciality => {
            return(
                <tr>
                    <td>
                        {speciality[0]}
                    </td>
                    <td>
                        {speciality[1]}
                    </td>
                </tr>
            )
        })
    }

    render() {
        if (this.state.newAppt) {
            return <Redirect to={`/appointment/new/${this.state.id}`}/>
        } else {
            return (
                <div>
                    <Jumbotron>
                        <h1>
                            {this.props.name}
                        </h1>
                        <ListGroup >
                            <ListGroup.Item action>
                                {`Address: ${this.props.address}, ${this.props.city}, ${this.props.state}, ${this.props.zip}`}
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                Phone Number: {this.props.phoneNumber}
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                Website: {this.props.website}
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                Accepting new patients?: {this.props.newPatients ? "Yes" : "No"}
                            </ListGroup.Item>
                        </ListGroup>
                        <Accordion>
                            <Card className="list-specialities">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        List of Specialities
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Table striped bordered hover size="sm">
                                            {this.showSpecialities()}
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        {(this.props.user && this.props.newPatients)? <Button variant='secondary' onClick={this.onBtnClick}>Create Appointment</Button> : null}
                    </Jumbotron>
                </div>
            )
        }
    }
}