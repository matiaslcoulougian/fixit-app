import React, {useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_RATING_AVERAGE} from "../../../queries/queries";
import LoaderSpinner from "../../LoaderSpinner";

const RatingCard = (props) => {

    const [averageRating, setAverageRating] = useState();
    const [jobsDone, setJobsDone] = useState();

    const [getWorkerAvgRating, {loading}] = useLazyQuery(
        GET_RATING_AVERAGE, {
            onCompleted: (data) => {
                console.log("FETCHED!");
                console.log(data)
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );

    useEffect(async () => {
        const response = await getWorkerAvgRating({variables:{input: {workerId: props.workerId}}});
        console.log(response)
        setAverageRating(response.data.getWorkerAvgRating.average)
        setJobsDone(response.data.getWorkerAvgRating.jobsDone)
    }, []);



    return (
        <div>
            <div className="card">
                <h3 className="card-header">My Rating</h3>
                <div className="card-body">
                    <h3 className="card-title text-center">{!loading ? (<span>{averageRating}<i className="bi bi-star-fill "></i></span>) : <LoaderSpinner/>}</h3>
                    <p className="card-text text-center">{jobsDone === 1 ? <span>{jobsDone} job done </span> : <span> {jobsDone} jobs done </span>}</p>
                    <a href="#" className="btn btn-primary">See jobs done</a>
                </div>
            </div>
        </div>
    );
};

export default RatingCard;

