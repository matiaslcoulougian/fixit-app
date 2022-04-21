import React, {useEffect, useState} from 'react';
import {JobResultCard} from "./JobResultCard";
import {GET_ME, GET_USER_TIME} from "../queries/queries";
import {useLazyQuery} from "@apollo/client";


export const JobGrid = (props) =>{
    const imgSource = "https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg";
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
            <div className="row row-cols-3 row-cols-sm-2 row-cols-md-3 g-4">
                {
                    props.list.map((item) => (
                    <div className="col>">
                        <JobResultCard
                            imgSrc={imgSource} // hardocoded
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
        </div>
    );



}