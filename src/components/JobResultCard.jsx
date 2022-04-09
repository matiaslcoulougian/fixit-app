import React from "react";

export const JobResultCard = (props) => {
    return(

            <div className="card mb-3 shadow" style={{width: "400px"}}>
                <img src={props.imgSrc} className="card-img-top w-50 h-50 rounded mx-auto d-block mt-3" alt="images"/>
                <div className="card-body text-center">
                    <h4 className="card-title">{props.jobTitle}</h4>
                    <h5 className="card-title">{props.jobType}</h5>
                    <h6 className="card-title">{props.workersName}</h6>
                    <p className="card-text">{props.rating} <i className="bi bi-star-fill "></i></p>
                    <p className="card-text"><small className="text-muted">{props.timeDistance} away</small></p>
                    <div className="btn btn-primary">Details</div>
                </div>
            </div>

    );

}