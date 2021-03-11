import classes from './DoctorProfile.module.css'
import { useEffect } from "react";
import {withRouter} from "react-router";
import Treatment from "./Treatment/Treatment";

const DoctorProfile = props => {
    useEffect(() => {
    }, [])
    return (
        <div className={classes.DoctorProfile}>
        <div className="container-fluid">
            <div className="row">
                <div className='col-md-3 doctor-details-item  doctor-details-left nopad'>
                    <img src={require("../../assets/images/"+props.imgpath).default} className="img-responsive" alt=""/>
                    <div className='doctor-details-contact'>
                        <h3>Contact info</h3>
                        <ul>
                            <li><i className="fa fa-phone"></i> { props.phone }</li>
                            <li><i className="fa fa-envelope"></i> { props.email }</li>
                        </ul>
                    </div>
                    <div className="doctor-details-work"><h3>Working hours</h3>
                        <div className="appointment-item-two-right">
                                { props.workinghours.map((workday, index) => {
                                    return (
                                        <div className="appointment-item-content" key={index}>
                                            <div>{workday.day}</div>
                                            <div>{workday.time}</div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="doctor-details-item">
                        <div className="doctor-details-right">
                            <div className="doctor-details-biography">
                                <h3>Biography</h3>
                                <p>{ props.fulldesc }</p>
                            </div>
                            <div className="doctor-details-biography">
                                <h3>Education & Training</h3>
                                <ul>
                                    { props.education.map((item, index) => {
                                        return <li key={index}><strong>{ item.degree }</strong> ({item.from})</li>
                                    }) }
                                </ul>
                            </div>
                            {
                                props.treatments && props.treatments.length > 0 ?
                                    <div className="doctor-details-biography">
                                        <h3>Expertise</h3>
                                        <div className="row">
                                            { props.treatments.map((treatment, index) => (
                                                <Treatment key={index} name={treatment.name} imgpath={treatment.imgpath} desc={treatment.desc}></Treatment>
                                            ))}
                                        </div>
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default withRouter(DoctorProfile);