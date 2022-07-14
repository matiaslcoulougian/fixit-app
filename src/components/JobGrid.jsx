import React, {useEffect, useState} from 'react';
import {JobResultCard} from "./JobResultCard";
import {GET_ME, GET_USER_TIME} from "../queries/queries";
import {useLazyQuery} from "@apollo/client";
import profile from './no-profile.png'

export const JobGrid = (props) =>{
    const falseRating = "5.0";
    const falseTimeDist = "30 min";
    let userAddress = "";
    const [timeBetween, setTimeBetween] = useState(0);
    const [me, setMe] = useState(null);

    const [getTimeBetweenAddresses] = useLazyQuery(
        GET_USER_TIME,
        {
            onCompleted: (data) => {
                setTimeBetween(data.getUserTime.time);

            }
        });

    const [getMe] = useLazyQuery(
        GET_ME, {
            onCompleted: (data) => {
                //setTimeBetween(data.getUserDistance.distance);
                //return data.getMe.address;
                setMe(data.getMe);
            }
        }
        );

    return(
        <div className="container mt-3">

            {props.list.length === 0 ? <div>
                    <h3 className={"centered"}>No Jobs match.</h3>
                    <img className="img-thumbnail rounded mx-auto d-block" src="https://c.tenor.com/WUEKqaYhVsUAAAAC/pokemon-sad.gif"  alt="pikachu"></img>
                <h3 className={"centered"}>Try searching for another category!</h3>
                </div>:
                <div className="row row-cols-3 row-cols-sm-2 row-cols-md-3 g-4">
                    {
                        props.list.map((item) => (
                            <div className="col>">
                                <JobResultCard
                                    imgSrc={props.profileImage ? props.profileImage : profile} // hardocoded
                                    jobTitle={item.title}
                                    jobType={item.type}
                                    jobId={item.id}
                                    workersName={(item.worker.firstName + " " + item.worker.lastName)}
                                    rating={falseRating}
                                    timeDistance={item.time}
                                    workerId={item.worker.id}/>

                            </div>)
                        )}
                </div>
            }

        </div>
    );
}