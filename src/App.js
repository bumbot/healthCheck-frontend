import React, {Component} from 'react';
import ClinicContainer from './containers/ClinicContainer'
import Login from './containers/LoginContainer'
import NavBar from './components/NavBar'
import Appointment from './containers/Appointment'
import ClinicInfo from './components/ClinicInfo'
import {Route, Switch, Redirect} from 'react-router-dom'

const geocodeKey = 'AIzaSyCLwKgWRXE9whJkaT2pV7PgMc5lnFdiXXE'

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: "",
      user: null,
      appointments: null,
      userClinics: null,
      listOfClinics: [],
      currentClinic: null
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

  addClinic = async (obj) => {
    fetch('http://localhost:3000/clinics', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
  }

  fetchAPIData = async (array) => {
    array.forEach(healthCenter => {
      let clinic = healthCenter.attributes
      let coordinates = healthCenter.geometry
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
        latitude: coordinates.y,
        longitude: coordinates.x,
        new_patients: isAccepting
      }
      
      this.setState({
        listOfClinics: [...this.state.listOfClinics, clinics]
      })
      this.addClinic(clinics)
    })
  }

  filterClinics = () => {
    return this.state.listOfClinics.map(clinic => {
      if (clinic.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
        return clinic
      }
    })
  }

  renderClinicCont = () => {
    if (this.state.user) {
      return (
        <div>
          <ClinicContainer
            listOfClinics={this.filterClinics()}
            searchTerm={this.state.searchTerm}
            updateSearch={this.updateSearch}
            handleSubmit={this.handleSubmit}
            currentClinic={this.state.currentClinic}
          />
        </div>
      )}
  }

  renderAppointment = () => {
    if (this.state.user) {
      return (
        <div>
          <Appointment
            appointments={this.state.appointments}
            clinics={this.state.userClinics}
          />
        </div>
      )
    }
  }

  renderLogin = () => {
    if (!this.state.user || this.state.user === null) {
      return (
        <div className="login" >
          <Login userLogin={this.userLogin}/>
        </div>
      )
    } else {
      return(
        <Redirect to="/search"/>
      )
    }
  }

  renderClinicInfo = (clinic) => {
    this.setState({
        currentClinic: clinic
    })
    return(
        <ClinicInfo name={this.props.currentClinic.name}/>
    )
  }

  userLogin = (event) => {
    event.preventDefault()
    let name = event.target.children[0].children[1].value
    let pw = event.target.children[1].children[1].value
    let payload = {
      username: name,
      password: pw
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
    .then(obj => {
      if (obj.error === true) {
        console.log("error")
        alert(obj.message)
      } else {
        console.log("success");
        this.setState({
          user: obj.user_data,
          appointments: obj.user_appts,
          userClinics: obj.user_clinics
        })
      }
    })

    event.target.reset()
  }

  userLogout = (event) => {
    this.setState({
      user: null,
      appointments: null
    })
    
  }

  render(){
    return (
      <div className="App">
        <NavBar
            user={this.state.user}
            logout={this.userLogout}/>
        <Switch>
          <Route exact path={["/", "/login"]} render={() =>
            this.renderLogin()
          }/>
          <Route exact path="/search" render={() =>
            this.renderClinicCont()
          }/>
          <Route exact path="/appointments" render={() =>
            this.renderAppointment()
          }/>
          <Route exact path="clinics/:id" render={(props) => {
            this.renderClinicInfo()
          }}/>
        </Switch>
      </div>
    )
  }
}

export default App;
