import React, {useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_RATING_AVERAGE} from "../../../queries/queries";
import LoaderSpinner from "../../LoaderSpinner";

const RatingCard = (props) => {

    const [averageRating, setAverageRating] = useState();

    const [getRatingAverage, {loading}] = useLazyQuery(
        GET_RATING_AVERAGE, {
            onCompleted: (res) => {
                console.log("FETCHED!");
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );

    useEffect(() => {
        getRatingAverage({variables:{input:{workerId: props.workerId}}})
    }, []);



    return (
        <div>
            <div className="card">
                <h3 className="card-header">My Rating</h3>
                <div className="card-body">
                    <h3 className="card-title text-center">{averageRating ? <LoaderSpinner/> : (<span>{averageRating}<i className="bi bi-star-fill "></i></span>)}</h3>
                    <p className="card-text text-center">42 jobs done</p>
                    <a href="#" className="btn btn-primary">See jobs done</a>
                </div>
            </div>
        </div>
    );
};

export default RatingCard;

