import React, {Component} from 'react';
import SearchBar from './containers/SearchContainer'
import ClinicContainer from './containers/ClinicContainer'
import Login from './containers/LoginContainer'

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: "",
      user: null,
      listOfClinics: []
    }
  }

  updateSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  componentDidMount() {
    fetch('https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Health_WebMercator/MapServer/7/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(resp => resp.json())
    .then(listOfCenters => this.fetchAPIData(listOfCenters.features))
  }

  addClinic = obj => {
    fetch('http://localhost:3000/clinics', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
  }

  fetchAPIData = array => {
    array.forEach(healthCenter => {
      let clinic = healthCenter.attributes
      let isAccepting;
      clinic["DCGIS.PRIMARY_CARE_INFO.ACCEPT_NEW_PT"] === "Yes" ? isAccepting = true : isAccepting = false;
      
      let clinics = {
        name: clinic["PrimaryCarePt.NAME"],
        address: clinic["PrimaryCarePt.ADDRESS"],
        city: clinic["PrimaryCarePt.CITY"],
        state: clinic["PrimaryCarePt.STATE"],
        zip: clinic["PrimaryCarePt.ZIP"],
        address_id: clinic["PrimaryCarePt.ADDRID"],
        phone_number: clinic["PrimaryCarePt.PHONE"],
        website_url: clinic["PrimaryCarePt.WEB_URL"],
        latitude: clinic["PrimaryCarePt.XCOORD"],
        longitude: clinic["PrimaryCarePt.YCOORD"],
        new_patients: isAccepting
      }
      this.setState({
        listOfClinics: [...this.state.listOfClinics, clinics]
      })
      this.addClinic(clinics)
    })
  }

  render(){
    return (
      <div className="App">
        <Login/>
        <SearchBar searchTerm={this.state.searchTerm}
          updateSearch={this.updateSearch}
          handleSubmit={this.handleSubmit}/>
        <ClinicContainer listOfClinics={this.state.listOfClinics.map(clinic => {
          debugger
          if (clinic.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            return clinic
          }
    })}/>
      </div>
    );
  }
}

export default App;
