import React, {Component} from 'react';
import GoogleMap from './GoogleMap';
import SearchBar from '../components/SearchBar'

export default class ClinicContainer extends Component {
    render() {
        return (
            <div>
                <SearchBar
                    searchTerm={this.props.searchTerm}
                    updateSearch={this.props.updateSearch}
                    handleSubmit={this.props.handleSubmit}
                />
                <GoogleMap listOfClinics={this.props.listOfClinics}/>
            </div>
        )
    }
}