import React, {Component} from 'react';
import GoogleMapComponent from 'google-map-react';
import ClinicPointer from '../components/ClinicPointer'

const apiKey= 'AIzaSyBp4sd7Eh41b6SsZhJTSst_twS7zhYgtsI'

export default class GoogleMap extends Component {
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

    renderClinics = (array) => {
        if (array.length !== 0) {
            return array.forEach(place => {
                return <ClinicPointer
                        lat={place.latitude}
                        lng={place.longitude}
                        key={place.address_id}
                        name={place.name}/>
                }
            )
        } else {
            return null
        }
    }


    render() {
        return (
            <div style={{ height: '600px', width: '50%' }}>
                <GoogleMapComponent
                    // bootstrapURLKeys={{
                    //     key: apiKey
                    // }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    <ClinicPointer
                        lat={38.898074} 
                        lng={-77.032864}
                        key={1}
                        name="Flatiron DC"
                    />
                    {this.renderClinics(this.props.listOfClinics)}
                </GoogleMapComponent>
            </div>
        )
    }

}