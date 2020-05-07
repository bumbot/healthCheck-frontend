import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'

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
                            <ListGroup.Item>
                                {`Address: ${this.props.address}, ${this.props.city}, ${this.props.state}, ${this.props.zip}`}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Phone Number: {this.props.phoneNumber}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Website: {this.props.website}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Accepting new patients?: {this.props.newPatients ? "Yes" : "No"}
                            </ListGroup.Item>
                        </ListGroup>
                        {(this.props.user && this.props.newPatients)? <Button variant='secondary' onClick={this.onBtnClick}>Create Appointment</Button> : null}
                    </Jumbotron>
                </div>
            )
        }
    }
}