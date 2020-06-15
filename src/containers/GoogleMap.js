import React, {Component} from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import {Redirect} from 'react-router-dom'

const apiKey= process.env.REACT_APP_GOOGLE_API_KEY


export class MapContainer extends Component {
    constructor() {
        super()
        this.state = {
            center: {
                lat: 38.898074,
                lng: -77.032864
            },
            zoom: 12,
            activeMarker: null,
            showingInfoWindow: false,
            redirectTo: null
        }
    }


    renderClinics = () => {
        let array = this.props.listOfClinics
        if (array.length !== 0) {
            return array.map(place => {
                return (
                    <Marker
                        key={place.address_id}
                        position={{
                            lat: place.latitude,
                            lng: place.longitude
                        }}
                        name={place.name}
                        id={place.id}
                        onClick={this.onMarkerClick}
                        onMouseover={this.onHover}
                    >
                        <InfoWindow
                            key={`info-${place.address_id}`}
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClick={()=><Redirect to={`/clinics/${place.id}`}/>}
                        >
                            <div>
                                <h1>{place.name}</h1>
                            </div>
                        </InfoWindow>
                    </Marker>
                )
            }
            )
        } else {
            return null
        }
    }

    onHover = () => {
        
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            redirectTo: `/clinics/${props.id}`
        })    
    }
    
    onMapClick =() => {
        if (this.state.showingInfoWindow) {
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            })
        }
    }

    render() {
        if (this.state.redirectTo !== null ) {
            return <Redirect to={this.state.redirectTo}/>
        } else {
            return (
                <div className="map">
                    <Map
                        google={this.props.google}
                        style={{
                            position: 'fixed',  
                            width: '100%',
                            height: '100%'}}
                        initialCenter={
                            this.state.center
                        }
                        zoom={this.state.zoom}
                        onClick={this.onMapClick}
                    >
                        {this.renderClinics()}
                    </Map>
                    </div>
            )
        }
    }

}

export default GoogleApiWrapper({
    apiKey: apiKey
  })(MapContainer)