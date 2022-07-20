import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {GET_WORKER_RATINGS} from '../../queries/queries';
import {NavBar} from "../NavBar";
import BackButton from '../BackButton';
import { useLocation } from 'react-router-dom';
import { Rating } from '@mui/material';

export const RatingsPage = () => {

    const [refresh, setRefresh] = useState(true);
    const [ratings, setRatings] = useState();
    const {state} = useLocation();
    const {workerId} = state;

    const [getWorkerRatings] = useLazyQuery(
        GET_WORKER_RATINGS, {
            onCompleted: (res) => {
                console.log(res)
                return res.getWorkerRatings;
            }, 
            onError(err) {
                console.log(err);
            }
        }
    );

    useEffect(async () => {
        let retrievedRatings = await getWorkerRatings({variables: { input: {workerId: workerId} } }); //el formato de la query con el input hay que hacerlo
        setRatings(retrievedRatings.data.getWorkerRatings);
        setRefresh(false)
        
    }, [refresh])

    const ReviewCard = (stars, comment) => {
        return(
            <div className='list-group-item'>
                <div>
                    <div className="row">
                    <Rating name="read-only" value={stars} readOnly />
                    <div>{comment}</div>
                    </div>
                </div>

            </div>

        );
    }

    return(
        <div className='bg-light'>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton marginLeft={"ms-3"} marginTop={"mt-4"}/>
            <div className={"container bg-light"} >
                    <h1 className="col-10 mx-auto justify-content-center mb-4">My Reviews</h1>
                    <div className="col-10 mx-auto justify-content-center">
                        <div className={"card"}>
                            <div className="card-body">
                                <div className="list-group">
                                    {ratings?.length === 0 ? (<h4 className="no-budget">No reviews yet...</h4>): (ratings?.map((rating) => {
                                        return ReviewCard(rating.stars, rating.comment);
                                    }))}
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
    );

}