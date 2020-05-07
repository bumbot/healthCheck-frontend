import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

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
            if (speciality[1] !== false) {
                if (speciality[1] === true){
                    speciality[1] = "Yes"
                }
                return speciality
            }
        })

        return newArray.map(speciality => {
            return(
                <ListGroup.Item action>
                    {`${speciality[0]}${speciality[1]}`}
                </ListGroup.Item>
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
                        <Card>
                            {this.showSpecialities()}
                        </Card>
                        {(this.props.user && this.props.newPatients)? <Button variant='secondary' onClick={this.onBtnClick}>Create Appointment</Button> : null}
                    </Jumbotron>
                </div>
            )
        }
    }
}

/*

accept_walkin:
limited_access:
public_insurance:
medicaid:
medicare:
private_employer_insurance:
facility_type:
private_insurance:

child_special_needs:
elderly:
hiv:
homeless:
lgbt:
intellect_disabled:
physical_disabled:
mental_illness:
cardiology:
endocrinology:
general_surgery:
hiv_aids:
infectious_disease:
nephrology:
neurology:
obstetrics:
oncology:
opthalmology:
oral_surgery:
orthopedic:
gastroenterology:
pediatrics:
podiatry:
pulmonary:
rheumatology:
reproductive_health:
sti_test:
urology:
dentistry:

*/