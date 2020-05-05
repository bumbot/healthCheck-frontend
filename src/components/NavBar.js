import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    render(){
        return (
            <div>
                <Navbar bg="light" expand="lg" position="fixed">
                    <Navbar.Brand href="/">HealthCheck</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <Link to="/search">
                                    Search 
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/appointments">
                                    Appointments 
                                </Link>
                            </Nav.Link>
                            {this.props.user ?<Nav.Link onClick={this.props.logout}>
                                <Link to="/login">
                                        Logout 
                                </Link>
                            </Nav.Link> : <Nav.Link>
                                <Link to="/login">
                                    Login 
                                </Link>
                            </Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}