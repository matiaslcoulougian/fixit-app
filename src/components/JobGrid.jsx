import React from 'react';
import {JobResultCard} from "./JobResultCard";

export const JobGrid = () =>{

    function addJob(props){
        return <JobResultCard imgSrc={props.imgSrc} jobTitle={props.jobTitle} jobType={props.jobType} workersName={props.workersName} rating={props.rating} timeDistance={props.timeDistance}/>
    }

    return(
        <div className="container">




        </div>



    )



}