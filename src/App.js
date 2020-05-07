import React, {Component} from 'react';
import ClinicContainer from './containers/ClinicContainer'
import Login from './containers/LoginContainer'
import NavBar from './components/NavBar'
import Appointment from './containers/Appointment'
import ClinicInfo from './components/ClinicInfo'
import ApptForm from './components/ApptForm'
import Welcome from './components/Welcome'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';

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

      let walk_in = (clinic["PrimaryCarePt.WALKIN_UNSCHEDULED"] !== null && clinic["PrimaryCarePt.WALKIN_UNSCHEDULED"].toLowerCase().includes("yes")) ? clinic["PrimaryCarePt.WALKIN_UNSCHEDULED"] : "No/Please Call"

      let limited_access = (clinic["DCGIS.PRIMARY_CARE_INFO.LIMITED_ACCESS"] === "No" || clinic["DCGIS.PRIMARY_CARE_INFO.LIMITED_ACCESS"] === " ") ? "No" : clinic["DCGIS.PRIMARY_CARE_INFO.LIMITED_ACCESS"]
      
      let public_insurance = (clinic["DCGIS.PRIMARY_CARE_INFO.PUBLIC_INSURANCE"] !== null && clinic["DCGIS.PRIMARY_CARE_INFO.PUBLIC_INSURANCE"].toLowerCase().includes("yes")) ? "Yes" : "No/Please Call"
      
      let medicaid = (clinic["DCGIS.PRIMARY_CARE_INFO.MEDICAID"] !== null && clinic["DCGIS.PRIMARY_CARE_INFO.MEDICAID"].toLowerCase().includes("yes")) ? "Yes" : "No"
      
      let medicare = (clinic["DCGIS.PRIMARY_CARE_INFO.MEDICARE"] === " ") ? "No" : clinic["DCGIS.PRIMARY_CARE_INFO.MEDICARE"]
      
      let private_employer_insurance = (clinic["DCGIS.PRIMARY_CARE_INFO.PRIVATE_EMPLOYER_INSURANCE"] === " ") ? "No" : clinic["DCGIS.PRIMARY_CARE_INFO.PRIVATE_EMPLOYER_INSURANCE"]
      
      let private_insurance = (clinic["DCGIS.PRIMARY_CARE_INFO.PRIVATE_INSURANCE"] === " ") ?
      "No" : clinic["DCGIS.PRIMARY_CARE_INFO.PRIVATE_INSURANCE"]

      let facility_type = (clinic["DCGIS.PRIMARY_CARE_INFO.FACILITY_TYPE"] === " ") ? "n/a" : clinic["DCGIS.PRIMARY_CARE_INFO.FACILITY_TYPE"]

      //specialities
      let child_special_needs = (clinic["DCGIS.PRIMARY_CARE_INFO.CHILD_SPECIAL_NEEDS"] === " ") ? false : true 

      let elderly = (clinic["DCGIS.PRIMARY_CARE_INFO.ELDERLY"] === " ") ? false : true

      let hiv = (clinic["DCGIS.PRIMARY_CARE_INFO.HIV"] === " ") ? false : true

      let homeless = (clinic["DCGIS.PRIMARY_CARE_INFO.HOMELESS"] === " ") ? false : true

      let lgbt = (clinic["DCGIS.PRIMARY_CARE_INFO.LBGT"] === " ") ? false : true

      let intellect_disabled = (clinic["DCGIS.PRIMARY_CARE_INFO.INTEL_DISABLED"] === " ") ? false : true

      let physical_disabled = (clinic["DCGIS.PRIMARY_CARE_INFO.PHYSICALLY_DISABLED"] === " ") ? false : true

      let mental_illness = (clinic["DCGIS.PRIMARY_CARE_INFO.MENTAL_ILLNESS"] === " ") ? false : true

      let cardiology = (clinic["DCGIS.PRIMARY_CARE_INFO.CARDIOLOGY"] === " ") ? false : true

      let endocrinology = (clinic["DCGIS.PRIMARY_CARE_INFO.ENDOCRINOLOGY"] === " ") ? false : true

      let general_surgery = (clinic["DCGIS.PRIMARY_CARE_INFO.GENERAL_SURGERY"] === " ") ? false : true
      
      let hiv_aids = (clinic["DCGIS.PRIMARY_CARE_INFO.HIV_AIDS"] === " ") ? false : true
      
      let infectious_disease = (clinic["DCGIS.PRIMARY_CARE_INFO.INFECTIOUS_DISEASE"] === " ") ? false : true
      
      let nephrology = (clinic["DCGIS.PRIMARY_CARE_INFO.NEPHROLOGY"] === " ") ? false : true
      
      let neurology = (clinic["DCGIS.PRIMARY_CARE_INFO.NEUROLOGY"] === " ") ? false : true
      
      let obstetrics = (clinic["DCGIS.PRIMARY_CARE_INFO.OBSTETRICS"] === " ") ? false : true
      
      let oncology = (clinic["DCGIS.PRIMARY_CARE_INFO.ONCOLOGY"] === " ") ? false : true
      
      let opthalmology = (clinic["DCGIS.PRIMARY_CARE_INFO.OPTHALMOLOGY"] === " ") ? false : true
      
      let oral_surgery = (clinic["DCGIS.PRIMARY_CARE_INFO.ORAL_SURGERY"] === " ") ? false : true
      
      let orthopedic = (clinic["DCGIS.PRIMARY_CARE_INFO.ORTHOPEDIC"] === " ") ? false : true
      
      let gastroenterology = (clinic["DCGIS.PRIMARY_CARE_INFO.GASTROENTEROLOGY"] === " ") ? false : true
      
      let pediatrics = (clinic["DCGIS.PRIMARY_CARE_INFO.PEDIATRICS"] === " ") ? false : true
      
      let podiatry = (clinic["DCGIS.PRIMARY_CARE_INFO.PODIATRY"] === " ") ? false : true
      
      let pulmonary = (clinic["DCGIS.PRIMARY_CARE_INFO.PULMONARY_MEDICINE"] === " ") ? false : true
      
      let rheumatology = (clinic["DCGIS.PRIMARY_CARE_INFO.RHEUMATOLOGY"] === " ") ? false : true
      
      let reproductive_health = (clinic["DCGIS.PRIMARY_CARE_INFO.REPRODUCTIVE_HEALTH"] === " ") ? false : true
      
      let sti_test = (clinic["DCGIS.PRIMARY_CARE_INFO.STI_TEST_TREAT"] === " ") ? false : true
      
      let urology = (clinic["DCGIS.PRIMARY_CARE_INFO.UROLOGY"] === " ") ? false : true
      
      let dentistry = (clinic["DCGIS.PRIMARY_CARE_INFO.DENTISTRY"] === " ") ? false : true


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
        new_patients: isAccepting,

        walk_in: walk_in,
        limited_access: limited_access,
        public_insurance: public_insurance,
        medicaid: medicaid,
        medicare: medicare,
        private_employer_insurance: private_employer_insurance,
        private_insurance: private_insurance,
        facility_type: facility_type,


        child_special_needs: child_special_needs,
        elderly: elderly,
        hiv: hiv,
        homeless: homeless,
        lgbt: lgbt,
        intellect_disabled: intellect_disabled,
        physical_disabled: physical_disabled,
        mental_illness: mental_illness,
        cardiology: cardiology,
        endocrinology: endocrinology,
        general_surgery: general_surgery,
        hiv_aids: hiv_aids,
        infectious_disease: infectious_disease,
        nephrology: nephrology,
        neurology: neurology,
        obstetrics: obstetrics,
        oncology: oncology,
        opthalmology: opthalmology,
        oral_surgery: oral_surgery,
        orthopedic: orthopedic,
        gastroenterology: gastroenterology,
        pediatrics: pediatrics,
        podiatry: podiatry,
        pulmonary: pulmonary,
        rheumatology: rheumatology,
        reproductive_health: reproductive_health,
        sti_test: sti_test,
        urology: urology,
        dentistry: dentistry
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
          filteredSearch={this.filteredSearch}
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

  renderClinicInfo = (props) => {

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

    let specialities = {
      "Accepting Walk-ins?: ": clinic.accept_walkin,
      "Limited Access to: ": clinic.limited_access,
      "Accepts Public Insurance?: ": clinic.public_insurance,
      "Accepts Medicaid?: ": clinic.medicaid,
      "Accepts Medicare?: ": clinic.medicare,
      "Accepts Private Insurance?: ": clinic.private_insurance,
      "Accepts Private Employer Insurance?: ": clinic.private_employer_insurance,
      "Facility Type: ": clinic.facility_type,

      "Child Special Needs?: ": clinic.child_special_needs,
      "Elderly: ": clinic.elderly,
      "HIV Testing: ": clinic.hiv,
      "Homeless Care: ": clinic.homeless,
      "LGBT Friendly: ": clinic.lgbt,
      "Intellectually Disabled Care: ": clinic.intellect_disabled,
      "Physically Disabled Care: ": clinic.physical_disabled,
      "Mental Illness: ": clinic.mental_illness,
      "Cardiology: ": clinic.cardiology,
      "Endocrinology: ": clinic.endocrinology,
      "General Surgery: ": clinic.general_surgery,
      "HIV/AIDS Treatment: ": clinic.hiv_aids,
      "Infectious Disease Care": clinic.infectious_disease,
      "Nephrology: ": clinic.nephrology,
      "Neurology: ": clinic.neurology,
      "Obstetrics: ": clinic.obstetrics,
      "Oncology: ": clinic.oncology,
      "Opthalmology: ": clinic.opthalmology,
      "Oral Surgery": clinic.oral_surgery,
      "Orthopedic: ": clinic.orthopedic,
      "Gastroenterology: ": clinic.gastroenterology,
      "Pediatrics: ": clinic.pediatrics,
      "Podiatry: ": clinic.podiatry,
      "Pulmonary Medicine: ": clinic.pulmonary,
      "Rheumatology: ": clinic.rheumatology,
      "Reproductive Health: ": clinic.reproductive_health,
      "STI Testing/Treatment: ": clinic.sti_test,
      "Urology: ": clinic.urology,
      "Dentistry: ": clinic.dentistry
    }

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
      user={this.state.user}
      specialities={specialities}/>
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
    let clinicId = parseInt(event.target.children[3].id)
    let reason = event.nativeEvent.target[2].value

    let payload = {
      user: this.state.userId,
      clinic: clinicId,
      appointment_date: date,
      appointment_hour: hour,
      appointment_time: time,
      reason_for_visit: reason
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
              return (
              <div className="signup">
                <Login userLogin={this.newUserCreate} title="Create a New User"/>
              </div>
              )
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
          <Route exact path="/clinics/:id" render={(props) =>
            this.renderClinicInfo(props)
          }/>
          <Route key="login" exact path="/login" render={() =>
            this.renderLogin()
          }/>
          <Route exact path='/' render={() => {
            return <Welcome user={this.state.user} userLogin={this.userLogin}/>
          }}/>
        </Switch>
      </div>
    )
  }
}

export default App;
