import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'

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
                    <h1>
                        {this.props.name}
                    </h1>
                    <h2>
                        {`${this.props.address}, ${this.props.city}, ${this.props.state}, ${this.props.zip}`}
                    </h2>
                    <h3>
                        Phone Number: {this.props.phoneNumber}<br/>
                        Website: {this.props.website}<br/>
                        Accepting new patients?: {this.props.newPatients ? "Yes" : "No"}
                    </h3>
                    {(this.props.user && this.props.newPatients)? <Button variant='secondary' onClick={this.onBtnClick}>Create Appointment</Button> : null}
                </div>
            )
        }
    }
}