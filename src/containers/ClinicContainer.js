import React, {Component} from 'react';
import GoogleMap from './GoogleMap';
import SearchBar from '../components/SearchBar'

export default class ClinicContainer extends Component {
    render() {
        return (
            <div className="search-cont">
                <SearchBar
                    searchTerm={this.props.searchTerm}
                    updateSearch={this.props.updateSearch}
                    handleSubmit={this.props.handleSubmit}
                    filteredSearch={this.props.filteredSearch}
                />
                <GoogleMap
                    listOfClinics={this.props.listOfClinics}
                    currentClinic={this.props.currentClinic}
                />
            </div>
        )
    }
}