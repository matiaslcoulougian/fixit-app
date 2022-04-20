import React from 'react';
import {JobResultCard} from "./JobResultCard";

export const JobGrid = (props) =>{
    const imgSource = "https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg";
    const falseRating = "5.0";
    const falseTimeDist = "30 min";

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
                            timeDistance={falseTimeDist}
                            workerId={item.worker.id}/>

                    </div>)
                )}
            </div>
        </div>
    );



}