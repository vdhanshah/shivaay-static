import React, {Component} from "react";
import Header from "../../components/Header/Header";
import humanity from "../../assets/images/about-humanity.webp";
import integrity from "../../assets/images/about-integrity.webp";
import equality from "../../assets/images/about-equality.webp";
import apptImage from "../../assets/images/appointment.jpg";
import HeaderImage from "../../components/HeaderImage/HeaderImage";
import Doctor from "../../components/Doctor/Doctor";
import {Route} from "react-router";
import { withRouter } from "react-router-dom";
import DoctorProfile from "../../components/DoctorProfile/DoctorProfile";
import Appointment from "../Appointment/Appointment";
import logo from "../../assets/images/logo.png"

class Main extends Component {
    state = {
        doctors : []
    }
    references = {
        mainAppRef: React.createRef(),
        homeRef: React.createRef(),
        aboutRef: React.createRef(),
        teamRef: React.createRef(),
        contactRef: React.createRef(),
        apptRef: React.createRef(),
    }

    currentRef = this.references.mainAppRef;
    scrollTo = ref => {
        this.props.history.push("");
        this.currentRef = ref;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.currentRef.current.scrollIntoView({behavior: "smooth"});
    }

    seeDoctor = docPathName => {
        this.props.history.push("/doctor/"+docPathName);
        this.currentRef = this.references.mainAppRef;
    }

