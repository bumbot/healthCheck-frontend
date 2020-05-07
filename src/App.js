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
      userId: null,
      appointments: null,
      userClinics: null,
      listOfClinics: []
    }
  }

  componentDidMount() {
    fetch('https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Health_WebMercator/MapServer/7/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(resp => resp.json())
    .then(listOfCenters => this.fetchAPIData(listOfCenters.features))
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

  addClinic = (obj) => {
    fetch('http://localhost:3000/clinics', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }
    )
  }

  updateSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filterClinicNames = () => {
    return this.state.listOfClinics.filter(clinic =>
      clinic.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
  }

  renderClinicCont = () => {
      return (
        <div>
          <ClinicContainer
            listOfClinics={this.filterClinicNames()}
            searchTerm={this.state.searchTerm}
            updateSearch={this.updateSearch}
            handleSubmit={this.handleSubmit}
            currentClinic={this.state.currentClinic}
          />
        </div>
      )
  }

  renderAppointment = () => {
    if (this.state.user) {
      return (
        <div>
          <Appointment
            appointments={this.state.appointments}
            clinics={this.state.userClinics}
            deleteAppt={this.deleteAppt}
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
        
        obj.user_appts.forEach(appt => {
          let time = appt.appointment_time
          let hour = parseInt(time.slice(0,2))
          let minutes = time.slice(2,5)
          if (hour === 0 || hour === 24) {
            appt.appointment_time = `12${minutes}am`
          } else if (hour === 12) {
            appt.appointment_time = `12${minutes}pm`
          } else if (hour > 0 && hour < 12) {
              if (hour < 10) {
                appt.appointment_time = `0${hour}${minutes}am`
              } else {
                appt.appointment_time = `${hour}${minutes}am`
              }
          } else if (hour > 12 && hour < 24) {
            appt.appointment_time = `${hour}${minutes}pm`
          }
        })

        console.log("success");
        this.setState({
          user: obj.user_data.username,
          userId: obj.user_data.id,
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
        debugger
        this.setState({
          user: obj.user_data.username,
          userId: obj.user_data.id,
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
  
  deleteAppt = (event) => {
    let apptId = parseInt(event.target.value)
    let appt = this.state.appointments.find(appt => appt.id === apptId)
    fetch(`http://localhost:3000/appointments/${apptId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appt)
    }).then(resp=>resp.json())
    .then(json=>{
      if (json.error) {
        alert(json.message)
      } else {
        let newUserClinics= this.state.userClinics.filter(clinics=> clinics.id !== json.clinic.id)
        let newUserAppts = this.state.appointments.filter(appts=> appts.id !== appt.id)

        this.setState({
          userClinics: newUserClinics,
          appointments: newUserAppts
        })
      }
    })
  }

  createAppt = (event) => {
    let date = event.nativeEvent.target[0].value
    let hour = event.nativeEvent.target[1].value.slice(-2)
    let time = event.nativeEvent.target[1].value.slice(0,-2)
    let clinicId = parseInt(event.target.children[2].id)

    let payload = {
      user: this.state.userId,
      clinic: clinicId,
      appointment_date: date,
      appointment_hour: hour,
      appointment_time: time
    }
    
    fetch('http://localhost:3000/appointments', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(resp=>resp.json())
    .then(obj=>{
      if (obj.error) {
        alert(obj.message)
      } else {
        this.setState({
          appointments: obj.user_data.user_appts,
          userClinics: obj.user_data.user_clinics
        })
      }
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
            if (this.state.user) {
              return <Redirect to='/search'/>
            } else {
              return <Login userLogin={this.newUserCreate} title="Create a New User"/>
            }
          }}/>
          <Route exact path="/appointment/new/:id" render={(props) => {
            let id = parseInt(props.match.params.id)
            let clinic = this.state.listOfClinics.find(clinic => clinic.id === id)
            return <ApptForm
              clinic={clinic}
              createAppt={this.createAppt}/>
          }}/>
          <Route exact path="/search" render={() =>
            this.renderClinicCont()
          }/>
          <Route exact path="/appointments" render={() =>
            this.renderAppointment()
          }/>
          <Route exact path="/clinics/:id" render={(props) => {
            let id = parseInt(props.match.params.id)
            let clinic = this.state.listOfClinics.find(clinic => clinic.id === id)

            let name = clinic.name
            let address = clinic.address
            let city = clinic.city
            let state = clinic.state
            let zip = clinic.zip
            let phoneNumber = clinic.phone_number
            let website = clinic.website_url
            let newPatients = clinic.new_patients
            return <ClinicInfo
              name={name}
              address={address}
              city={city}
              state={state}
              zip={zip}
              phoneNumber={phoneNumber}
              website={website}
              newPatients={newPatients}
              id={id}
              user={this.state.user}/>
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
