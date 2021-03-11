import React from "react";
import classes from './Header.module.css'
import {Form, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import logoThumb from "../../assets/images/logo-thumb.png";

const header = props => {
    return (
        <>
            <header className={classes.Header}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-5">
                            <p>Welcome to Shivaay Super Speciality Clinic</p>
                        </div>
                        <div className="col-md-8 col-sm-7 text-align-right">
                            <span className="phone-icon"><i className="fa fa-phone"></i> 78743 55907</span>
                            <span className="date-icon"><i className="fa fa-calendar-plus-o"></i> 6:00 AM - 10:00 PM (Mon-Fri)</span>
                            <span className="email-icon"><i className="fa fa-envelope-o"></i>
                                <span>shivaay.clinic@gmail.com</span></span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="navbar-default navbar-static-top" role="navigation" style={{
                position: 'sticky',
                top: '0',
                zIndex: '500'
            }}>
                <Navbar expand="md">
                    <Navbar.Brand href="#home"><img src={logoThumb} className="img-responsive" alt=""/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => props.scrollTo(props.references.homeRef)} className='pr-4'>Home</Nav.Link>
                            <Nav.Link onClick={() => props.scrollTo(props.references.aboutRef)} className='pr-4'>About</Nav.Link>
                            <Nav.Link onClick={() => props.scrollTo(props.references.teamRef)} className='pr-4'>Doctors</Nav.Link>
                            <Nav.Link onClick={() => props.scrollTo(props.references.contactRef)} className='pr-4'>Contact</Nav.Link>
                        </Nav>
                        <Form inline>
                            <Button onClick={() => props.scrollTo(props.references.apptRef)} variant="outline-primary">Make an
                                appointment</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </section>
        </>
    );
}
export default header;