    componentDidMount() {
        fetch(process.env.PUBLIC_URL+'/doctors.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(doctors => {
                if (doctors) {
                    this.setState({doctors: doctors});
                }
            });
    }

    render() {
        let team = null;
        if (this.state.doctors && this.state.doctors.length > 0) {
            team = this.state.doctors.map(doc => (
                <Doctor
                    key={doc.docPathName}
                    imgpath={doc.imgpath}
                    docName={doc.docName}
                    specialty={doc.specialty}
                    desc={doc.desc}
                    phone={doc.phone}
                    email={doc.email}
                    docPathName={doc.docPathName}
                    seeDoctor={(docPathName) => this.seeDoctor(docPathName)}
                />
            ))
        }
        return (
            <>
                <div ref={this.references.mainAppRef} />
                <Route path="/">
                    <Header references={this.references} scrollTo={this.scrollTo}/>
                </Route>
                <Route path="/" exact render={() => <HeaderImage imageClass='item-first' showCaption references={this.references} scrollTo={this.scrollTo}/> } />
                <Route path="/doctor/:docName" exact render={(props) => {
                    const doctor = this.state.doctors.filter((doc) => doc.docPathName === props.match.params.docName)[0];
                    return doctor ?
                    <HeaderImage
                        imageClass='profile-bg'
                        references={this.references}
                        scrollTo={this.scrollTo}
                        name= {doctor.docName}
                        specialty= {doctor.specialty}
                    /> : null
                } } />
                { this.state.doctors && this.state.doctors.length > 0 ? <Route path="/doctor/:docName" exact render={(props) => {
                    const doctor = this.state.doctors.filter((doc) => doc.docPathName === props.match.params.docName)[0];
                    return doctor ? <DoctorProfile { ...doctor } /> : null
                }} /> : null }

                <Route path="/" exact render={ ()=> <section id="about" className="pb10" ref={this.references.aboutRef}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6"></div>
                            <div className="col-md-6 col-sm-6">
                                <div className="about-info mt-4">
                                    <h2 className="wow fadeInUp" data-wow-delay="0.4s">Welcome to Shivaay Super
                                        Speciality
                                        Clinic</h2>
                                    <div className="wow fadeInUp" data-wow-delay="0.6s">
                                        <p>At Shivaay Super Speciality Clinic, we continuously work towards keeping you
                                            and
                                            your loved ones at your best. We are maintaining high standards of care
                                            every
                                            day for your healthy tomorrow. We are dedicated to our patients and caring
                                            is
                                            our calling.</p>
                                        <p>Founded in 2020, by Dr. Jaydip Mangroliya (D.M. Nuerology) with a vision to
                                            provide humanity, integrity and equality based focused healthcare.</p>
                                    </div>
                                    <div className="wow fadeInUp" data-wow-delay="0.8s">
                                        <p><strong>Mission:</strong> Care you need, Close to Home</p>
                                        <p><strong>Vision:</strong> To provide humanity, integrity and equality based
                                            focused healthcare</p>
                                    </div>
                                    <div className="wow fadeInUp principals text-center pt10" data-wow-delay="0.8s">
                                        <div className='row'>
                                            <div className="col-sm-4 col-md-4 col-xs-4 clinic-values">
                                                <img src={humanity} className="img-responsive"
                                                     alt="Humanity - Centered"/>
                                                <span>Humanity - Centered</span>
                                            </div>
                                            <div className="col-sm-4 col-md-4 col-xs-4 clinic-values">
                                                <img src={integrity} className="img-responsive"
                                                     alt="Integrity - Anchored"/>
                                                <span>Integrity - Anchored</span>
                                            </div>
                                            <div className="col-sm-4 col-md-4 col-xs-4 clinic-values">
                                                <img src={equality} className="img-responsive"
                                                     alt="Equality - Driven"/>
                                                <span>Equality - &nbsp;&nbsp;Driven</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> } />
                <Route path="/" exact render={ ()=> {
                    return <section id="team" data-stellar-background-ratio="1" ref={this.references.teamRef}>
                        <div className="container-fluid">
                            <div className="col-md-6 col-sm-6">
                                <div className="about-info">
                                    <h2 className="wow fadeInUp nomartop" data-wow-delay="0.1s">Our Doctors</h2>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="row">
                                {team}
                            </div>
                        </div>
                    </section>
                }} />

                <section id="appointment" ref={this.references.apptRef}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 pt-5 appointment-stethoscope">
                                <img src={apptImage} className="img-responsive" alt=""/>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 appointment-form">
                                <Appointment />
                            </div>

                        </div>
                    </div>
                </section>
                <section id="google-map">
                    <iframe title="Shivaay Super Speciality Clinic"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.94701345281!2d72.64127021465436!3d23.062404084932865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87d91a921baf%3A0x5cac92ebcbb85d5d!2sShivaay%20superspeciality%20clinic!5e0!3m2!1sen!2sin!4v1617249005741!5m2!1sen!2sin"
                        width="100%" height="350" frameBorder="0" style={{border: "0"}} allowFullScreen="" loading="lazy"></iframe>
                </section>
                <footer data-stellar-background-ratio="5" ref={this.references.contactRef}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 col-sm-3">
                                <div className="footer-thumb" style={{color: "#757575"}}>
                                    <h4 className="wow fadeInUp" data-wow-delay="0.4s">Contact Info</h4>
                                    <span><strong>1st Floor, 126-129, City Center Arcade</strong></span><br/>
                                    <span>Krishnanagar Naroda Highway NH8</span><br/>
                                    <span>Near S.R.P. Camps, Naroda Patiya</span><br/>
                                    <span>Ahmedabad, Gujarat 382330</span>

                                    <div className="contact-info">
                                        <p><i className="fa fa-phone"></i> 97277 27716</p>
                                        <p><i className="fa fa-envelope-o"></i> <span>shivaay.clinic@gmail.com</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-3">
                                <div className="footer-thumb">
                                    <div className="opening-hours">
                                        <h4 className="wow fadeInUp" data-wow-delay="0.4s">Opening Hours</h4>
                                        <p>Monday - Friday <span>06:00 AM - 10:00 PM</span></p>
                                        <p>Saturday <span>09:00 AM - 08:00 PM</span></p>
                                        <p>Sunday <span>Closed</span></p>
                                    </div>

                                    <ul className="social-icon">
                                        <li><i className="fa fa-facebook-square" attr="facebook icon"></i></li>
                                        <li><i className="fa fa-twitter"></i></li>
                                        <li><i className="fa fa-instagram"></i></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-5 col-sm-5" style={{ top: "-25px"}}>
                                <img src={logo} alt="Shivaay Logo" className="img-responsive"/>
                            </div>

                            <div className="col-md-10 col-sm-10">
                                <div className="copyright-text">
                                    <p>Copyright &copy; 2020 Shivaay Super Speciality Clinic</p>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-2 text-align-center">
                                <div className="angle-up-btn">
                                    <button onClick={() => this.scrollTo(this.references.mainAppRef)}
                                       className="btn btn-outline-secondary smoothScroll wow fadeInUp" data-wow-delay="1.2s">
                                        <i className="fa fa-angle-up"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

export default withRouter(Main)