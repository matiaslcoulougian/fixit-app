import React from 'react';
import {JobDetails} from "../components/pages/JobDetails";


export const JobDetailsPage = (props) => {
    return(
        <div className="bg-light">
            <JobDetails job={props.job}/>
        </div>
    );

}