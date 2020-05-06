import React, {Component} from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import {Redirect} from 'react-router-dom'

const apiKey= 'AIzaSyBp4sd7Eh41b6SsZhJTSst_twS7zhYgtsI'

export class MapContainer extends Component {
    constructor() {
        super()
        this.state = {
            center: {
                lat: 38.898074,
                lng: -77.032864
            },
            zoom: 12,
            activeMarker: {},
            showingInfoWindow: false
        }
    }


    renderClinics = () => {
        let array = this.props.listOfClinics
        if (array.length !== 0) {
            return array.map(place => {
                return (
                    
                        <Marker
                            key={place.address_id}
                            position={
                                {lat: place.latitude,
                                lng: place.longitude}}
                            name={place.name}
                            id={place.id}
                            onClick={this.onMarkerClick}
                            onMouseover={this.onHover}
                        />
                        
                    
                )
            }
            )
        }
    }

    onHover = () => {
        
    }

    onMarkerClick = (props, marker) => {
        this.props.onClinicSelect(props)
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        })
    }
    
    onMapClick =() => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false
            })
        }
    }

    render() {
        return (
            <Map 
                google={this.props.google}
                style={{
                    position: 'relative',  
                    width: '80%',
                    height: '600px'}}
                initialCenter={
                    this.state.center
                }
                zoom={this.state.zoom}
                onClick={this.onMapClick}
            >
                {this.renderClinics()}
            </Map>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: apiKey
  })(MapContainer)