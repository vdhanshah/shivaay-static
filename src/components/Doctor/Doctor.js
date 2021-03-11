import {Component} from "react";

class Doctor extends Component {
    render() {
        return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                    <img style={{ cursor: "pointer" }} onClick={() => this.props.seeDoctor(this.props.docPathName)} src={require("../../assets/images/"+this.props.imgpath).default} className="img-responsive" alt=""/>
                    <div className="team-info">
                        <h3 style={{ cursor: "pointer" }} onClick={() => this.props.seeDoctor(this.props.docPathName)}>{ this.props.docName }</h3>
                        <p>{ this.props.specialty }</p>
                        <p>{ this.props.desc }
                            <i style={{ cursor: "pointer" }} onClick={() => this.props.seeDoctor(this.props.docPathName)} className="fa fa-info-circle fnt-size-22 knowmore" ></i>
                        </p>
                        <div className="team-contact-info">
                            <p><i className="fa fa-phone"></i> { this.props.phone }</p>
                            <p><i className="fa fa-envelope-o"></i> { this.props.email } </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Doctor;