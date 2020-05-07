import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Login from '../containers/LoginContainer'

export default class Welcome extends Component {
    renderLoginCard = () => {
        if (this.props.user) {
            return null
        } else {
            return (
                <Card border="secondary" bg="dark">
                    <Login title={"Login"} userLogin={this.props.userLogin}/>
                </Card>
            )
        }
    }

    render(){
        return(
            <div className='welcome-bg'>
                <div className="welcome">
                    <h1>
                        Welcome to HealthCheck!
                    </h1>
                    <h4>
                        This is a resource dedicated to helping people find easy healthcare access in the DC-Metro area
                    </h4>
                </div>
                <div className="login-card">
                    {this.renderLoginCard()}
                </div>
            </div>
        )
    }
}