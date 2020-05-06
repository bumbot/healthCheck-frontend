import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class ApptForm extends Component {
    
    render() {
        return(
            <div>
                <h1>{this.props.clinic.name}</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Appointment Date</Form.Label>
                        <Form.Control type="date"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Form.Label>Appointment Time</Form.Label>
                            <Form.Control as="select" size="sm" custom>
                                <option>8:00am</option>
                                <option>9:00am</option>
                                <option>10:00am</option>
                                <option>11:00am</option>
                                <option>12:00pm</option>
                                <option>1:00pm</option>
                                <option>2:00pm</option>
                                <option>3:00pm</option>
                                <option>4:00pm</option>
                                <option>5:00pm</option>
                                <option>6:00pm</option>
                            </Form.Control>
                        </Form.Row>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}