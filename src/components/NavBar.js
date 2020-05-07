import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {NavLink} from 'react-router-dom'

export default class NavBar extends Component {
    render(){
        return (
            <div>
                <Navbar bg="light" variant="light" expand="lg" position="top" sticky="top">
                    <Navbar.Brand>
                        <NavLink className="link-text" to='/'>
                            HealthCheck
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <NavLink className="link-text" to='/search'>
                                    Search
                                </NavLink>
                            </Nav.Link>
                            {this.props.user ? <>
                            <Nav.Link>
                            <NavLink className="link-text" to='/appointments'>
                                Appointments
                            </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink className="link-text" onClick={this.props.logout} to='/login'>
                                    Logout
                                </NavLink>
                            </Nav.Link> </> : <>
                                <Nav.Link>
                                    <NavLink className="link-text" to='/login'>
                                        Login
                                    </NavLink>
                                </Nav.Link>
                                <Nav.Link>
                                    <NavLink className="link-text" to='/new'>
                                        New User?
                                    </NavLink>
                                </Nav.Link>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


