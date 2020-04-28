import React, {Component} from 'react';
import GoogleMap from './GoogleMap';

export default class ClinicContainer extends Component {
    render() {
        return (
            <div>
                <GoogleMap listOfClinics={this.props.listOfClinics}/>
            </div>
        )
    }
}