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
                    {this.props.user ? <Button variant='secondary' onClick={this.onBtnClick}>Create Appointment</Button> : null}
                </div>
            )
        }
    }
}