import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {GET_RATING_AVERAGE} from "../queries/queries";
import LoaderSpinner from "./LoaderSpinner";

export const JobResultCard = (props) => {
    const navigate = useNavigate();
    const [redirect, setRedirect] = React.useState(false);
    const [rating, setRating] = useState()
    const redirectToJob = () => {
        console.log(props.workerId)
        window.localStorage.setItem("workerId", props.workerId);
        setRedirect(true);
    }

    const [getWorkerAvgRating] = useLazyQuery(
        GET_RATING_AVERAGE, {
            onCompleted: (data) => {
                console.log("FETCHED!");
                console.log(data.getWorkerAvgRating.average)
                setRating(data.getWorkerAvgRating.average)
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );

    useEffect(async () => {
        if (redirect) {
            navigate(`/job/${props.jobId}`);
            //navigate(`/dashboard`)
        }
        await getWorkerAvgRating({variables: {input: {workerId: props.workerId}}})
    }, [redirect, rating]);


    return(

            <div className="card mb-3 shadow" style={{width: "400px"}}>
                <img src={props.imgSrc} className="card-img-top w-50 h-50 rounded mx-auto d-block mt-3" alt="images"/>
                <div className="card-body text-center">
                    <h4 className="card-title">{props.jobTitle}</h4>
                    <h5 className="card-title">{props.jobType}</h5>
                    <h5 className="card-title"><span className="badge bg-info">{props.jobType}</span></h5>
                    <h6 className="card-title">{props.workersName}</h6>
                    <p className="card-text">{rating ? (<span>{rating}<i className="bi bi-star-fill "></i></span>) : <LoaderSpinner/>}</p>
                    {/*<p className="card-text"><small className="text-muted">{props.timeDistance} away</small></p>*/}
                    <div className="btn btn-primary" onClick={redirectToJob}>Details</div>
                </div>
            </div>

    );

}