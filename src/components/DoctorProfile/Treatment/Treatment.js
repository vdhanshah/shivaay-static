import React from "react";

const treatment = props => (
    <div className="col-md-3 col-sm-6 col-xs-6 pt15">
        <div className="" data-wow-delay="0.6s">
            {/*<img src={require("../../../assets/images/"+props.imgpath).default} className="img-responsive" alt=""/>*/}
            <h3 style={{color: "#6c757d"}}>{ props.name}</h3>
            <p>{ props.desc }</p>
        </div>
    </div>
)
export default treatment;