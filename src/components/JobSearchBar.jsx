import React from "react";

export const JobSearchBar = () => {
    function getJobTypeList() {
        return undefined; //ver como pedir todos los jobs
    }

    //const jobTypeList = getJobTypeList();
    const jobTypeList = ['Full Time', 'Part Time', 'Freelance', 'Internship'];

    //onChange={(e) => setSearchedTerm(e.target.value)}
    return(
        <div>
            <input type="text" className="form-control" placeholder="Search for a job..." aria-label="Recipient's username" aria-describedby="button-addon2" list="job-type-list" />
            <datalist id="job-type-list">
                {jobTypeList.map((jobType) => <option value={jobType}/>)}
            </datalist>
        </div>
    );

}