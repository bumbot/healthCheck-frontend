import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavBar = (props) => {
    return (
        <div>
            <Navbar bg="light" expand="lg" position="fixed">
                <Navbar.Brand href="#home">HealthCheck</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">
                            <Link to="/home">
                                Search
                            </Link>        
                        </Nav.Link>
                        <Nav.Link href="/home">
                            <Link>
                                Appointments
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar