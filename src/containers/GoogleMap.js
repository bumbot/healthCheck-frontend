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
        let newArr=[]
        if (array.length !== 0) {
            array.forEach(place => {
                newArr.push(<ClinicPointer
                        lat={place.latitude} 
                        lng={place.longitude}
                        key={place.address_id}
                        name={place.name}
                        renderClinicInfo={this.props.renderClinicInfo}
                        clinicInfo={place}
                        />
                )
            }
            )
        }
        return newArr
    }


    render() {
        return (
            <div style={{ height: '600px', width: '50%' }}>
                <GoogleMapComponent
                    bootstrapURLKeys={{
                        key: apiKey
                    }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    {this.renderClinics(this.props.listOfClinics)}
                </GoogleMapComponent>
            </div>
        )
    }

}