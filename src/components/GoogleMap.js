import React, {Component} from 'react';
import GoogleMapComponent from 'google-map-react';
import FakeComponent from './FakeComponent'

const apiKey= 'AIzaSyBp4sd7Eh41b6SsZhJTSst_twS7zhYgtsI'

export default class GoogleMap extends Component {
    constructor() {
        super()
        this.state = {
            center: {
                lat: 38.898074, 
                lng: -77.032864
            },
            zoom: 15
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
                    <FakeComponent
                        lat={38.898074} 
                        lng={-77.032864}
                        text="Flatiron DC"
                    />
                </GoogleMapComponent>
            </div>
        )
    }

}