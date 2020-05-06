import React, {Component} from 'react';
import ClinicContainer from './containers/ClinicContainer'
import Login from './containers/LoginContainer'
import NavBar from './components/NavBar'
import Appointment from './containers/Appointment'
import ClinicInfo from './components/ClinicInfo'
import ApptForm from './components/ApptForm'
import Welcome from './components/Welcome'
import {Route, Switch, Redirect} from 'react-router-dom'

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

  addClinic = (obj) => {
    fetch('http://localhost:3000/clinics', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
  }

  fetchAPIData = (array) => {
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

      
      this.addClinic(clinics)
    })

    fetch('http://localhost:3000/clinics')
    .then(resp=>resp.json())
    .then(array=>{
      array.forEach(clinic => {
        this.setState({
          listOfClinics: [...this.state.listOfClinics, clinic]
        })
      })
    })
  }

  filterClinics = () => {
    return this.state.listOfClinics.filter(clinic =>
      clinic.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
  }

  renderClinicCont = () => {
    // if (this.state.user) {
      return (
        <div>
          <ClinicContainer
            listOfClinics={this.filterClinics()}
            searchTerm={this.state.searchTerm}
            updateSearch={this.updateSearch}
            handleSubmit={this.handleSubmit}
            onClinicSelect={this.onClinicSelect}
          />
        </div>
      )
    // }
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
          <Login userLogin={this.userLogin} title="Login"/>
        </div>
      )
    } else {
      return(
        <Redirect to="/search"/>
      )
    }
  }

  // renderNewUser = () => {
  //   return (
  //     <div className="signup">
  //       <Login userLogin={this.newUserCreate} title="Create a New User"/>
  //     </div>
  //   )
  // }

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

  newUserCreate = (event) => {
    event.preventDefault()
    let name = event.target.children[0].children[1].value
    let pw = event.target.children[1].children[1].value
    let payload = {
      username: name,
      password: pw
    }

    fetch('http://localhost:3000/users', {
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
      appointments: null,
      userClinics: null
    })
    
  }

  onClinicSelect = (props) => {
    let clinicId = props.id
    let selectedClinic = this.state.listOfClinics.find(clinic => clinic.id === clinicId)
    this.setState({
      currentClinic: selectedClinic
    })
}

  render(){
    return (
      <div className="App">
        <NavBar
          user={this.state.user}
          logout={this.userLogout}
        />
        <Switch>
          <Route key="new" exact path ="/new" render={() => {
            return <Login userLogin={this.newUserCreate} title="Create a New User"/>
          }}/>
          <Route exact path="/appointments/new" render={() => {
            return <ApptForm clinic={this.state.currentClinic}/>
          }}/>
          <Route exact path="/search" render={() =>
            this.renderClinicCont()
          }/>
          <Route exact path="/appointments" render={() =>
            this.renderAppointment()
          }/>
          <Route exact path="/clinics/:id" render={(props) => {
            let id = props.match.params.id
            let clinic = this.state.listOfClinics.find(clinic => clinic.id === id)
            return <ClinicInfo clinic={clinic}/>
          }}/>
          <Route key="login" exact path="/login" render={() =>
            this.renderLogin()
          }/>
          <Route exact path='/' component={Welcome}/>
        </Switch>
      </div>
    )
  }
}

export default App;
