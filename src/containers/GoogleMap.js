import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const apiKey= 'AIzaSyBp4sd7Eh41b6SsZhJTSst_twS7zhYgtsI'

export class MapContainer extends Component {
    constructor() {
        super()
        this.state = {
            center: {
                lat: 38.898074,
                lng: -77.032864
            },
            zoom: 12
        }
    }


    renderClinics = () => {
        let array = this.props.listOfClinics
        if (array.length !== 0) {
            return array.map(place => {
                return (<Marker
                    key={place.address_id}
                    position={
                        {lat: place.latitude,
                        lng: place.longitude}}
                    name={place.name}
                    onClick={this.onMarkerClick}
                />
                )
                }
            )
        }
    }

    onMarkerClick = (props, marker) => {
        this.props.onClinicSelect(props, marker)
    }

    render() {
        return (
            // <div style={{ height: '600px', width: '60%' }}>
            //     <GoogleMapComponent
            //         // bootstrapURLKeys={{
            //         //     key: apiKey
            //         // }}
            //         defaultCenter={this.state.center}
            //         defaultZoom={this.state.zoom}
            //     >
            //         {this.renderClinics(this.props.listOfClinics)}
            //     </GoogleMapComponent>
            // </div>
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
            >
                {this.renderClinics()}
            </Map>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: apiKey
  })(MapContainer)